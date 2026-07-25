import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import auth from "../modules/auth/index";
import video from "../modules/video";
import avatar from "../modules/avatar";
import cors from "@elysiajs/cors";


const app = new Elysia()
  .use(cors())
  .use(
    staticPlugin({
      assets: "assets",
      prefix: "/assets",
    }),
  )
  .group("/api/v1", (api) =>
    api
      .use(auth)
      .use(avatar)
      .use(video)
  )
  .listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
  });
