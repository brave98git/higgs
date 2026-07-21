import { Elysia } from "elysia";
import { AvatarModel } from "./model";
import { AvatarService } from "./service";

const avatarService = new AvatarService();

const avatar = new Elysia({ prefix: "/avatar" })
  .post("/", async ({ body }) => {
    return await avatarService.createAvatar(body.name, body.prompt);
  }, {
    body: AvatarModel.CreateAvatarSchema
  });
export default avatar;