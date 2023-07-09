import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import ExplorePost from '../models/explorePost.js';
import mongoose from 'mongoose';
import Group from '../models/group.js'
export const postCreate = async (req, res) => {
    
    const post=req.body
    req.body.creator=new mongoose.Types.ObjectId(req.body.creator)
    try {
        await ExplorePost.create(post)
        return res.status(200).json({ message: "Successfully posted" })
    } catch (error) {
        return res.status(500).json({ message: 'Post failed, internal server error' });
    }
}
export const getRecommendTags=async(req,res)=>{
    
    const filteredList=[]
    const keyword = req.params.keyword;
    const where=req.params.where
    console.log(keyword)
    try {
        let documents=[]
        if(where==="explorePost"){
            console.log("123")
            documents=await ExplorePost.find({},"tags")

            console.log(documents)
        }
        else if(where==="group"){
            documents=await Group.find({},"tags")
        }
        
        
        documents.forEach((document) => {
            document.tags.forEach((item) => {
              if (item&&item.toLowerCase().startsWith(keyword.toLowerCase())&&!filteredList.includes(item)){
                filteredList.push(item);
              }
            });
          });

        return res.status(200).json({result: filteredList, message: "Successfully got tagsList" })
    } catch (error) {
        return res.status(500).json({ message: 'failed, internal server error' });
    }
}
 