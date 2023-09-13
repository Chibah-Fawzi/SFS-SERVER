"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
function init(router) {
    router.route("/tracks").post(controller_1.spotifyController.getTracks);
    router.route("/artists").post(controller_1.spotifyController.getArtists);
    router.route("/oAuth").get(controller_1.spotifyController.oAuth);
    router.route("/callback").get(controller_1.spotifyController.callback);
    router.route("/refresh_token").get(controller_1.spotifyController.refresh_token);
}
module.exports.init = init;
