import { DataTypes, Sequelize } from "sequelize";
import { KUInterface } from "./types";

const KUModel = (sequelize: Sequelize) => {
    const KU = sequelize.define<KUInterface>(
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