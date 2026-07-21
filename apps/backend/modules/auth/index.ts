import { Elysia } from "elysia";
import { AuthModel } from "./model";
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
    async ({ body }) => {
      const id = await authService.signUp(body.username, body.password);
      return { id };
    },
    {
      body: AuthModel.SignUpSchema,
    }
  )
  .post(
    "/signin",
    async ({ body,jwt }) => {
      const user = await authService.signIn(body.username, body.password);
      const token = await jwt.sign({
        id: user.id,
        username: user.username
      })
      return { token };
    },
    {
      body: AuthModel.SignInSchema,
    }
  );
export default auth;
