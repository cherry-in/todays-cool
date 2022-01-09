import express from "express";
import userRouter from './user.route.js';
import scheduleRouter from "./schedule.route.js";
import subjectRouter from './subject.route.js';
import planRouter from './plan.route.js';
import todoRouter from "./todo.route.js";

const router = express.Router();

router.use('/auth', userRouter)
router.use('/schedule', scheduleRouter)
router.use('/subject', subjectRouter)
router.use('/plan', planRouter)
router.use('/todo', todoRouter)

export default router;