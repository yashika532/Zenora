import { Router } from "express";
import {
  addSubscription,
  removeSubscription,
  getSubscriberCount,
  getSubscriptionStatus
} from '../Controllers/subscribe.js'
import { auth } from "../middleware/authentication.js";
const router = Router();

router.route('/subscribe').post(auth,addSubscription);
router.delete('/unsubscribe', auth, removeSubscription);
router.get('/subscriber-count/:channelId', getSubscriberCount);
router.get('/status/:channelId',auth,getSubscriptionStatus)
export default router;