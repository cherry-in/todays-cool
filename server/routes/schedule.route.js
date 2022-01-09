import express from 'express';
import scheduleCtrl from "../controllers/schedule.controller.js";

const router = express.Router();

router
    .route("/:userId")
    .get(scheduleCtrl.querySeparation, scheduleCtrl.findbyId, scheduleCtrl.findbyDate, scheduleCtrl.send)
    .post(scheduleCtrl.create)
    .put(scheduleCtrl.edit)
    .delete(scheduleCtrl.remove)

router.param("userId", scheduleCtrl.getParams)

export default router;