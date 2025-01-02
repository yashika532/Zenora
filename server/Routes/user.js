import {Router} from 'express'
import {signUpUser,
  loginUser
} from '../Controllers/user.js'
const router = Router();

router.route("/signUp").post(signUpUser)
router.route("/login").post(loginUser)
export default router;