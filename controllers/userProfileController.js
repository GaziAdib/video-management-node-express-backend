import mongoose from "mongoose";
import User from "../models/UserModel.js";


// get Profile Of User By UserId

const getUserProfileById = async (req, res) => {
    try {
        const userProfile = await User.findById(req.params?.userId);
        res.json(userProfile);
    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting Blogs From Server', error: error });
    }
}

// update that user Data 

const updateUserProfileById = async (req, res) => {
    const { username, profileImage, bio } = req.body;
    try {
        const userProfile = await User.findByIdAndUpdate(req.params?.userId, { $set: { username: username, profileImage: profileImage, bio: bio } });
        res.json(userProfile);
    } catch (error) {
        res.status(401).json({ message: 'Problem with Updating User Profile', error: error });
    }
}



export { getUserProfileById, updateUserProfileById }