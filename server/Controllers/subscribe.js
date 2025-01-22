import { Subscribe } from "../Models/subscribe.js";
import { Video } from "../Models/video.js";

const addSubscription = async(req,res) => {
try {
      let {video} = req.body;
     

   const existSubscription = await Subscribe.findOne({user:req.user._id,video});
   
  //  console.log(existSubscription);

   if(existSubscription){
    return res.status(400).json({error:'Already Subscribed'});
   }
   const newSubscription = new Subscribe({user:req.user._id,video});


   await newSubscription.save();

    //  Increment the subscriber count in the video
    await Video.findByIdAndUpdate(video, { $inc: { subscriberCount: 1 } });
    // console.log(video);
    return res.status(200).json({ success: "true",newSubscription, message: "Subscribed successfully" });
  } 
catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error, Error in subscribing' });
}
};

// Remove a subscription
const removeSubscription = async (req, res) => {
  try {
    const { videoId } = req.body;
    const userId = req.user._id;

    // Find and delete the subscription
    const subscription = await Subscribe.findOneAndDelete({ user: userId, video: videoId });
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Decrement the subscriber count in the video
    await Video.findByIdAndUpdate(
      videoId,
      {
          $inc: {
              subscriberCount: -1,
          },
      },
      { new: true } // Returns the updated document
  ).then((updatedVideo) => {
      if (updatedVideo.subscriberCount < 0) {
          updatedVideo.subscriberCount = 0;
          updatedVideo.save();
      }
  });

    return res.status(200).json({ success: "true", message: "Unsubscribed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error, Error in unsubscribing' });
  }
};

const getSubscriberCount = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    return res.status(200).json({ success: "true", subscriberCount: video.subscriberCount, message: "Subscriber count fetched" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error, Error in fetching subscriber count' });
  }
};



export {addSubscription,removeSubscription,getSubscriberCount}