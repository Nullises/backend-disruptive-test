/**
 * @swagger
 * components:
 *   schemas:
 *     Categories:
 *       type: object
 *       required:
 *         - name
 *         - adminAccountId
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the Category. Only accepts VIDEOS, IMAGES or TEXT
 *         writePermission:
 *           type: boolean
 *           description: Write Permissions
 *         readPermission:
 *           type: boolean
 *           description: Read Permissions
 *         adminAccountId:
 *           type: string
 *           description: Id of Admin Account
 *       example:
 *         name: VIDEOS
 *         writePermission: true
 *         readPermission: true
 *         adminAccountId: 123456
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: The categories from Disruptive app
 * /categories:
 *   get:
 *     summary: Lists all the categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: The list of the categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categories'
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categories'
 *     responses:
 *       200:
 *         description: The created category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categories'
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Remove the category by id
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
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
 *         description: The category was deleted
 *       404:
 *         description: The category was not found
 * /categories/{name}:
 *   get:
 *     summary: Get the category by name
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The category name
 *     responses:
 *       200:
 *         description: The category response by name
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categories'
 *       404:
 *         description: The category was not found
 *   put:
 *    summary: Update the categories by the id
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Categories'
 *    responses:
 *      200:
 *        description: The category was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Categories'
 *      404:
 *        description: The category was not found
 *      500:
 *        description: Some error happened
 */

import express from "express";
import * as categoriesController from "./categories.controller";

const router = express.Router();

router.get("/", categoriesController.getAll);

router.get("/:id", categoriesController.get);

router.post("/", categoriesController.create);

router.put("/:id", categoriesController.update);

router.delete("/", categoriesController.remove);

export default router;
