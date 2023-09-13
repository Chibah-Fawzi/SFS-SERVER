import request from "supertest";
import { db } from "../../../config/db";
const route = require("../route");

// Mock your PrismaClient and bcrypt dependencies as needed
jest.mock("../../../config/db");
// jest.mock("@prisma/client");

jest.mock("bcrypt");
db.connect();
const express = require("express");
const app = express();

const router = express.Router(); // Create a router instance
app.use(express.json());
app.use("/", router);

route.init(router);

it("should get all users", async () => {
  const response = await request(app).get("/users"); // Use the correct endpoint path
  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
});
