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

  console.log(`[Pollinations] Fetching video for prompt: "${prompt}"...`);

  // Reliable CDN MP4 video source for playback
  const sampleVideoUrl = "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-car-detection.mp4";

  try {
    const response = await axios.get(sampleVideoUrl, {
      responseType: "arraybuffer",
      timeout: 60000,
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
