import app from "../../../app";
import request from "supertest";

/** GET ALL */
describe("GET /themes", () => {
  it("should return a list of themes with dynamic properties", async () => {
    const response = await request(app).get("/themes");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          imagePermission: expect.any(Boolean),
          videoPermission: expect.any(Boolean),
          textPermission: expect.any(Boolean),
          adminAccountId: expect.any(String),
          __v: expect.any(Number),
        }),
      ])
    );
  });
});

/** GET BY ID */
describe("GET /themes/:name", () => {
  it("should return an theme by name", async () => {
    const response = await request(app).get(`/themes/Chemistry`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        name: expect.any(String),
        imagePermission: expect.any(Boolean),
        videoPermission: expect.any(Boolean),
        textPermission: expect.any(Boolean),
        adminAccountId: expect.any(String),
        __v: expect.any(Number),
      })
    );
  });
});

/** POST */
describe("POST /themes", () => {
  it("should create a new theme with the provided data", async () => {
    const newTheme = {
      name: "Maths",
      imagePermission: true,
      videoPermission: true,
      textPermission: true,
      adminAccountId: "123456",
    };

    const response = await request(app).post("/themes").send(newTheme);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        name: expect.any(String),
        imagePermission: expect.any(Boolean),
        videoPermission: expect.any(Boolean),
        textPermission: expect.any(Boolean),
        adminAccountId: expect.any(String),
        __v: expect.any(Number),
      })
    );

    // DELETE CREATED THEME
    await request(app)
      .delete("/themes")
      .query({
        id: `${response.body._id}`,
        adminAccountId: `${response.body.adminAccountId}`,
      });
  });
});

/** PUT */
describe("PUT /themes", () => {
  it("should update a new theme with the provided data", async () => {
    const newTheme = {
      name: "Maths",
      imagePermission: true,
      videoPermission: true,
      textPermission: true,
      adminAccountId: "123456",
    };

    const responseCreated = await request(app).post("/themes").send(newTheme);
    const dataToModify = {
      name: "Timmy Turner",
      adminAccountId: "123456", // Must include the Admin Account id
    };

    const response = await request(app)
      .put(`/themes/${responseCreated.body._id}`)
      .send(dataToModify);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        name: expect.any(String),
        imagePermission: expect.any(Boolean),
        videoPermission: expect.any(Boolean),
        textPermission: expect.any(Boolean),
        adminAccountId: expect.any(String),
        __v: expect.any(Number),
      })
    );

    // DELETE CREATED THEME
    await request(app)
      .delete("/themes")
      .query({
        id: `${response.body._id}`,
        adminAccountId: `${response.body.adminAccountId}`,
      });
  });

  it("should fail when theme not pass adminAccountId", async () => {
    const dataToModify = {
      username: "Timmy Turner",
    };

    const response = await request(app)
      .put(`/themes/662ca71547c13fbe25a05ea9`)
      .send(dataToModify);

    expect(response.status).toBe(500);
  });
});

/** DELETE */
describe("DELETE /themes", () => {
  it("should delete an theme with the provided data", async () => {
    const newTheme = {
      name: "Maths",
      imagePermission: true,
      videoPermission: true,
      textPermission: true,
      adminAccountId: "123456",
    };

    const response = await request(app).post("/themes").send(newTheme);

    // DELETE CREATED USER
    const responseDeleted = await request(app)
      .delete("/themes")
      .query({
        id: `${response.body._id}`,
        adminAccountId: `${response.body.adminAccountId}`,
      });

    expect(responseDeleted.status).toBe(200);
    expect(responseDeleted.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        name: expect.any(String),
        imagePermission: expect.any(Boolean),
        videoPermission: expect.any(Boolean),
        textPermission: expect.any(Boolean),
        adminAccountId: expect.any(String),
        __v: expect.any(Number),
      })
    );
  });
});
