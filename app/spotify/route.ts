import { Router } from "express";
import { spotifyController } from "./controller";

function init(router: Router) {
  router.route("/tracks").post(spotifyController.getTracks);
  router.route("/artists").post(spotifyController.getArtists);
  router.route("/oAuth").get(spotifyController.oAuth);
  router.route("/callback").get(spotifyController.callback);
  router.route("/refresh_token").get(spotifyController.refresh_token);
}

module.exports.init = init;
