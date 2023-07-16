import articles from "../models/article.js";

import mongoose from "mongoose";

//get all article
const getArticle = async (req, res) => {
  const { id } = req.params;

  const query = { _id: id };

  const articlesResulet = await articles
    .findOne(query)
    .populate("u_id", "name avatar")
    .lean();
  articlesResulet["editFlag"] = articlesResulet.u_id._id == req.userId;
  res.status(200).json(articlesResulet);
};
//get all articles under the group
const getGroupArticle = async (req, res) => {
  const { id } = req.params;
  const query = {
    g_id: id,
  };

  const Articles = await articles.find(query).populate("u_id", "name avatar");

  res.status(200).json(Articles);
};

const getArticlesBySearch = async (req, res) => {
  const { groupId } = req.params;
  const { searchQuery } = req.query;

  try {
    const title = new RegExp(searchQuery, "i"); // Test test TEST -> test

    const Articles = await articles
      .find({
        $and: [
          { g_id: groupId },
          {
            $or: [
              { title: title },
              { content: title },
              { tags: { $in: [title] } },
            ],
          },
        ], // find groups that match either or
      })
      .populate("u_id", "name avatar");

    res.status(200).json(Articles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete a group
const deleteArticle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Article" });
  }

  const articlesResulet = await articles.findOneAndDelete({ _id: id });

  if (!articlesResulet) {
    return res.status(404).json({ error: "No such Article" });
  }

  res.status(200).json(articlesResulet);
};

const updateArticle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Article" });
  }

  const article = await articles.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!article) {
    return res.status(404).json({ error: "No such Article" });
  }

  res.status(200).json(article);
};

const createArticle = async (req, res) => {
  const { title, tags, content, imageURL, creator, g_id } = req.body;
  const u_id = req.userId;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!tags) {
    emptyFields.push("tags");
  }
  if (!content) {
    emptyFields.push("content");
  }

  if (!u_id) {
    emptyFields.push("u_id");
  }
  if (!g_id) {
    emptyFields.push("g_id");
  }

  //one more check: whether element in emptyFields >0. If it is, no more go further
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields }); //2nd arg: the field needed to be filled
  }

  // add doc to db
  try {
    const Articles = await articles.create({
      u_id,
      g_id,
      title,
      tags,
      content,
      imageURL,
      creator,
    });
    res.status(200).json(Articles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  getArticle,
  getGroupArticle,
  getArticlesBySearch,
  deleteArticle,
  updateArticle,
  createArticle,
};
