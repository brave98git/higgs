import { z } from "zod";

export const VideoModel = {
  CreateVideoSchema: z.object({
    prompt: z.string(),
    url: z.string().optional(),
    duration: z.number().optional().default(10),
    width: z.number().optional().default(1920),
    height: z.number().optional().default(1080),
  }),
  GetVideoSchema: z.object({
    videoID: z.string(),
  }),
};