import mongoose from "mongoose";
import  forumPostSchema from "./forumPost.js";

const explorePostSchema = new mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
      type: [String],
      default: []
  },
  createdAt: {
      type: Date,
      default: new Date()
  },
  id:{type:String,required:true},
  pictures:{type:[],required:true,default:[]}
});

export default mongoose.model("explorePost", explorePostSchema);
