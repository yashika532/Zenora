import {Router} from 'express'
import {signUpUser,
  loginUser,
  logoutUser,
  updateProfile
} from '../Controllers/user.js'
const router = Router();

router.route("/signUp").post(signUpUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/:id/update").post(updateProfile);
export default router;