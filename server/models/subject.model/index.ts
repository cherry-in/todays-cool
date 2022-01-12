import { DataTypes, Sequelize } from "sequelize";
import { SubjectInterface } from "./types";

const SubjectModel = (sequelize: Sequelize) => {
  const Subject = sequelize.define<SubjectInterface>(
    "subject",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      prof: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      room: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      userId: {
        type: DataTypes.NUMBER
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "subjects",
    }
  );
  return Subject
};

export default SubjectModel;