import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {User} from '../models/user.model.js'
import { deleteImage, uploadImage } from '../utils/cloudinary.js';
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(404).json({
                messege: "All fields are required"
            })
        }
        let user = await User.find({ email: email });
        if (user.length!==0) {
            return res.status(404).json({
                messege: "User Allready exixts"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            username,
            email,
            password: hashPassword
        })
        return res.status(200).json({
            messege: "User created"
        })
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
    
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: "Register first"
            });
        }
    
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(401).json({
                message: "Invalid email ID or password"
            });
        }
    
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
        res.status(200).cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        }).json({
            message: "User Logged in successfully",
            user
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user;
        const profilePhoto = req.file;      
        if (!profilePhoto) {
            return res.status(400).json({
                massege: "profile photo is required"
            })
        }
        const user = await User.findById(userId);
        if (user.photoUrl) {
            const publicId = user.photoUrl.split("/").pop().split(".")[0];
            deleteImage(publicId);
        }
        const cloudResponse = uploadImage(profilePhoto.path);
        const updatedata={photoUrl:cloudResponse.secure_url};
        const updateUser= await User.findByIdAndUpdate(userId,updatedata,{new:true});
        return res.status(200).json({
            updateUser,
            massege: "update succesfully"
        })
    } catch (error) {
        console.log(error);
    }
}