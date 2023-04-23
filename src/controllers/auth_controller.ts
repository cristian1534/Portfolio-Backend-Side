import express from "express";
import { auth_by_email, create_admin } from "../controllers/api";
import { random, authentication } from "../helpers";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }

    const admin = await auth_by_email(email).select("+authentication.salt +authentication.password");
    ;
    if (!admin) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(admin.authentication.salt, password);
    if(admin.authentication.password !== expectedHash){
        return res.sendStatus(403);
    }


    const salt = random();
    admin.authentication.session_token = authentication(
      salt,
      admin._id.toString()
    );

    await admin.save();

    res.cookie("ADMIN-AUTH", admin.authentication.session_token, {
      domain: "localhost" ,
      path: "/",
    });

    return res.status(200).json(admin).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try{
      const { email, password } = req.body;

      if(!email || !password ) {
          return res.sendStatus(400);
      }
      const existing_admin = await auth_by_email( email );
      if(existing_admin) {
          return res.sendStatus(400);
      }

      const salt = random();
      const admin = await create_admin({
          email,
          authentication: {
              salt,
              password: authentication(salt, password)
          }
      })

      return res.status(200).json(admin).end();


  }catch(error) {
      console.log(error)
      return res.status(400);
  }
}