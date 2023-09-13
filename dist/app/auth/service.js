"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = void 0;
const bcrypt = require("bcrypt");
function comparePassword(password, passwordb) {
    return bcrypt.compareSync(password, passwordb);
}
exports.comparePassword = comparePassword;
