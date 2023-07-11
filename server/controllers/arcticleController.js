

import articles from "../models/article.js";

import mongoose from "mongoose";

//查询文章详情
const getArticle = async (req, res) => {
  const { id } = req.params;

  
  const query={"_id": id}

  const articlesResulet = await articles.findOne(query).populate('u_id', 'name').lean()
  articlesResulet['editFlag']=articlesResulet.u_id._id==req.userId

  console.log(typeof articlesResulet);
  console.log("articlesResulet",articlesResulet);
  res.status(200).json(articlesResulet);
};
//查询这个群组下面的所有文章
const getGroupArticle = async (req, res) => {
  const { id } = req.params;
  const query={
    g_id:id
  }
  
  console.log("查询",query);
  const Articles = await articles.find(query).populate('u_id', 'name');

  res.status(200).json(Articles);
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

// update a workout
const updateArticle= async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Article" });
  }
  console.log(req.body,"修改");
  const article = await articles.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!article) {
    return res.status(404).json({ error: "No such Article" });
  }

  res.status(200).json(article);
};

// create new Group
const createArticle = async (req, res) => {
  const { title, tags, content, imageURL, creator,g_id } = req.body;
  const u_id=req.userId
  //detect which field is empty when sending post request
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
  if (!imageURL) {
    emptyFields.push("imageURL");
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
    const group = await articles.create({
      u_id,
      g_id,
      title,
      tags,
      content,
      imageURL,
      creator,
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export { getArticle,getGroupArticle,deleteArticle,updateArticle,createArticle};
