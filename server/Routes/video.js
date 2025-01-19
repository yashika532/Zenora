import {Router} from 'express'
import {uploadVideo,
  getAllVideo,
  getVideoById,
  getAllVideoByUserId,
  handlelike,
  handleDislike,
  getLike,
  getDislike
} from '../Controllers/video.js'
import {auth} from '../middleware/authentication.js'
const router = Router();

router.route("/video").post(auth,uploadVideo);
router.get('/allVideo',getAllVideo);
router.get('/videoById/:id',getVideoById);
router.get('/:userId/channel',getAllVideoByUserId)
router.route('/:id/like').post(handlelike);
router.route("/:id/dislike").post(handleDislike);
router.get('/:id/getLike',getLike);
router.get('/:id/getDislike',getDislike);
export default router;