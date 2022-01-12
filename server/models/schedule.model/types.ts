import { Model, Optional } from "sequelize/dist";

interface ScheduleAttributes {
    id: number;
    title: string;
    start: Date;
    end: Date;
    allDay:boolean;
    location:string;
    memo: string;
}

interface ScheduleCreationAttributes extends Optional<ScheduleAttributes, "id"> { }

export interface ScheduleInterface extends Model<ScheduleAttributes, ScheduleCreationAttributes>,
    ScheduleAttributes { }
