import { Model, Optional } from "sequelize/dist";

interface KUAttributes {
    id: number;
    title: string;
    start: Date;
    end: Date;
    memo: string;
}

interface KUCreationAttributes extends Optional<KUAttributes, "id"> { }

export interface KUInterface extends Model<KUAttributes, KUCreationAttributes>,
    KUAttributes { }
