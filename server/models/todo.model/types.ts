import { Model, Optional } from "sequelize/dist";

interface TodoAttributes {
    id: number;
    title: string;
    date: Date;
    done?: boolean;
    userId:number;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, "id"> { }

export interface TodoInterface extends Model<TodoAttributes, TodoCreationAttributes>,
    TodoAttributes {
  dataValues: TodoInterface;
}
