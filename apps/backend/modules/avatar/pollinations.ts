import axios from "axios";

export interface PollinationsImageOptions {
  prompt: string;
  width?: number;
  height?: number;
  nologo?: boolean;
}

export async function fetchPollinationsImage(
  options: PollinationsImageOptions
): Promise<Buffer> {
  const { prompt, width = 512, height = 512, nologo = true } = options;
  const encodedPrompt = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=${nologo}`;

  console.log(`[Pollinations] Fetching image for prompt: "${prompt}"`);
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  return Buffer.from(response.data);
}
