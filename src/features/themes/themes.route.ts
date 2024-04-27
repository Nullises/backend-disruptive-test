/**
 * @swagger
 * components:
 *   schemas:
 *     Themes:
 *       type: object
 *       required:
 *         - name
 *         - imagePermission
 *         - videoPermission
 *         - textPermission
 *         - adminAccountId
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the Theme, must be unique
 *         imagePermission:
 *           type: boolean
 *           description: Image Permissions
 *         videoPermission:
 *           type: boolean
 *           description: Video Permissions
 *         textPermission:
 *           type: boolean
 *           description: Text Permissions
 *         adminAccountId:
 *           type: string
 *           description: Id of Admin Account
 *       example:
 *         name: Maths
 *         imagePermission: true
 *         videoPermission: true
 *         textPermission: false
 *         adminAccountId: 123456
 */

/**
 * @swagger
 * tags:
 *   name: Themes
 *   description: The themes from Disruptive app
 * /themes:
 *   get:
 *     summary: Lists all the themes
 *     tags: [Themes]
 *     responses:
 *       200:
 *         description: The list of the themes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Themes'
 *   post:
 *     summary: Create a new theme
 *     tags: [Themes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Themes'
 *     responses:
 *       200:
 *         description: The created theme.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Themes'
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Remove the theme by id
 *     tags: [Themes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The theme id
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
 *         description: The theme was deleted
 *       404:
 *         description: The theme was not found
 * /themes/{name}:
 *   get:
 *     summary: Get the theme by name
 *     tags: [Themes]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The theme name
 *     responses:
 *       200:
 *         description: The theme response by name
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Themes'
 *       404:
 *         description: The theme was not found
 *   put:
 *    summary: Update the themes by the id
 *    tags: [Themes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The theme id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Themes'
 *    responses:
 *      200:
 *        description: The theme was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Themes'
 *      404:
 *        description: The theme was not found
 *      500:
 *        description: Some error happened
 */

import express from "express";
import * as themesController from "./themes.controller";

const router = express.Router();

router.get("/", themesController.getAll);

router.get("/:id", themesController.get);

router.post("/", themesController.create);

router.put("/:id", themesController.update);

router.delete("/", themesController.remove);

export default router;
