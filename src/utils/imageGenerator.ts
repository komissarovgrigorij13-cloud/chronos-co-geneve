/**
 * Luxury Watch Macro Image Generator Utility
 * Generates high-fidelity studio macro photography URLs for haute horlogerie timepieces
 */

export interface WatchImagePrompt {
  brand: string;
  model: string;
  ref: string;
  dialDetails: string;
  material: string;
  seed: number;
}

export function generateWatchMacroUrl(promptData: WatchImagePrompt): string {
  const prompt = `${promptData.brand} ${promptData.model} ${promptData.ref}, ${promptData.dialDetails}, ${promptData.material} case, macro watch photography, high-end luxury horology, sharp studio lighting, ultra detailed watchmaker dial, 8k professional horology catalogue shot`;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=900&height=900&seed=${promptData.seed}&nologo=true&enhance=true`;
}
