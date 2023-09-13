import request from "supertest";
import { db } from "../../../config/db";
const route = require("../route");

// Mock your PrismaClient and bcrypt dependencies as needed
jest.mock("../../../config/db");
jest.mock("@prisma/client");
jest.mock("bcrypt");

db.connect();

const express = require("express");
const app = express();

const router = express.Router(); // Create a router instance
app.use(express.json());
app.use("/", router);

route.init(router);

describe("Authentication Routes", () => {
  // it("should register a new user", async () => {
  //   const newUser = {
  //     full_name: "SAID Doeee",
  //     email: "fawzichibah@gmail.com",
  //     password: "testing",
  //   };

  //   const response = await request(app)
  //     .post("/register") // Use the correct endpoint path
  //     .send(newUser);

  //   expect(response.status).toBe(200);
  //   expect(response.body.success).toBe(true);
  // });

  it("should not log in a user", async () => {
    const response = await request(app)
      .post("/login") // Use the correct endpoint path
      .send({
        email: "fawzichibah@gmail.com",
        password: "testinga",
      });
    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });
});
