import { Router } from "express";
import {
  addSubscription,
  removeSubscription,
  getSubscriberCount
} from '../Controllers/subscribe.js'
import { auth } from "../middleware/authentication.js";
const router = Router();

router.route('/subscribe').post(auth,addSubscription);
router.delete('/unsubscribe', auth, removeSubscription);
router.get('/subscriber-count/:channelId', getSubscriberCount);
export default router;