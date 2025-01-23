import jwt from 'jsonwebtoken'
import {User} from '../Models/user.js'

const auth = async(req,res,next)=>{
  const token = req.cookies.token;
  // console.log(token);
  if(!token){
    return res.status(401).json({msg:'Please login to access this resource'})
  }else{
    try {
      const decodedToken = jwt.verify(token,process.env.JWT_SECRET || "SecretKey"); 
      req.user = await User.findById(decodedToken.userId).select('-password');

       // Check if user exists
    if (!req.user) {
      return res.status(404).json({ msg: 'User not found' });
    }

      next();
    } catch (error) {
      return res.status(401).json({msg:'token is not valid'})
    }
  }
}
export {auth};