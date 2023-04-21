import express from "express";
import { post_message, get_messages, delete_message } from "../controllers/api";

export const create_message = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.sendStatus(400);
    }

    await post_message({ name, email, message });
    return res.sendStatus(200).end();
  } catch (err) {
    return res.sendStatus(400);
  }
};

export const get_all_messages = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const msgs = await get_messages();
    return res.status(200).json(msgs);
  } catch (err) {
    return res.sendStatus(400);
  }
};

export const delete_one_message = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    await delete_message(id);

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400);
  }
};
