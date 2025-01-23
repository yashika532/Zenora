import { Subscribe } from "../Models/subscribe.js";
import { User } from "../Models/user.js";

// Add a subscription
const addSubscription = async (req, res) => {
  try {
    const { channelId } = req.body; 

    if (!channelId) {
      return res.status(400).json({ error: "Channel ID is required" });
    }

    // Check if subscription already exists
    const existSubscription = await Subscribe.findOne({
      subscriber: req.user._id,
      channel: channelId,
    });

    if (existSubscription) {
      return res.status(200).json({ message: "Already subscribed to this channel" });
    }

    // Create a new subscription
    const newSubscription = new Subscribe({
      subscriber: req.user._id,
      channel: channelId,
    });

    await newSubscription.save();

    // Increment the subscriber count for the channel
    await User.findByIdAndUpdate(channelId, { $inc: { subscriberCount: 1 } });

    return res.status(200).json({
      success: true,
      newSubscription,
      message: "Subscribed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error, Error in subscribing",
    });
  }
};

// Remove a subscription
const removeSubscription = async (req, res) => {
  try {
    const { channelId } = req.body; 

    if (!channelId) {
      return res.status(400).json({ error: "Channel ID is required" });
    }
    
    
    // Find and delete the subscription
    const subscription = await Subscribe.findOneAndDelete({
      subscriber: req.user._id,
      channel: channelId,
    });

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    // Decrement the subscriber count for the channel
    await User.findByIdAndUpdate(channelId, { $inc: { subscriberCount: -1 } });

    return res.status(200).json({
      success: true,
      message: "Unsubscribed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error, Error in unsubscribing",
    });
  }
};

// Get subscriber count for a channel
const getSubscriberCount = async (req, res) => {
  try {
    const { channelId } = req.params; // The user whose subscriber count is being fetched

    const channel = await User.findById(channelId);

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    return res.status(200).json({
      success: true,
      subscriberCount: channel.subscriberCount || 0,
      message: "Subscriber count fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error, Error in fetching subscriber count",
    });
  }
};

export { addSubscription, removeSubscription, getSubscriberCount };
