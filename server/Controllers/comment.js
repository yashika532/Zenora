import { Comment } from "../Models/comment.js";

const addComment = async(req,res)=>{
try {
  // console.log(req.user);
  let {video,message} = req.body;
  const comment = new Comment({user:req.user._id,video,message});
  await comment.save();

  return res
    .status(200)
    .json({success:"true" ,message:"Comment Added", comment},
    )

} catch (error) {
  return res.status(500).json({ error: 'Internal Server Error,Error while adding Comment' });
}
};

const getCommentByVideoId = async(req,res)=>{
  try {
    let {videoId} = req.params;
    const comments = await Comment.find({video:videoId}).populate('user','userName');

    return res
    .status(200)
    .json({success:"true" ,message:"Comment By video Id", comments},
    )
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error,Error while adding Comment' });
  }
}
export {addComment,getCommentByVideoId}