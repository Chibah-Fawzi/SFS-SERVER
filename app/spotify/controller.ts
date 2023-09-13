import { db } from "../../config/db";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { CLIENT_URI } from "../../utils/URI";
const querystring = require("querystring");
const prisma = new PrismaClient();
var request = require("request");

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const frontend_uri = process.env.LOCAL_CLIENT_URI;
const scope =
  "user-read-private user-read-email user-top-read playlist-read-private playlist-read-collaborative";
const state = generateRandomString(16);

async function oAuth(req: any, res: any) {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
}

async function callback(req: any, res: any) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const { code, state } = req.query;
  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error: any, response: any, body: any) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token,
          expires_in = body.expires_in;

        const currentDate = new Date();

        const expiration_date = new Date(
          currentDate.getTime() + expires_in * 1000
        );

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error: any, response: any, body: any) {
          if (error) {
            console.log(error);
          }
          console.log("SPOTIFY ACCOUNT: ", body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          frontend_uri +
            "?access_token=" +
            access_token +
            "&refresh_token=" +
            refresh_token +
            "&expiration=" +
            expiration_date
        );
      }
    });
  }
}

async function refresh_token(req: any, res: any) {
  var refresh_token = req.query.refresh_token;

  console.log("refresh_token: ", req.query);

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error: any, response: any, body: any) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      var expires_in = body.expires_in;
      res.send({
        access_token: access_token,
        expires_in: expires_in,
      });
    }
  });
}

async function getTracks(req: any, res: any) {
  const { access_token } = req.body;
  const { time_range } = req.query;

  axios
    .get(`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}`, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response.data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    });
}

async function getArtists(req: any, res: any) {
  const { access_token } = req.body;

  axios
    .get(`https://api.spotify.com/v1/me/top/artists`, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response.data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error,
      });
    });
}

async function getProfile(req: any, res: any) {
  const { access_token } = req.body;

  axios
    .get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response.data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error,
      });
    });
}

export const spotifyController = {
  getProfile,
  getTracks,
  oAuth,
  getArtists,
  callback,
  refresh_token,
};
