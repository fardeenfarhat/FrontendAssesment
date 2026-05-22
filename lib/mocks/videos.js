const VIDEO_SEEDS = [
  "video-a", "video-b", "video-c", "video-d",
  "video-e", "video-f", "video-g", "video-h",
];

export const mockVideos = VIDEO_SEEDS.map((seed, i) => ({
  id: `mock-vid-${i}`,
  url: `https://picsum.photos/seed/${seed}/512/640`,
  poster: `https://picsum.photos/seed/${seed}/512/640`,
  width: 512,
  height: 640,
  type: "video",
  alt: "AI generated video",
}));
