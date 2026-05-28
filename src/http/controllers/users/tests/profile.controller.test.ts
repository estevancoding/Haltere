import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Profile controller e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to get the user Profile", async () => {
    const { token } = await createAndAuthenticateUser(app);

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
