import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import ExplorePost from '../models/explorePost.js';
import mongoose from 'mongoose';
import Group from '../models/group.js'
import Article from "../models/article.js"
export const postCreate = async (req, res) => {
    
    let post=req.body
    console.log(post)
    post.creatorId=new mongoose.Types.ObjectId(post.creatorId)
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
        
            documents=await ExplorePost.find({},"tags")

            console.log(documents)
        }
        else if(where==="group"){
            documents=await Group.find({},"tags")
        }
        else if(where==="article"){
            documents=await Article.find({},"tags")
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

export const getExplorePosts=async(req,res)=>{
    
    
    const argus=req.query
    
    try {
        let newPosts=[]
        if(argus.userId){
            argus.userId=new mongoose.Types.ObjectId(argus.userId)
        }
        const displayePostIds=JSON.parse(argus.displayedPostIdList)
        const objectIdList = displayePostIds.map(item => new mongoose.Types.ObjectId(item));
        
        
        newPosts=await ExplorePost.aggregate([
            {
                
                $match:argus.where==="userPage"?
                {
                    _id:{$nin:objectIdList},
                    creatorId:argus.userId
                }:argus.where==="explore"&&argus.keyword===""?
                {
                    _id:{$nin:objectIdList},
                    creatorId:{$ne:argus.userId}

                }:
                {
                    creatorId:{$ne:argus.userId},
                    $or:[{
                        tags:{
                            $elemMatch:{
                                $eq:argus.keyword,
                                
                            }
                        }
                    },{
                        title:{
                            $regex: argus.keyword,
                            $options: 'i'
                        }

                    },{
                        text:{
                            $regex: argus.keyword,
                            $options: 'i'
                        }
                    }]

                }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"creatorId",
                    foreignField:"_id",
                    as:"creator"
                }
            },
            {
                $unwind:"$creator"
            },
            
            ...(argus.where === "userPage" ?[]: [{ $sample: { size: parseInt(argus.size) } }])
            , ...(argus.where === "userPage" ?[{ $sort: { createdAt: 1 }}]: [])
        ])

        
        
        console.log(newPosts.length)

        return res.status(200).json({result: newPosts, message: "Successfully got tagsList" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'failed, internal server error' });
    }
}

export const modifyLikes= async (req,res)=>{
    const postId = req.params.postId;
    let updatedInfo = req.body;
    
    updatedInfo.likes=updatedInfo.likes.map((item)=>(new mongoose.Types.ObjectId(item)))
    try{
        console.log(updatedInfo)
        const a =await ExplorePost.findByIdAndUpdate(postId, updatedInfo)
        console.log(a)
        res.status(200).json({ message: 'successfully liked'} )
    
      }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Failed to update likes' });
      }



}

export const getSinglePost= async (req,res)=>{
    
    
    const postId=req.params.postId

    try{
        const post=await ExplorePost.findById(postId)

        res.status(200).json({result:post, message: 'successfully got the post'})
    }catch(error){


        res.status(500).json({message:"failed to get the post"})

    }
}
 
export const deletePost=async (req,res)=>{
    const postId=req.params.postId
    try{
        console.log(postId)
        await ExplorePost.findByIdAndDelete(postId)

        res.status(200).json({ message: 'successfully deleted'})
    }catch(error){


        res.status(500).json({message:"failed to delete the post"})

    }
}

export const modifyPost=async (req,res)=>{
    const postId=req.params.postId
    const data=req.body
    try{
        await ExplorePost.findByIdAndUpdate(postId,data)

        res.status(200).json({ message: 'successfully updated'})

    }catch(error){
        res.status(500).json({message:"failed to update the post"})
    }
}
