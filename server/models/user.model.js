import bcrypt from "bcryptjs";
import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const UserModel = (sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userID: {
        type: DataTypes.STRING
      },
      userName: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      studNum: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "users",
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ["password"] },
        },
      },
    }
  );

  User.beforeSave(async (user) => {
    // if (!user.changed("password")) {
    //   return;
    // }
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }
  });

  User.prototype.comparePassword = async function (plainPassword) {
    const passwordMatch = await bcrypt.compare(
      plainPassword,
      this.password
    );
    return passwordMatch;
  };

  return User
};

export default UserModel;