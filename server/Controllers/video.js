import {Video} from '../Models/video.js'

const uploadVideo = async(req,res)=>{
  try {
     const {title,description,videoLink,videoType,thumbnail} = req.body;
    //  console.log(req.user);
    const videoUpload = new Video({user:req.user._id,title,description,videoLink,videoType,thumbnail});
    await videoUpload.save();

    return res.status(200).json({success:"true",videoUpload,message:"Video Uploaded Successfully"});

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

const handlelike = async(req,res)=>{
  
  try {
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
      return res.status(404).json({ error: "Video not found" });
    }
    video.like+=1;
    await video.save();
    return res.status(200).json({ success: "true", message: "Liked", video: video });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error, Error in liking the video' });
  }
}

const handleDislike = async(req,res)=>{
  try {
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
      return res.status(404).json({ error: "Video not found" });
    }
    
    video.dislike-=1;
    if(video.dislike <=0)video.dislike = 0;
    await video.save();
    return res.status(200).json({ success: "true", message: "Video DisLiked", video: video });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error, Error in Disliking the video' });
  }
}

const getLike = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
 
    return res
      .status(200)
      .json({ success: "true", likes: video.like, message: "Likes fetched" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error, Error in Fetching likes' });
  }
}

const getDislike = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    return res
      .status(200)
      .json({ success: "true", dislikes: video.dislike, message: "Dislikes fetched" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error, Error in Fetching dislikes' });
  }
}

export {uploadVideo,getAllVideo,getVideoById,getAllVideoByUserId,handlelike,handleDislike,getLike,getDislike};