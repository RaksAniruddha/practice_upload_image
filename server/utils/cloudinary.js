import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config({});
 cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
 })
export const uploadImage=async(file)=>{
    try {
        const response=await cloudinary.uploader.upload(file,{
            resource_type:"auto"
        })
        return response;
    } catch (error) {
        console.log(error);   
    }
} 

export const deleteImage=async(publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId,{
            resource_type:"image/*"
        })
    } catch (error) {
        console.log(error);  
    }
}