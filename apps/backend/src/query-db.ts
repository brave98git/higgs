import { db } from "./db";

async function main() {
  const images = await db.avatarImage.findMany();
  console.log("Avatar Images:", JSON.stringify(images, null, 2));
  const avatars = await db.avatar.findMany({ include: { avatarImages: true } });
  console.log("Avatars:", JSON.stringify(avatars, null, 2));
}

main().catch(console.error);
