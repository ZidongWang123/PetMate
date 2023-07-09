import Group from "../models/group.js";
import mongoose from "mongoose";
import Groupmember from "../models/groupmember.js";

// get all groups
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({}).sort({ createdAt: -1 });

    // 获取每个组的成员ID
    const groupIds = groups.map((group) => group._id);
    const groupMembers = await Groupmember.find({ groupId: { $in: groupIds } });

    // 将成员ID添加到每个组的成员属性
    const groupsWithMembers = groups.map((group) => {
      const members = groupMembers
        .filter((member) => member.groupId.equals(group._id))
        .map((member) => member.memberId);
      return { ...group.toObject(), members };
    });

    // 将包含成员ID的组列表作为 JSON 发送回浏览器/客户端
    res.status(200).json(groupsWithMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such group" });
  }

  try {
    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ error: "No such group" });
    }

    const groupMembers = await Groupmember.find({ groupId: id });

    // 将成员ID添加到每个组的成员属性
    const members = groupMembers.map((member) => member.memberId);
    const groupWithMembers = { ...group.toObject(), members };

    res.status(200).json(groupWithMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getMyGroups = async (req, res) => {
  const userId = req.userId;
  /* try {
    const myGroups = await Groupmember.find({ memberId: userId });

    // 返回小组信息给客户端
    res.status(200).json(myGroups);
  } */
  try {
    const myGroups = await Groupmember.find({ memberId: userId }).populate(
      "groupId"
    );

    const myGroupsWithFiles = myGroups.map((groupMember) => {
      const group = groupMember.groupId;
      return { ...group.toObject(), selectedFile: group.selectedFile };
    });

    res.status(200).json(myGroupsWithFiles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user groups" });
  }
};

// create new Group
const createGroup = async (req, res) => {
  const group = req.body;
  const newGroupMessage = new Group({ ...group, creatorId: req.userId });
  const newGroupmember = new Groupmember({
    groupName: newGroupMessage.groupName,
    groupId: newGroupMessage._id,
    creatorName: newGroupMessage.creatorName,
    creatorId: newGroupMessage.creatorId,
    memberName: newGroupMessage.creatorName,
    memberId: newGroupMessage.creatorId,
  });
  try {
    await newGroupMessage.save();
    await newGroupmember.save();

    // 更新 Group 的 groupcount 字段
    await Group.findByIdAndUpdate(
      newGroupMessage._id,
      { $inc: { groupcount: 1 } } // 增加 groupcount 值
    );
    res.status(201).json(newGroupMessage);
  } catch (error) {
    res.status(409).json(error);
  }
};

// delete a group
const deleteGroup = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No group with that id");

  if (Group.creatorId === userId) {
    // 如果 userId 等于 creatorId，则删除 Group 文档
    try {
      await Group.findOneAndDelete({ _id: id });
      await Groupmember.findOneAndDelete({ groupId: id });
    } catch (error) {
      res.status(409).json(error);
    }
  }
  await Groupmember.findOneAndDelete({ groupId: id, memberId: userId });
  res.status(200).json({ message: "Group deleted successfully" });
};

// update a workout
const updateGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const group = await Group.findOneAndUpdate(
    { _id: id },
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
  // 在此处处理加入小组的逻辑
  // ...
  // 完成加入小组操作后，返回相应的数据
  try {
    await newMember.save();
    const { groupId } = groupMemberData;
    await Group.findOneAndUpdate({ _id: groupId }, { $inc: { groupcount: 1 } });
    res.status(201).json(groupMemberData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {
  getGroups,
  getGroup,
  getMyGroups,
  createGroup,
  deleteGroup,
  updateGroup,
  joinGroup,
};
