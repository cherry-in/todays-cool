import { Model, Optional } from "sequelize/dist";

interface PlanAttributes {
    id: number;
    title: string;
    deadline: Date;
    memo: string;
    timeChecked: boolean;
    checked: boolean;
}

interface PlanCreationAttributes extends Optional<PlanAttributes, "id"> { }

export interface PlanInterface extends Model<PlanAttributes, PlanCreationAttributes>,
    PlanAttributes { }
