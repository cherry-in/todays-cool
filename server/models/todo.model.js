import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const TodoModel = (sequelize) => {
  const Todo = sequelize.define(
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