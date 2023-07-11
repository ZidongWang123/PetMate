import mongoose from "mongoose";
import  forumPostSchema from "./forumPost.js";
import User from "./user.js"

const explorePostSchema = new mongoose.Schema({
  creatorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  title: String,
  text: String,
  tags: [String],
  likes: 
      [{type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}],
  
  createdAt: {
      type: Number,
      default: Date.now()
  },
  pictures:{type:[],required:true,default:[]},
});


export default mongoose.model("ExplorePost", explorePostSchema);
