import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { database } from "./database/database";
import router from "./router";
import swagger_Js_Doc from "swagger-jsdoc";
import swagger_config from "../src/doc/swagger.config.json";
import swagger_UI from "swagger-ui-express";

const app = express();
const swagger_docs = swagger_Js_Doc(swagger_config);

database();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router());
app.use("/api/v1/docs", swagger_UI.serve, swagger_UI.setup(swagger_docs));

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
