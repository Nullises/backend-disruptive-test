import app from "../../../app";
import request from "supertest";

describe("GET /content", () => {
  it("should return a list of contents with dynamic properties", async () => {
    const response = await request(app).get("/content");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          title: expect.any(String),
          categoryId: expect.any(String),
          themeId: expect.any(String),
          url: expect.any(String),
          credits: expect.any(String),
          userAccountId: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          __v: expect.any(Number),
        }),
      ])
    );
  });
});

/** GET BY ID */
describe("GET /content/:id", () => {
  it("should return an content by id", async () => {
    const response = await request(app).get(
      `/content/662d3d9e01cadd6d0e2e1401`
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        title: expect.any(String),
        categoryId: expect.any(String),
        themeId: expect.any(String),
        url: expect.any(String),
        credits: expect.any(String),
        userAccountId: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: expect.any(Number),
      })
    );
  });

  it("should fail if content id is wrong", async () => {
    const response = await request(app).get(
      `/content/662c70a21b9360ae93d457at`
    );
    expect(response.status).toBe(500);
  });
});

/** POST */
describe("POST /content", () => {
  it("should create a new content with the provided data", async () => {
    const newContent = {
      title: "asasadasasas",
      categoryId: "662c7b286e2b8db12d051592",
      themeId: "662ca71547c13fbe25a05ea9",
      url: "http://localhost:3000",
      credits: "nullises",
      userAccountId: "123456",
    };

    const response = await request(app).post("/content").send(newContent);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        title: expect.any(String),
        categoryId: expect.any(String),
        themeId: expect.any(String),
        url: expect.any(String),
        credits: expect.any(String),
        userAccountId: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: expect.any(Number),
      })
    );

    // DELETE CREATED CONTENT
    await request(app)
      .delete("/content")
      .query({
        id: `${response.body._id}`,
        adminAccountId: `${response.body.userAccountId}`,
      });
  });

  it("should fail if user role is not WRITTER OR ADMIN", async () => {
    const newContent = {
      title: "asasadasasas",
      categoryId: "662c7b286e2b8db12d051592",
      themeId: "662ca71547c13fbe25a05ea9",
      url: "http://localhost:3000",
      credits: "nullises",
      userAccountId: "12345679373",
    };

    const response = await request(app).post("/content").send(newContent);
    expect(response.status).toBe(500);
  });
});

/** PUT */
describe("PUT /content", () => {
  it("should update a new content with the provided data", async () => {
    const newContent = {
      title: "asasadasasas",
      categoryId: "662c7b286e2b8db12d051592",
      themeId: "662ca71547c13fbe25a05ea9",
      url: "http://localhost:3000",
      credits: "nullises",
      userAccountId: "123456",
    };

    const responseCreated = await request(app)
      .post("/content")
      .send(newContent);

    const dataToModify = {
      title: "Timmy Turner",
      userAccountId: "123456", // Must include the User account id (only if is ADMIN or WRITTER)
    };

    const response = await request(app)
      .put(`/content/${responseCreated.body._id}`)
      .send(dataToModify);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        title: expect.any(String),
        categoryId: expect.any(String),
        themeId: expect.any(String),
        url: expect.any(String),
        credits: expect.any(String),
        userAccountId: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: expect.any(Number),
      })
    );

    // DELETE CREATED USER
    await request(app)
      .delete("/content")
      .query({
        id: `${response.body._id}`,
        adminAccountId: `${response.body.accountID}`,
      });
  });

  it("should fail when user not pass userAccountId", async () => {
    const dataToModify = {
      username: "Timmy Turner",
    };

    const response = await request(app)
      .put(`/content/662d3d9e01cadd6d0e2e1401`)
      .send(dataToModify);

    expect(response.status).toBe(500);
  });
});

/** DELETE */
describe("DELETE /content", () => {
  it("should delete a content with the provided data", async () => {
    const newContent = {
      title: "asasadasasas",
      categoryId: "662c7b286e2b8db12d051592",
      themeId: "662ca71547c13fbe25a05ea9",
      url: "http://localhost:3000",
      credits: "nullises",
      userAccountId: "123456",
    };

    const response = await request(app).post("/content").send(newContent);

    // DELETE CREATED USER
    const responseDeleted = await request(app)
      .delete("/content")
      .query({
        id: `${response.body._id}`,
        adminAccountId: `${response.body.userAccountId}`,
      });

    expect(responseDeleted.status).toBe(200);
    expect(responseDeleted.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        title: expect.any(String),
        categoryId: expect.any(String),
        themeId: expect.any(String),
        url: expect.any(String),
        credits: expect.any(String),
        userAccountId: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: expect.any(Number),
      })
    );
  });
});
