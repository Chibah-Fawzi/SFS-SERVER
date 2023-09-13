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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const db_1 = require("../../config/db");
const client_1 = require("@prisma/client");
const service_1 = require("./service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
function Register(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        db_1.db.connect();
        const { full_name, email, password } = req.body;
        try {
            const isUserExist = yield ((_a = prisma.user) === null || _a === void 0 ? void 0 : _a.findUnique({ where: { email } }));
            if (!isUserExist) {
                const hashedPassword = yield bcrypt.hash(password, 10);
                const user = yield ((_b = prisma === null || prisma === void 0 ? void 0 : prisma.user) === null || _b === void 0 ? void 0 : _b.create({
                    data: {
                        full_name,
                        email,
                        password: hashedPassword,
                    },
                }));
                // Generate a JWT token for the user session
                const token = yield jwt.sign({ userId: user === null || user === void 0 ? void 0 : user.id }, process.env.JWT_SECRET_KEY, {
                    expiresIn: "730h",
                });
                res.status(200).json({
                    success: true,
                    result: user,
                    token,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    error: "This user already exists!",
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            });
        }
    });
}
function Login(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let errors = [];
        const { email, password } = req.body;
        // Form validations
        if (!email || !password) {
            errors.push("Please enter all the fields");
            res.status(500).json({
                success: false,
                error: errors[0],
            });
        }
        if (errors.length > 0) {
            res.status(500).json({
                success: false,
                error: errors[0],
            });
        }
        else {
            // Check if the user email exists
            let user;
            if (prisma.user) {
                user = yield ((_a = prisma.user) === null || _a === void 0 ? void 0 : _a.findUnique({
                    where: { email: req.body.email },
                }));
            }
            if (!user || !(0, service_1.comparePassword)(password, user.password)) {
                errors.push("Credentials incorrect");
                res.status(500).json({
                    success: false,
                    error: errors[0],
                });
            }
            else {
                const payload = {
                    email: user.email,
                    id: user.id,
                };
                const token = yield jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                    expiresIn: "1h",
                });
                // Return the current user & the token
                res.status(200).json({
                    success: true,
                    user,
                    token,
                });
            }
        }
    });
}
exports.authController = {
    Register,
    Login,
};
