let SERVER_URI: string;

if (process.env.NODE_ENV === "development") {
  SERVER_URI = process.env.LOCAL_SERVER_URI!;
} else {
  SERVER_URI = process.env.PROD_SERVER_URI!;
}

let CLIENT_URI: string;

if (process.env.NODE_ENV === "development") {
  CLIENT_URI = process.env.LOCAL_CLIENT_URI!;
} else {
  CLIENT_URI = process.env.PROD_CLIENT_URI!;
}

export { SERVER_URI, CLIENT_URI };
