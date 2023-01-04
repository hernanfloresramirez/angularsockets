import { Router } from 'express';
import { setprofile, signIn, signUp } from '../controllers/auth.controllers';
import upload from '../libs/storage';
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middlewares/verifySignup';
const router = Router();
router.post('/signup', [checkDuplicateUsernameOrEmail], signUp);
router.post('/signin', signIn);
router.post('/profile', upload.single('images'), setprofile)
export default router;
