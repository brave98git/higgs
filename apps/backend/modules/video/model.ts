import { z } from "zod";

export const VideoModel = {
  CreateVideoSchema: z.object({
    title: z.string(),
    url: z.string().url(),
  }),
  GetVideoSchema: z.object({
    videoID: z.string(),
  }),
};