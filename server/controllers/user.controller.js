import jwt from "jsonwebtoken";
import { User } from '../db/index.js';
import config from "../config/app.config.js";

const getUser = async (req, res) => {
  try {
    if (req.cookies[config.cookieName]) {
      const token = req.cookies[config.cookieName];
      const { id, role, name } = jwt.verify(token, config.jwtSecret);
      return res.json({ id, role, name });
    } else {
      throw new Error("유효기간이 만료되었습니다. 다시 로그인해주세요.")
    }
  } catch (error) {
    return res.status(500).send(error.message || "사용자 정보 가져오는 중 에러 발생");
  }
}

const signup = async (req, res) => {
  const { userId, password, userName, userStudNum } = req.body;
  try {
    const findId = await User.findOne({ where: { userID: userId } });
    if (findId) {
      throw new Error("이미 있는 회원정보 입니다.");
    }
    await User.create({
      userID: userId,
      password: password,
      userName: userName,
      studNum: userStudNum,
      role: "user"
    });
    return res.status(201).json("success")
  } catch (error) {
    console.log(error)
    return res.status(500).send(error.message || "회원가입 에러발생")
  }
}

const login = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.scope("withPassword").findOne({ where: { userID: userId } });
    console.log('user확인', user)
    if (!user) {
      return res.status(404).send(`일치하는 정보가 없습니다.`);
    }
    const passwordMatch = await user.comparePassword(password);
    if (passwordMatch) {

      const signData = {
        id: user.id,
        role: user.role,
        name: user.userName,
      };

      const token = jwt.sign(signData, config.jwtSecret, {
        expiresIn: config.jwtExpires,
      });

      res.cookie(config.cookieName, token, {
        maxAge: config.cookieMaxAge,
        path: "/",
        httpOnly: config.env === "production",
        secure: config.env === "production",
      });

      res.status(201).json(signData)
    } else {
      res.status(401).send("비밀번호가 일치하지 않습니다.")
    }

  } catch (error) {
    console.log(error)
    return res.status(500).send("로그인 에러발생")
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie(config.cookieName);
    return res.json({
      id:"",
      role:"user",
      name:""
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send("로그아웃 에러발생")
  }
}

export default {
  getUser,
  signup,
  login,
  logout
}