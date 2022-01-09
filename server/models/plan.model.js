import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const PlanModel = (sequelize) => {
  const Plan = sequelize.define(
    "plan",
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
      deadline: {
        type: DataTypes.DATE,
        allowNull: false
      },
      memo: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      timeChecked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      checked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "plans",
    }
  );
  return Plan
};

export default PlanModel;