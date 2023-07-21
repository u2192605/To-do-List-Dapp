import express, { Express } from "express";
import bodyParser from "body-parser";

let app: Express;
export const initExpressApp = () => {
  app = express();
  app.use(bodyParser.json());
};

export const getExpressApp = (): Express => {
  return app;
};
