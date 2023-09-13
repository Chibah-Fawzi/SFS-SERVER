import { Router } from "express";
import { userController } from "./controller";

function init(router: Router) {
  router.route("/users").get(userController.getUsers);
}

module.exports.init = init;
