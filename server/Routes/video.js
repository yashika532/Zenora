import {Router} from 'express'
import {uploadVideo,
  getAllVideo,
  getVideoById,
  getAllVideoByUserId
} from '../Controllers/video.js'
import {auth} from '../middleware/authentication.js'
const router = Router();

router.route("/video").post(auth,uploadVideo);
router.get('/allVideo',getAllVideo);
router.get('/videoById/:id',getVideoById);
router.get('/:userId/channel',getAllVideoByUserId)
export default router;