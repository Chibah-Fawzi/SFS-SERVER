"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
function init(router) {
    router.route("/register").post(controller_1.authController.Register);
    router.route("/login").post(controller_1.authController.Login);
}
module.exports.init = init;
