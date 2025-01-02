import {Router} from 'express'
import {signUpUser} from '../Controllers/user.js'
const router = Router();

router.route("/signUp").post(signUpUser)
export default router;