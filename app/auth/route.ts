import { Router } from "express";
import { authController } from "./controller";

function init(router: Router) {
  router.route("/register").post(authController.Register);
  router.route("/login").post(authController.Login);
}

module.exports.init = init;
