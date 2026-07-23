import { z } from "zod";

export const AvatarModel = {
  CreateAvatarSchema: z.object({
    name: z.string(),
    image: z.string(),
  }),
  GetAvatarSchema: z.object({
    avatarID: z.string(),
  }),
};