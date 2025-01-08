import jwt from 'jsonwebtoken'
import {User} from '../Models/user.js'

const auth = async(req,res,next)=>{
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({msg:'Please login to access this resource'})
  }else{
    try {
      const decodedToken = jwt.verify(token,"SecretKey"); 
      req.user = await User.findById(decodedToken.userId).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({msg:'token is not valid'})
    }
  }
}
export {auth};