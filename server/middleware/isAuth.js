import jwt from 'jsonwebtoken';
export const isAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:true,
                massege:"User not autheticate"
            })
        }
        const decoded= await jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                success:true,
                massege:"User not autheticate"
            })
        }
        req.user=decoded.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}