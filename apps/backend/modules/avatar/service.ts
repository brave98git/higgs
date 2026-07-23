import { db } from "../../src/db";
import { randomUUID } from "crypto";

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
    const newAvatar = await db.avatar.create({
      data: {
        id: avatarId,
        userId: user.id,
        name,
        prompt: "",
        avatarImages: {
          create: [
            {
              type: "Model",
              url: image,
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
