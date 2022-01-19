import { Model, Optional } from "sequelize/dist";

interface SubjectAttributes {
    id: number;
    name: string;
    prof: string;
    room: string;
    userId:number;
}

interface SubjectCreationAttributes extends Optional<SubjectAttributes, "id"> { }

export interface SubjectInterface extends Model<SubjectAttributes, SubjectCreationAttributes>,
    SubjectAttributes {
  dataValues: any;
  
}
