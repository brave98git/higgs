import { db } from "../../src/db";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { fetchPollinationsImage } from "./pollinations";

export class AvatarService {
  async createAvatar(name: string, prompt: string) {
    const fullPrompt = `${prompt}, high quality professional headshot avatar for ${name}`;
    const assetsDir = path.resolve(__dirname, "../../assets");
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    const avatarId = randomUUID();
    const fileName = `${avatarId}.png`;

    const filePath = path.join(assetsDir, fileName);

    try {
      const buffer = await fetchPollinationsImage({ prompt: fullPrompt });

      fs.writeFileSync(filePath, buffer);
      console.log("Avatar successfully created and saved at:", filePath);

      return {
        success: true,
        message: "Avatar created successfully",
        id: avatarId,
        name,
        prompt,
        imageUrl: `/assets/${fileName}`,
      };
    } catch (error: any) {
      console.error("Error generating avatar via Pollinations.Ai:", error.message);
      throw error;
    }
  }
}





