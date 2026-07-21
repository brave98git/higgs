import { db } from "../../src/db";

export class VideoService {
  async createVideo(title: string, url: string) {
    // For schema requirement, we need a User. Let's find the first user, or create a dummy one if none exists.
    let user = await db.user.findFirst();
    if (!user) {
      user = await db.user.create({
        data: {
          username: "default_video_owner",
          password: "default_password",
        },
      });
    }

    const newVideo = await db.avatarVideo.create({
      data: {
        userId: user.id,
        prompt: title,
        startFrame: url, // Store url in startFrame field
        duration: 10,
        width: 1920,
        height: 1080,
        status: "Done",
      },
    });

    return {
      id: newVideo.id,
      title: newVideo.prompt,
      url: newVideo.startFrame || "",
    };
  }

  async getVideoById(videoID: string) {
    const video = await db.avatarVideo.findUnique({
      where: { id: videoID },
    });
    if (!video) return null;
    return {
      id: video.id,
      title: video.prompt,
      url: video.startFrame || "",
    };
  }

  async getAllVideos() {
    const videos = await db.avatarVideo.findMany();
    return videos.map((video) => ({
      id: video.id,
      title: video.prompt,
      url: video.startFrame || "",
    }));
  }
}