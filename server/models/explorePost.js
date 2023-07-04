import mongoose from "mongoose";
import forumPost from "./forumPost";

const explorePostSchema = forumPost.extend({
  id:{type:String,required:true},
  pictures:{type:[],required:true,default:[]}
});

export default mongoose.model("explorePost", explorePostSchema);
