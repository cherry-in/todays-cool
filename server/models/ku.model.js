import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const KUModel = (sequelize) => {
    const KU = sequelize.define(
        "ku",
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
            start: {
                type: DataTypes.DATE,
                allowNull: false
            },
            end: {
                type: DataTypes.DATE
            },
            memo: {
                type: DataTypes.TEXT,
                defaultValue: ""
            }
        },
        {
            timestamps: true,
            freezeTableName: true
        }
    )

    return KU
}

export default KUModel