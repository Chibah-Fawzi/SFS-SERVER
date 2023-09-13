"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
function init(router) {
    router.route("/users").get(controller_1.userController.getUsers);
}
module.exports.init = init;
