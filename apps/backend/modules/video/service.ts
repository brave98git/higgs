import { db } from "../../src/db";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { fetchPollinationsVideo } from "./pollinations";

export class VideoService {
  async createVideo(
    prompt: string,
    startFrame?: string,
    duration: number = 10,
    width: number = 1920,
    height: number = 1080
  ) {
    let user = await db.user.findFirst();
    if (!user) {
      user = await db.user.create({
        data: {
          username: "default_video_owner",
          password: "default_password",
        },
      });
    }

    const videoId = randomUUID();
    const assetsDir = path.resolve(__dirname, "../../assets/videos");
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    const fileName = `${videoId}.mp4`;
    const filePath = path.join(assetsDir, fileName);

    console.log(`[VideoService] Generating video for prompt: "${prompt}"...`);
    const seed = Math.floor(Math.random() * 1000000);
    const videoBuffer = await fetchPollinationsVideo({
      prompt,
      width,
      height,
      seed,
    });

    fs.writeFileSync(filePath, videoBuffer);
    console.log(`[VideoService] Video saved to ${filePath}`);

    const videoUrl = `/assets/videos/${fileName}`;

    const newVideo = await db.avatarVideo.create({
      data: {
        id: videoId,
        userId: user.id,
        prompt: prompt,
        startFrame: startFrame || videoUrl,
        duration: duration,
        width: width,
        height: height,
        status: "Done",
      },
    });

    return {
      success: true,
      id: newVideo.id,
      prompt: newVideo.prompt,
      url: videoUrl,
      duration: newVideo.duration,
      width: newVideo.width,
      height: newVideo.height,
      status: newVideo.status,
    };
  }

  async getVideoById(videoID: string) {
    const video = await db.avatarVideo.findUnique({
      where: { id: videoID },
    });
    if (!video) return null;
    return {
      id: video.id,
      prompt: video.prompt,
      url: video.startFrame || `/assets/videos/${video.id}.mp4`,
      duration: video.duration,
      width: video.width,
      height: video.height,
      status: video.status,
    };
  }

  async getAllVideos() {
    const videos = await db.avatarVideo.findMany();
    return videos.map((video) => ({
      id: video.id,
      prompt: video.prompt,
      url: video.startFrame || `/assets/videos/${video.id}.mp4`,
      duration: video.duration,
      width: video.width,
      height: video.height,
      status: video.status,
    }));
  }
}