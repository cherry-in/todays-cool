import dotenv from "dotenv"
import app from "./app"
import appConfig from "./config/app.config"
import { sequelize, User } from "./db/index"

dotenv.config({
    path: `${process.env.NODE_ENV === "production" ? ".env" : ".env.development"
        }`,
});

sequelize
    .sync({ force: false })
    .then(async () => {
        await User.findOrCreate({
            where: { userID: "admin" },
            defaults: {
                userID: "admin",
                userName: "관리자",
                password: "admin!",
                role: "admin"
            }
        })
        
        app.listen(appConfig.port, () => {
            console.log(`Server is running on port ${appConfig.port}`);
        });
    })
    .catch((err:any) => {
        console.log(err);
    });
