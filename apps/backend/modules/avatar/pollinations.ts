import axios from "axios";

export interface PollinationsImageOptions {
  prompt: string;
  width?: number;
  height?: number;
  seed?: number;
  nologo?: boolean;
}

export async function fetchPollinationsImage(
  options: PollinationsImageOptions
): Promise<Buffer> {
  const { prompt, width = 512, height = 512, seed, nologo = true } = options;
  const encodedPrompt = encodeURIComponent(prompt);
  let url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=${nologo}`;
  if (seed !== undefined) {
    url += `&seed=${seed}`;
  }

  console.log(`[Pollinations] Fetching image for prompt: "${prompt}" (seed: ${seed ?? 'random'})`);
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  return Buffer.from(response.data);
}

