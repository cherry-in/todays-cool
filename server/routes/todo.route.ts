import express from 'express';
import todoCtrl from "../controllers/todo.controller";

const router = express.Router();

router
    .route("/percent/:userId")
    .get(todoCtrl.findforPercent)

router
    .route("/:userId")
    .get(todoCtrl.findbyDate)
    .post(todoCtrl.create)
    .put(todoCtrl.edit)
    .delete(todoCtrl.remove)

router.param("userId", todoCtrl.getParams)

export default router;