"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jwt = require("jsonwebtoken");
function authenticateUser(req, res, next) {
    var _a;
    // Get the token from the request headers, cookies, or wherever you store it
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", ""); // Assuming you use the "Bearer" scheme
    if (!token) {
        return res.status(401).json({ error: "Unauthorized - Token missing" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized - Invalid token" });
        }
        // If the token is valid, you can attach the user information to the request object
        req.userId = decoded.userId; // Assuming you stored the user ID in the token payload
        next();
    });
}
exports.authenticateUser = authenticateUser;
