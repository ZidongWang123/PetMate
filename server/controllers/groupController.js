import Group from "../models/group.js";
import mongoose from "mongoose";
import Groupmember from "../models/groupmember.js";
import articles from "../models/article.js";
import bcrypt from "bcrypt";

// get all groups
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({})
      .sort({ createdAt: -1 })
      .populate("creatorId", "name");

    // 获取每个组的成员ID
    const groupIds = groups.map((group) => group._id);
    const groupMembers = await Groupmember.find({ groupId: { $in: groupIds } });

    // 将成员ID添加到每个组的成员属性
    const groupsWithMembers = groups.map((group) => {
      const members = groupMembers
        .filter((member) => member.groupId.equals(group._id))
        .map((member) => member.memberId);
      const groupCount = members.length;
      const creatorName = group.creatorId ? group.creatorId.name : null;
      const creatorRefId = group.creatorId ? group.creatorId._id : null;
      return {
        ...group.toObject(),
        creatorName,
        creatorRefId,
        members,
        groupCount,
      };
    });

    // 将包含成员ID的组列表作为 JSON 发送回浏览器/客户端
    res.status(200).json(groupsWithMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getGroupsBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const title = new RegExp(searchQuery, "i"); // Test test TEST -> test

    const groups = await Group.find({
      $or: [{ groupName: title }, { intro: title }, { tags: { $in: title } }], // find groups that match either or
    }).populate("creatorId", "name");
    
    // 获取每个组的成员ID
    const groupIds = groups.map((group) => group._id);
    const groupMembers = await Groupmember.find({ groupId: { $in: groupIds } });

    // 将成员ID添加到每个组的成员属性
    const groupsWithMembers = groups.map((group) => {
      const members = groupMembers
        .filter((member) => member.groupId.equals(group._id))
        .map((member) => member.memberId);
      const groupCount = members.length;
      const creatorName = group.creatorId ? group.creatorId.name : null;
      const creatorRefId = group.creatorId ? group.creatorId._id : null;
      return {
        ...group.toObject(),
        creatorName,
        creatorRefId,
        members,
        groupCount,
      };
    });

    res.json({ data: groupsWithMembers });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getGroup = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such group" });
  }

  try {
    const group = await Group.findById(id).populate("creatorId", "name");
    const creatorName = group.creatorId ? group.creatorId.name : null;
    const creatorRefId = group.creatorId ? group.creatorId._id : null;
    if (!group) {
      return res.status(404).json({ error: "No such group" });
    }

    const groupMembers = await Groupmember.find({ groupId: id });

    // 将成员ID添加到每个组的成员属性
    const members = groupMembers.map((member) => member.memberId);
    const groupCount = members.length;
    const groupWithMembers = {
      ...group.toObject(),
      creatorName,
      members,
      groupCount,
      creatorRefId,
    };

    res.status(200).json(groupWithMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getMyGroups = async (req, res) => {
  const userId = req.userId;

  try {
    const myGroups = await Groupmember.find({ memberId: userId })
      .sort({ createdAt: -1 })
      .populate("groupId");

    const myGroupsWithFiles = myGroups.map((groupMember) => {
      const group = groupMember.groupId;
      return {
        ...group.toObject(),
        selectedFile: group.selectedFile,
        groupId: group._id,
        groupName: group.groupName,
      };
    });

    res.status(200).json(myGroupsWithFiles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user groups" });
  }
};

// create new Group
const createGroup = async (req, res) => {
  try {
    const { ...group } = req.body;
    const exists = await Group.findOne({
      groupName: { $regex: `^${group.groupName}$`, $options: "i" },
    });
    if (exists) {
      return res.status(409).json({ error: "groupName already in use" });
    }

    const newGroupMessage = new Group({
      ...group,
      creatorId: req.userId,
      password: "",
    });

    const newGroupmember = new Groupmember({
      groupId: newGroupMessage._id,
      creatorId: req.userId,
      memberId: req.userId,
    });

    await newGroupMessage.save();
    await newGroupmember.save();

    res.status(201).json(newGroupMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addGroupPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const salt = await bcrypt.genSalt(10);
  // reason for await: this stp takes time to complete by design
  //argument: the number of rounds or the cost of the salt, 越大越安全,也让用户注册时间更长 default value:10
  const hash = await bcrypt.hash(password, salt);

  const group = await Group.findByIdAndUpdate(
    id,
    { password: hash },
    { new: true }
  );

  if (!group) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(group);
};

// delete a group
const deleteGroup = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No group with that id");

  try {
    const group = await Group.findById(id);
    if (!group) return res.status(404).send("No group with that id");

    if (group.creatorId.toString() === userId) {
      // 如果 userId 等于 creatorId，则删除 Group 文档
      try {
        await Group.findByIdAndRemove(id);
        await Groupmember.deleteMany({ groupId: id });
        await articles.deleteMany({ g_id: id });
      } catch (error) {
        res.status(409).json(error);
      }
    }
    await Groupmember.findOneAndDelete({ groupId: id, memberId: userId });
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// update a workout
const updateGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const group = await Group.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  if (!group) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(group);
};

//join a group
const joinGroup = async (req, res) => {
  const groupMemberData = req.body;

  const { groupId, memberId } = groupMemberData;
  // 检查是否已经加入了小组
  const existingMember = await Groupmember.findOne({ groupId, memberId });

  if (existingMember) {
    return res.status(409).json("You have already joined this group");
  }
  const newMember = new Groupmember(groupMemberData);

  try {
    await newMember.save();

    res.status(201).json(groupMemberData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyGroup = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const existingGroup = await Group.findOne({ _id: id });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingGroup.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Password is incorrect. Please try again." });
    }

    res.status(200).json({ result: existingGroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {
  getGroups,
  getGroup,
  getGroupsBySearch,
  getMyGroups,
  createGroup,
  addGroupPassword,
  deleteGroup,
  updateGroup,
  joinGroup,
  verifyGroup,
};
