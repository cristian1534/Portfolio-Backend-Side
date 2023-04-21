import express from "express";
import message from "./message";

const router = express.Router();


export default (): express.Router => {
    message(router);
    return router;
};