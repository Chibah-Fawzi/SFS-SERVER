"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const db_1 = require("../../../config/db");
const route = require("../route");
// Mock your PrismaClient and bcrypt dependencies as needed
jest.mock("../../../config/db");
jest.mock("@prisma/client");
jest.mock("bcrypt");
db_1.db.connect();
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
    it("should not log in a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/login") // Use the correct endpoint path
            .send({
            email: "fawzichibah@gmail.com",
            password: "testinga",
        });
        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
    }));
});
