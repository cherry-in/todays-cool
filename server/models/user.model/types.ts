import { Model, Optional } from "sequelize/dist";

interface UserAttributes {
    id: number;
    userID: string;
    userName: string;
    password: string;
    studNum?: string;
    role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

export interface UserInterface extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
    comparePassword: (str: string) => Promise<boolean>;
}

export enum ROLE_NAME {
    USER = "user",
    ADMIN = "admin"
}

