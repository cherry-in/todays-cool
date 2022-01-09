import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const ScheduleModel = (sequelize) => {
    const Schedule =  sequelize.define(
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
                type:DataTypes.STRING,
                defaultValue: ""
            },
            memo: {
                type: DataTypes.TEXT,
                defaultValue: ""
            }
        },
        {
            timestampts: true,
        }
    )

    return Schedule
}

export default ScheduleModel