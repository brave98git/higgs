import { Elysia } from "elysia";
import { VideoModel } from "./model";
import { VideoService } from "./service";

const videoService = new VideoService();

const video = new Elysia({ prefix: "/video" })
  .get("s", async () => {
    return await videoService.getAllVideos();
  }) // GET /api/v1/videos
  .post("/", async ({ body }) => {
    return await videoService.createVideo(
      body.prompt,
      body.url,
      body.duration,
      body.width,
      body.height
    );
  }, {
    body: VideoModel.CreateVideoSchema
  }) // POST /api/v1/video
  .get("/:videoID", async ({ params }) => {
    return await videoService.getVideoById(params.videoID);
  }, {
    params: VideoModel.GetVideoSchema
  }); // GET /api/v1/video/:videoID

export default video;