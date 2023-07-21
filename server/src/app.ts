import express, { Express } from "express";
import bodyParser from "body-parser";
// import cors from 'cors'
const cors = require('cors')

let app: Express;
export const initExpressApp = () => {
  app = express();
  app.use(bodyParser.json());
  app.use(cors({
    origin: 'http://localhost:3000'
  }))

};

export const getExpressApp = (): Express => {
  return app;
};

