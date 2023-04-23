import express from "express";
import { get, merge } from "lodash";

import { auth_by_session_token } from "../controllers/api";

export const is_authenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const session_token = req.cookies["ADMIN-AUTH"];
    if (!session_token) {
      return res.sendStatus(403);
    }

    const existing_admin: any = await auth_by_session_token(session_token);
    if (!existing_admin) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existing_admin });

    return next();
  } catch (error) {
    console.log(error); 
    return res.sendStatus(400);
  }
};

export const is_owner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
