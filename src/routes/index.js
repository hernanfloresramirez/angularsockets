import { Router } from "express";
import routerAuth from './auth.route';
//import routerUser from './user.routes';
const router = Router();
router.use('/auth', routerAuth);
//router.use('/user', routerUser);
export default router;
