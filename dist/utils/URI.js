"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_URI = exports.SERVER_URI = void 0;
let SERVER_URI;
if (process.env.NODE_ENV === "development") {
    exports.SERVER_URI = SERVER_URI = process.env.LOCAL_SERVER_URI;
}
else {
    exports.SERVER_URI = SERVER_URI = process.env.PROD_SERVER_URI;
}
let CLIENT_URI;
if (process.env.NODE_ENV === "development") {
    exports.CLIENT_URI = CLIENT_URI = process.env.LOCAL_CLIENT_URI;
}
else {
    exports.CLIENT_URI = CLIENT_URI = process.env.PROD_CLIENT_URI;
}
