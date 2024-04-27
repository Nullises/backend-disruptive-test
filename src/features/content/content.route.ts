/**
 * @swagger
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       required:
 *         - title
 *         - categoryId
 *         - themeId
 *         - url
 *         - credits
 *         - userAccountId
 *       properties:
 *         title:
 *           type: string
 *           description: The Title of the content
 *         categoryId:
 *           type: string
 *           description: Category Id  that this content belongs to. (Query Categories first)
 *         themeId:
 *           type: string
 *           description: Theme Id  that this content belongs to. (Query Themes first)
 *         url:
 *           type: string
 *           description: Url where is located the file (image, text, video) in Appwrite bucket
 *         credits:
 *           type: string
 *           description: Username that this content belongs to.
 *         userAccountId:
 *           type: string
 *           description: Id of User Account (AppWrite)
 *       example:
 *         title: AI rules the world
 *         categoryId: 662c70e01b9360ae93d457aa
 *         themeId: 662c72cdf5be29e49def53b7
 *         url: http://localhost:3000
 *         credits: nullises
 *         userAccountId: 123456
 */

/**
 * @swagger
 * tags:
 *   name: Content
 *   description: Content from Disruptive app
 * /content:
 *   get:
 *     summary: Lists all the contents (For Realtime Content use WS server)
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: The list of the contents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 *   post:
 *     summary: Create a new content
 *     tags: [Content]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       200:
 *         description: The created content.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Remove the content by id
 *     tags: [Content]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category content
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
 *         description: The content was deleted
 *       404:
 *         description: The content was not found
 * /content/{id}:
 *   get:
 *     summary: Get the content by id
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The content name
 *     responses:
 *       200:
 *         description: The content response by name
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: The content was not found
 *   put:
 *    summary: Update the content by the id
 *    tags: [Content]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The content id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Content'
 *    responses:
 *      200:
 *        description: The content was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Content'
 *      404:
 *        description: The category was not found
 *      500:
 *        description: Some error happened
 */

import express from "express";
import * as contentController from "./content.controller";

const router = express.Router();

router.get("/", contentController.getAll);

router.get("/:id", contentController.get);

router.post("/", contentController.create);

router.put("/:id", contentController.update);

router.delete("/", contentController.remove);

export default router;
