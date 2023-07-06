import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import ExplorePost from '../models/explorePost.js';
import mongoose from 'mongoose';

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
 