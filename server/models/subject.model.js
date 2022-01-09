import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const SubjectModel = (sequelize) => {
  const Subject = sequelize.define(
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