import {Video} from '../Models/video.js'

const uploadVideo = async(req,res)=>{
  try {
     const {title,description,videoLink,videoType,thumbnail} = req.body;
    //  console.log(req.user);
    const videoUpload = new Video({user:req.user._id,title,description,videoLink,videoType,thumbnail});
    await videoUpload.save();

    return res.status(200).json({success:"ture",videoUpload,message:"Video Uploaded Successfully"});

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error,Error in video upload' });
  }
};

const getAllVideo = async(req,res)=>{
try {
  const videos = await Video.find().populate('user','userName createdAt');

  return res
  .status(200)
  .json({success:"true" , "videos" : videos , message:"All Video Fetched"})
} catch (error) {
  return res.status(500).json({ error: 'Internal Server Error,Error in getting all videos' });
}
};

const getVideoById = async(req,res)=>{
  try {
    let {id} = req.params;
    // console.log(id);
    const video = await Video.findById(id).populate('user','userName fullName createdAt');
    return res
    .status(200)
    .json({success:"true" , "video" : video , message:"Video By id fetched"})
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error,Error in Fetching the video' });
  }
};

const getAllVideoByUserId =async(req,res)=>{
try {
    let {userId} = req.params;
    const video = await Video.find({user:userId}).populate('user','userName  createdAt fullName');;
    return res
    .status(200)
    .json({success:"true" , "videos" : video , message:"Video By Userid fetched"})

} catch (error) {
  return res.status(500).json({ error: 'Internal Server Error,Error in Fetching the video by user id' });
}
;}

export {uploadVideo,getAllVideo,getVideoById,getAllVideoByUserId};