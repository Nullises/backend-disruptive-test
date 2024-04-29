import app from "../../../app";
import request from "supertest";

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

describe("GET /categories/:name", () => {
  it("should return a category by name", async () => {
    const response = await request(app).get(`/categories/VIDEOS`);

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
