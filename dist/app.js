"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv = require("dotenv");
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./config/db");
const router = require("express").Router();
const userRoute = require("./app/user/route");
const authRoute = require("./app/auth/route");
const spotifyRoute = require("./app/spotify/route");
const cors = require("cors");
var cookieParser = require("cookie-parser");
dotenv.config();
// eslint-disable-line import/no-extraneous-dependencies
exports.app = require("express")();
const port = process.env.PORT;
db_1.db.connect();
exports.app.use(body_parser_1.default.json());
exports.app.use(cors()).use(cookieParser());
exports.app
    .get("/", (req, res) => {
    res.send("Express + TypeScript Server");
})
    .use("/", router);
userRoute.init(router);
authRoute.init(router);
spotifyRoute.init(router);
exports.app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
