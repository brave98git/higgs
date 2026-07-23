import { Elysia } from "elysia";
import { AvatarModel } from "./model";
import { AvatarService } from "./service";

const avatarService = new AvatarService();

const avatar = new Elysia()
  .get("/avatars", async () => {
    return await avatarService.getAllAvatars();
  })
  .post("/avatar", async ({ body }) => {
     return await avatarService.createAvatar(body.name, body.image);
   }, {
     body: AvatarModel.CreateAvatarSchema
   })
  .get("/avatar/:avatarID", async ({ params }) => {
    return await avatarService.getAvatarById(params.avatarID);
  }, {
    params: AvatarModel.GetAvatarSchema
  });
export default avatar;