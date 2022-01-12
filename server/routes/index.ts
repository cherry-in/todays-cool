import express from "express";
import userRouter from './user.route';
import scheduleRouter from "./schedule.route";
import subjectRouter from './subject.route';
import planRouter from './plan.route';
import todoRouter from "./todo.route";

const router = express.Router();

router.use('/auth', userRouter)
router.use('/schedule', scheduleRouter)
router.use('/subject', subjectRouter)
router.use('/plan', planRouter)
router.use('/todo', todoRouter)

export default router;