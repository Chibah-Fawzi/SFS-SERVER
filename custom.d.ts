// custom.d.ts
declare namespace Express {
  export interface Request {
    userId?: number; // Add your user ID type here
  }
}

// customTypes.d.ts
declare module "custom-express" {
  import {
    Request as ExpressRequest,
    Response as ExpressResponse,
  } from "express";

  export interface Request extends ExpressRequest {
    // Add any custom properties or methods you need for your tests
  }

  export interface Response extends ExpressResponse {
    // Add any custom properties or methods you need for your tests
  }
}
