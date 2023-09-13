import { Express, Request, Response } from "express";
const dotenv = require("dotenv");

import bodyParser from "body-parser";
import { db } from "./config/db";
const router = require("express").Router();

const cors = require("cors");
var cookieParser = require("cookie-parser");

dotenv.config();

// eslint-disable-line import/no-extraneous-dependencies
export const app: Express = require("express")();
const port = process.env.PORT;
db.connect();

app.use(bodyParser.json());
app.use(cors()).use(cookieParser());

app
  .get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  })
  .use("/", router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
