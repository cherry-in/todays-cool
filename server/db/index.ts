import { Sequelize } from "sequelize"
import dbConfig from "../config/db.config"
import UserModel from "../models/user.model";
import KUModel from "../models/ku.model";
import ScheduleModel from "../models/schedule.model";
import TodoModel from "../models/todo.model";
import SubjectModel from "../models/subject.model";
import PlanModel from "../models/plan.model";

const sequelize = new Sequelize(
    String(dbConfig.database),
    String(dbConfig.username),
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        timezone: dbConfig.timezone,
        pool: {
            max: dbConfig.pool?.max,
            min: dbConfig.pool?.min,
            acquire: dbConfig.pool?.acquire,
            idle: dbConfig.pool?.idle,
        },
    }
);

const User = UserModel(sequelize)
const KU = KUModel(sequelize)
const Schedule = ScheduleModel(sequelize)
const Todo = TodoModel(sequelize)
const Subject = SubjectModel(sequelize)
const Plan = PlanModel(sequelize)

Schedule.belongsTo(User)
Subject.belongsTo(User)
Todo.belongsTo(User)
Plan.belongsTo(Subject)

export {
    sequelize,
    User,
    KU,
    Schedule,
    Todo,
    Subject,
    Plan
}