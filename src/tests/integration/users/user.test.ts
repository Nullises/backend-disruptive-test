import app from "../../../app";
import request from "supertest";

/** GET */
describe("GET /users", () => {
  it("should return a list of users with dynamic properties", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          accountID: expect.any(String),
          username: expect.any(String),
          email: expect.any(String),
          role: expect.any(String),
          __v: expect.any(Number),
        }),
      ])
    );
  });
});

/** GET BY ID */
describe("GET /users/:id", () => {
  it("should return an user by id", async () => {
    const response = await request(app).get(`/users/662c70a21b9360ae93d457a4`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        accountID: expect.any(String),
        username: expect.any(String),
        email: expect.any(String),
        role: expect.any(String),
        __v: expect.any(Number),
      })
    );
  });

  it("should fail if user id is wrong", async () => {
    const response = await request(app).get(`/users/662c70a21b9360ae93d457at`);
    expect(response.status).toBe(500);
  });
});

/** POST */
describe("POST /users", () => {
  it("should create a new user with the provided data", async () => {
    const newUser = {
      username: "nullises",
      email: "email@gmail.com",
      role: "ADMIN",
      accountID: "123456",
    };

    const response = await request(app).post("/users").send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        accountID: expect.any(String),
        username: expect.any(String),
        email: expect.any(String),
        role: expect.any(String),
        __v: expect.any(Number),
      })
    );

    // DELETE CREATED USER
    await request(app)
      .delete("/users")
      .query({
        id: `${response.body._id}`,
        adminAccountId: `${response.body.accountID}`,
      });
  });
});

/** PUT */
describe("PUT /users", () => {
  it("should update a new user with the provided data", async () => {
    const newUser = {
      username: "nullises",
      email: "email@gmail.com",
      role: "ADMIN",
      accountID: "123456",
    };

    const responseCreated = await request(app).post("/users").send(newUser);

    const dataToModify = {
      username: "Timmy Turner",
      adminAccountId: "123456", // Must include the Admin Account id
    };

    const response = await request(app)
      .put(`/users/${responseCreated.body._id}`)
      .send(dataToModify);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        accountID: expect.any(String),
        username: expect.any(String),
        email: expect.any(String),
        role: expect.any(String),
        __v: expect.any(Number),
      })
    );

    // DELETE CREATED USER
    await request(app)
      .delete("/users")
      .query({
        id: `${response.body._id}`,
        adminAccountId: `${response.body.accountID}`,
      });
  });

  it("should fail when user not pass adminAccountId", async () => {
    const dataToModify = {
      username: "Timmy Turner",
    };

    const response = await request(app)
      .put(`/users/662c70a21b9360ae93d457a4`)
      .send(dataToModify);

    expect(response.status).toBe(500);
  });
});

/** DELETE */
describe("DELETE /users", () => {
  it("should delete an user with the provided data", async () => {
    const newUser = {
      username: "nullises",
      email: "email@gmail.com",
      role: "ADMIN",
      accountID: "123456",
    };

    const response = await request(app).post("/users").send(newUser);

    // DELETE CREATED USER
    const responseDeleted = await request(app)
      .delete("/users")
      .query({
        id: `${response.body._id}`,
        adminAccountId: `${response.body.accountID}`,
      });

    expect(responseDeleted.status).toBe(200);
    expect(responseDeleted.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        accountID: expect.any(String),
        username: expect.any(String),
        email: expect.any(String),
        role: expect.any(String),
        __v: expect.any(Number),
      })
    );
  });
});
