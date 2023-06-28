import Group from "../models/group.js";

// get all groups
const getGroups = async (req, res) => {
  const groups = await Group.find({}).sort({ createdAt: -1 });
  //send that as jsono back to the browser/clients
  res.status(200).json(groups);
};

// get a single group
const getGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const Group = await Group.findById(id);

  if (!Group) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(Group);
};

// create new Group
const createGroup = async (req, res) => {
  const { title, tags, intro, imageURL, numbers, creator } = req.body;

  //detect which field is empty when sending post request
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!tags) {
    emptyFields.push("tags");
  }
  if (!intro) {
    emptyFields.push("intro");
  }
  if (!imageURL) {
    emptyFields.push("imageURL");
  }

  //one more check: whether element in emptyFields >0. If it is, no more go further
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields }); //2nd arg: the field needed to be filled
  }

  // add doc to db
  try {
    const group = await Group.create({
      title,
      tags,
      intro,
      imageURL,
      numbers,
      creator,
    });
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

  const group = await Group.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!group) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(group);
};

export { getGroups, getGroup, createGroup, deleteGroup, updateGroup };
