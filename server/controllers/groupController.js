import Group from "../models/group.js";
import mongoose from "mongoose";
import Groupmember from "../models/groupmember.js";

// get all groups
const getGroups = async (req, res) => {
  const groups = await Group.find({}).sort({ createdAt: -1 });

  //send that as jsono back to the browser/clients
  res.status(200).json(groups);
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

    res.status(200).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getMyGroups = async (req, res) => {
  const userId = req.userId;
  try {
    /*   // 使用 Groupmember 模型查询用户所属的小组
    const groupmembers = await Groupmember.find({ memberId: userId });

    // 从每个 groupmember 中获取 groupId
    const groupIds = groupmembers.map((groupmember) => groupmember.groupId);

    // 使用 Group 模型查询包含指定 groupIds 的小组，并将其关联到 groupmembers
    const myGroups = await Group.find({ _id: { $in: groupIds } }); */
    const myGroups = await Groupmember.find({ memberId: userId }).populate({
      path: "groupId",
      select: "selectedFile",
    });

    res.status(200).json(myGroups);
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
    res.status(201).json(newGroupMessage, newGroupmember);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// delete a group
const deleteGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such group" });
  }

  const group = await Group.findOneAndDelete({ _id: id });

  if (!group) {
    return res.status(404).json({ error: "No such group" });
  }

  res.status(200).json(workout);
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
