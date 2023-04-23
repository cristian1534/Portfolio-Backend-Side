import express from "express";
import { create_message, get_all_messages, delete_one_message } from "../controllers/message_controller";
import { is_authenticated, is_owner } from "../middleware/is_auth";

export default (router: express.Router) => {

  /**
   * @swagger
   * components:
   *   securitySchemes: 
   *      bearerAuth:
   *       type: http
   *       scheme: bearer
   *       required:
   *         - JWT Token
   * 
   *   schemas:
   *     Message:
   *       type: object
   *       required:
   *         - name:
   *         - email:
   *         - message:
   *       properties:
   *         name:
   *           type: string
   *           description: Sender's name.
   *         email:
   *           type: string
   *           description: Sender's name.
   *         message:
   *           type: string 
   *           description: Sender's name.
   */       

  /**
   * @swagger 
   * tags: 
   *   name: MESSAGE
   *   description: Portfolio Backend service.
  */

    /**
   * @swagger
    * /create-message:
  *   post:
  *     parameters: 
  *     summary: Create a new MESSAGE
  *     tags: [MESSAGE]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Message'
  *     responses:
  *       200:
  *         description: Ok
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Message'
  *       400:
  *         description: Bad Request
  */

  router.post("/create-message", create_message);


  /**
 * @swagger
 * /get-messages:
 *   get:
 *     security: 
 *       - bearerAuth: []
 *     summary: Get all MESSAGES from Clients.
 *     tags: [MESSAGE]
 *     parameters: 
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

  router.get("/get-messages", is_authenticated, get_all_messages);

  
/**
 * @swagger
 * /delete-message/{id}:
 *   delete:
 *     security: 
 *       - bearerAuth: []
 *     summary: Delete message selected.
 *     tags: [MESSAGE]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MESSAGE's id.
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: Server Error
 *       404:
 *         description: Not Found
 */

  router.delete("/delete-message/:id", is_authenticated, is_owner, delete_one_message);
};
