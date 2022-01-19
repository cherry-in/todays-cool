import {DataTypes, Sequelize} from "sequelize";
import { TodoInterface } from "./types";

const TodoModel = (sequelize:Sequelize) => {
  const Todo = sequelize.define<TodoInterface>(
    "todo",
    {
      id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.STRING
      },
      done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      userId: {
        type:DataTypes.NUMBER
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "todos",
    }
  );
  return Todo
};

export default TodoModel;