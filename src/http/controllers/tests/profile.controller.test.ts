import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile controller e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to get the user Profile", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const authRes = await request(app.server).post("/sessions").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    const { token }: { token: string } = authRes.body;

    const profileRes = await request(app.server)
      .get("/me")
      .auth(token, {
        type: "bearer",
      })
      .send();

    expect(profileRes.statusCode).toEqual(200);
    expect(profileRes.body.user).toEqual(
      expect.objectContaining({
        email: "johndoe@example.com",
      }),
    );
  });
});
