import express from "express";
import message from "./message";
import auth from "./auth";

const router = express.Router();

export default (): express.Router => {
  message(router);
  auth(router);
  return router;
};
