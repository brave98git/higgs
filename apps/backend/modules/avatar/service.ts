import { db } from "../../src/db";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { fetchPollinationsImage } from "./pollinations";

export class AvatarService {
  async createAvatar(name: string, prompt: string) {
    const fullPrompt = `${prompt}, high quality professional headshot avatar for ${name}`;
    const assetsDir = path.resolve(__dirname, "../../assets/images");
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    const avatarId = randomUUID();
    const imageCount = 3;
    const imageUrls: string[] = [];

    try {
      for (let i = 0; i < imageCount; i++) {
        const seed = Math.floor(Math.random() * 1000000);
        const fileName = `${avatarId}_${i + 1}.png`;
        const filePath = path.join(assetsDir, fileName);

        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        try {
          const buffer = await fetchPollinationsImage({ prompt: fullPrompt, seed });
          fs.writeFileSync(filePath, buffer);
          console.log(`Avatar image ${i + 1}/${imageCount} saved at:`, filePath);
          imageUrls.push(`/assets/images/${fileName}`);
        } catch (err: any) {
          console.error(`Failed to generate avatar image ${i + 1}:`, err.message);
        }
      }

      if (imageUrls.length === 0) {
        throw new Error("Failed to generate any avatar images due to rate limiting or network issues.");
      }

      return {
        success: true,
        message: `${imageUrls.length} avatar image(s) created successfully`,
        id: avatarId,
        name,
        prompt,
        imageUrls,
      };
    } catch (error: any) {
      console.error("Error generating avatars via Pollinations.Ai:", error.message);
      throw error;
    }
  }
}





