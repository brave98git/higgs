import { z } from "zod";

export const AvatarModel = {
  CreateAvatarSchema: z.object({
    name: z.string(),
    prompt: z.string(),
  }),
};