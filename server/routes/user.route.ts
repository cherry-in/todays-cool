import express from 'express';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router
  .route("/signup")
  .post(userCtrl.signup)

router
  .route("/login")
  .post(userCtrl.login)

router
  .route("/logout")
  .get(userCtrl.logout)

router
  .route("/")
  .get(userCtrl.getUser)

export default router;