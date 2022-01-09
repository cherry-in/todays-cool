import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import mainRouter from "./routes/index.js";

// 배포용?
const isProduction = process.env.NODE_ENV === "production";
let root_url = "/";
if (isProduction) {
  root_url = "/app/todayku";
}
const CURRENT_WORKING_DIR = process.cwd();

const app = express();

console.log('current dir', path.join(CURRENT_WORKING_DIR, "client", "build"))
app.use(
  path.join(root_url, "/"),
  express.static(path.join(CURRENT_WORKING_DIR, "client", "build"))
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(path.join(root_url, "/api"), mainRouter);
// 클라이언트 라우팅
app.get("/*", function (req, res) {
  res.sendFile(path.join(CURRENT_WORKING_DIR, "client", "build", "index.html"));
});

export default app;
