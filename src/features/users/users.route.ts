/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - accountID
 *         - username
 *         - email
 *         - role
 *       properties:
 *         accountID:
 *           type: string
 *           description: Account Id provide by AppWrite signUp/signIn
 *         username:
 *           type: string
 *           description: Username defined by user in AppWrite
 *         email:
 *           type: string
 *           description: Email defined by user in AppWrite
 *         role:
 *           type: string
 *           description: Role of the user. Only could be "ADMIN", "WRITTER" or "READER"
 *
 *       example:
 *         username: Nullises
 *         accountID: 123456
 *         email: texanico@gmail.com
 *         role: ADMIN
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users from Disruptive app
 * /users:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *       - in: query
 *         name: adminAccountId
 *         schema:
 *           type: string
 *         required: true
 *         description: The administrator Account id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id (MongoDB)
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       404:
 *         description: User don't found
 *   put:
 *    summary: Update the users by the id (Must include adminAccountId in the Body)
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        id: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

import express from "express";
import * as usersController from "./users.controller";

const router = express.Router();

router.get("/", usersController.getAll);

router.get("/:id", usersController.get);

router.post("/", usersController.create);

router.put("/:id", usersController.update);

router.delete("/", usersController.remove);

export default router;
