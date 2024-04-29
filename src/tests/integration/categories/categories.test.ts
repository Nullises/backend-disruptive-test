import app from "../../../app";
import request from "supertest";

/** GET ALL */
describe("GET /categories", () => {
  it("should return a list of categories with dynamic properties", async () => {
    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          writePermission: expect.any(Boolean),
          readPermission: expect.any(Boolean),
          adminAccountId: expect.any(String),
          __v: expect.any(Number),
        }),
      ])
    );
  });
});

/** GET BY NAME */
describe("GET /categories/:name", () => {
  it("should return a category by name", async () => {
    const response = await request(app).get(`/categories/IMAGES`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        name: expect.any(String),
        writePermission: expect.any(Boolean),
        readPermission: expect.any(Boolean),
        adminAccountId: expect.any(String),
        __v: expect.any(Number),
      })
    );
  });

  it("should be null when a category name is not from allowed (VIDEOS, TEXT, IMAGES)", async () => {
    const response = await request(app).get(`/categories/AUDIOS`);
    expect(response.status).toBe(200);
    expect(response.body).toBe(null);
  });
});

/** POST */
describe("POST /categories", () => {
  it("should create a new category with the provided data", async () => {
    const newCategory = {
      adminAccountId: "123456",
      name: "VIDEOS",
      writePermission: true,
      readPermission: true,
    };

    const response = await request(app).post("/categories").send(newCategory);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        name: expect.any(String),
        writePermission: expect.any(Boolean),
        readPermission: expect.any(Boolean),
        adminAccountId: expect.any(String),
        __v: expect.any(Number),
      })
    );

    // DELETE CREATED Category
    await request(app)
      .delete("/categories")
      .query({
        id: `${response.body._id}`,
        adminAccountId: `${response.body.adminAccountId}`,
      });
  });

  it("should fail when try to create a category which is not allowed (only allowed VIDEOS, IMAGES or TEXT)", async () => {
    const dataToPost = {
      username: "Timmy Turner",
      writePermission: true,
      readPermission: true,
      adminAccountId: "123456", // Must include the Admin Account id
    };

    const response = await request(app).post(`/categories`).send(dataToPost);

    expect(response.status).toBe(500);
  });
});

/** PUT */
describe("PUT /categories", () => {
  it("should update a new category with the provided data", async () => {
    const newCategory = {
      adminAccountId: "123456",
      name: "VIDEOS",
      writePermission: true,
      readPermission: true,
    };

    const responseCreated = await request(app)
      .post("/categories")
      .send(newCategory);
    const dataToModify = {
      name: "IMAGES",
      adminAccountId: "123456", // Must include the Admin Account id
    };

    const response = await request(app)
      .put(`/categories/${responseCreated.body._id}`)
      .send(dataToModify);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        name: expect.any(String),
        writePermission: expect.any(Boolean),
        readPermission: expect.any(Boolean),
        adminAccountId: expect.any(String),
        __v: expect.any(Number),
      })
    );

    // DELETE CREATED CATEGORY
    await request(app)
      .delete("/categories")
      .query({
        id: `${response.body._id}`,
        adminAccountId: `${response.body.adminAccountId}`,
      });
  });

  it("should fail when category not pass adminAccountId", async () => {
    const dataToModify = {
      username: "IMAGES",
    };

    const response = await request(app)
      .put(`/categories/662c7b286e2b8db12d051592`)
      .send(dataToModify);

    expect(response.status).toBe(500);
  });

  it("should fail when try to update a category which is not allowed (only allowed VIDEOS, IMAGES or TEXT)", async () => {
    const dataToModify = {
      username: "Timmy Turner",
      adminAccountId: "123456", // Must include the Admin Account id
    };

    const response = await request(app)
      .put(`/categories/662c7b286e2b8db12d051592`)
      .send(dataToModify);

    expect(response.status).toBe(500);
  });
});

/** DELETE */
describe("DELETE /categories", () => {
  it("should delete a category with the provided data", async () => {
    const newCategory = {
      adminAccountId: "123456",
      name: "VIDEOS",
      writePermission: true,
      readPermission: true,
    };

    const response = await request(app).post("/categories").send(newCategory);

    // DELETE CREATED CATEGORY
    const responseDeleted = await request(app)
      .delete("/categories")
      .query({
        id: `${response.body._id}`,
        adminAccountId: `${response.body.adminAccountId}`,
      });

    expect(responseDeleted.status).toBe(200);
    expect(responseDeleted.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        name: expect.any(String),
        writePermission: expect.any(Boolean),
        readPermission: expect.any(Boolean),
        adminAccountId: expect.any(String),
        __v: expect.any(Number),
      })
    );
  });
});
