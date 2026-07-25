import { db } from "../../src/db";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { fetchPollinationsImage } from "./pollinations";

export class AvatarService {
  async createAvatar(name: string, image: string) {
    let user = await db.user.findFirst();
    if (!user) {
      user = await db.user.create({
        data: {
          username: "default_avatar_owner",
          password: "default_password",
        },
      });
    }

    const avatarId = randomUUID();
    let imageUrl = image;
    let promptText = "";

    const isUrl = image.startsWith("http://") || image.startsWith("https://") || image.startsWith("data:") || image.startsWith("/");

    if (!isUrl) {
      promptText = image;
      const assetsDir = path.resolve(__dirname, "../../assets/avatars");
      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }
      const fileName = `${avatarId}.png`;
      const filePath = path.join(assetsDir, fileName);

      try {
        console.log(`[AvatarService] Generating image for prompt: "${promptText}"...`);
        const seed = Math.floor(Math.random() * 1000000);
        const imageBuffer = await fetchPollinationsImage({
          prompt: promptText,
          seed,
        });
        fs.writeFileSync(filePath, imageBuffer);
        imageUrl = `/assets/avatars/${fileName}`;
      } catch (err) {
        console.error("Failed to generate image via pollination, falling back to pollinations direct url:", err);
        imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}`;
      }
    }

    const newAvatar = await db.avatar.create({
      data: {
        id: avatarId,
        userId: user.id,
        name,
        prompt: promptText,
        avatarImages: {
          create: [
            {
              type: "Model",
              url: imageUrl,
            },
          ],
        },
      },
      include: {
        avatarImages: true,
      },
    });

    return {
      success: true,
      id: newAvatar.id,
      name: newAvatar.name,
      prompt: newAvatar.prompt,
      imageUrls: newAvatar.avatarImages.map((img) => img.url),
      createdAt: newAvatar.createdAt,
    };
  }

  async getAvatarById(avatarId: string) {
    const avatar = await db.avatar.findUnique({
      where: { id: avatarId },
      include: { avatarImages: true },
    });
    if (!avatar) return null;
    return {
      id: avatar.id,
      name: avatar.name,
      prompt: avatar.prompt,
      imageUrls: avatar.avatarImages.map((img) => img.url),
      createdAt: avatar.createdAt,
    };
  }

  async getAllAvatars() {
    const avatars = await db.avatar.findMany({
      include: { avatarImages: true },
      orderBy: { createdAt: "desc" },
    });
    return avatars.map((avatar) => ({
      id: avatar.id,
      name: avatar.name,
      prompt: avatar.prompt,
      imageUrls: avatar.avatarImages.map((img) => img.url),
      createdAt: avatar.createdAt,
    }));
  }
}
