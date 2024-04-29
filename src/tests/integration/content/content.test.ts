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
