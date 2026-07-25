import axios from "axios";

export interface PollinationsVideoOptions {
  prompt: string;
  width?: number;
  height?: number;
  seed?: number;
  nologo?: boolean;
}

export async function fetchPollinationsVideo(
  options: PollinationsVideoOptions
): Promise<Buffer> {
  const { prompt, width = 1920, height = 1080, seed, nologo = true } = options;

  console.log(`[Pollinations] Fetching video for prompt: "${prompt}" using model: nova-reel...`);

  const encodedPrompt = encodeURIComponent(prompt);
  const videoUrl = `https://video.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&model=nova-reel`;

  try {
    const response = await axios.get(videoUrl, {
      responseType: "arraybuffer",
      timeout: 120000, // Video generation can take longer, increase timeout to 2 minutes
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });
    return Buffer.from(response.data);
  } catch (error: any) {
    console.error("[Pollinations] Failed to fetch video:", error.message);
    throw error;
  }
}
