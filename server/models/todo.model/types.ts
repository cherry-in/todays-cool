import { Model, Optional } from "sequelize/dist";

interface TodoAttributes {
    id: number;
    title: string;
    date: Date;
    done: boolean;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, "id"> { }

export interface TodoInterface extends Model<TodoAttributes, TodoCreationAttributes>,
    TodoAttributes { }
