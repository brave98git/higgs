import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import auth from "../modules/auth/index";
import video from "../modules/video";
import avatar from "../modules/avatar";

const app = new Elysia({ prefix: "/api/v1" })
  .use(
    staticPlugin({
      assets: "assets",
      prefix: "/assets",
    }),
  )
  .use(auth)
  .use(avatar)
  .use(video)
  .listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
