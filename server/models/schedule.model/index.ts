import { DataTypes, Sequelize } from "sequelize";
import { ScheduleInterface } from "./types";

const ScheduleModel = (sequelize: Sequelize) => {
    const Schedule = sequelize.define<ScheduleInterface>(
        "schedule",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            start: {
                type: DataTypes.DATE,
                allowNull: false
            },
            end: {
                type: DataTypes.DATE
            },
            allDay: {
                type: DataTypes.BOOLEAN,
            },
            location: {
                type: DataTypes.STRING,
                defaultValue: ""
            },
            memo: {
                type: DataTypes.TEXT,
                defaultValue: ""
            },
            userId: {
                type: DataTypes.NUMBER
            }
        },
        {
            timestamps: true,
        }
    )

    return Schedule
}

export default ScheduleModel