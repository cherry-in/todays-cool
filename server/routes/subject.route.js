import express from 'express';
import subjectCtrl from '../controllers/subject.controller.js';

const router = express.Router();

router
  .route("/allaboutplan/:userId")
  .get(subjectCtrl.findAll)

router
  .route("/:userId")
  .get(subjectCtrl.findSubject)
  .post(subjectCtrl.create)
  .put(subjectCtrl.edit)
  .delete(subjectCtrl.remove)

router.param("userId", subjectCtrl.getParams)

export default router;