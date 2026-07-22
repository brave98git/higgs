import { Elysia, t } from "elysia";
import { AuthService } from "./service";
import { jwt } from "@elysia/jwt";

const authService = new AuthService();

const auth = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "higgssecret",
    })
  )
  .post(
    "/signup",
    async ({ body, set }) => {
      try {
        const id = await authService.signUp(body.username, body.password);
        return { id };
      } catch (error: any) {
        set.status = 400;
        return { error: error.message || "Failed to sign up" };
      }
    },
    {
      body: t.Object({
        username: t.String({ minLength: 3, maxLength: 20 }),
        password: t.String({ minLength: 8 }),
      }),
    }
  )
  .post(
    "/signin",
    async ({ body, jwt, set }) => {
      try {
        const user = await authService.signIn(body.username, body.password);
        const token = await jwt.sign({
          id: user.id,
          username: user.username,
        });
        return { token };
      } catch (error: any) {
        set.status = 401;
        return { error: error.message || "Invalid username or password" };
      }
    },
    {
      body: t.Object({
        username: t.String({ minLength: 3, maxLength: 20 }),
        password: t.String({ minLength: 8 }),
      }),
    }
  );

export default auth;
