import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import explorePost from '../models/explorePost.js';

export const postCreate = async (req, res) => {
    
    const post=req.body
    try {
        await explorePost.create(post)
        return res.status(400).json({ message: "successfully saved" })
    } catch (error) {
        return res.status(500).json({ message: 'upload failed' });
    }
}
 