import express from 'express';
import planCtrl from '../controllers/plan.controller'

const router = express.Router();

router
  .route("/")
  .post(planCtrl.create)

router
  .route("/check/:planId")
  .put(planCtrl.putCk)

router
  .route("/:planId")
  .get(planCtrl.getOne)
  .put(planCtrl.edit)
  .delete(planCtrl.remove)

router.param("planId", planCtrl.getParams)

export default router;