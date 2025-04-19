import express from 'express';
import { login, register, updateProfile } from '../controller/user.controller.js';
import { isAuthenticated } from '../middleware/isAuth.js';
import { upload } from '../utils/multer.js';
const router=express.Router();
router.route("/").post(register);
router.route("/login").post(login);
router.route("/profile").post(isAuthenticated,upload.single("file"),updateProfile);
export default router