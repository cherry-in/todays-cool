import { Model, Optional } from "sequelize/dist";

interface ScheduleAttributes {
    id: number;
    title: string;
    start: Date;
    end: Date;
    allDay:boolean;
    location:string;
    memo: string;
    userId: number;
}

interface ScheduleCreationAttributes extends Optional<ScheduleAttributes, "id"> { }

export interface ScheduleInterface extends Model<ScheduleAttributes, ScheduleCreationAttributes>,
    ScheduleAttributes {
    dataValues: any;
}
