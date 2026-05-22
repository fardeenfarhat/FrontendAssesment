// Picsum photo IDs that give portrait-suitable images
const PORTRAIT_SEEDS = [
  "portrait-a", "portrait-b", "portrait-c", "portrait-d",
  "portrait-e", "portrait-f", "portrait-g", "portrait-h",
  "portrait-i", "portrait-j", "portrait-k", "portrait-l",
  "fashion-1", "fashion-2", "fashion-3", "fashion-4",
];

export const mockImages = PORTRAIT_SEEDS.map((seed, i) => ({
  id: `mock-img-${i}`,
  url: `https://picsum.photos/seed/${seed}/512/640`,
  width: 512,
  height: 640,
  type: "image",
  alt: "AI generated portrait",
}));
