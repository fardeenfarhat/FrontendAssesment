const VIDEO_SOURCES = [
  { file: "ForBiggerBlazes.mp4",              poster: "vid-poster-a" },
  { file: "ForBiggerEscapes.mp4",             poster: "vid-poster-b" },
  { file: "ForBiggerFun.mp4",                 poster: "vid-poster-c" },
  { file: "ForBiggerJoyrides.mp4",            poster: "vid-poster-d" },
  { file: "ForBiggerMeltdowns.mp4",           poster: "vid-poster-e" },
  { file: "SubaruOutbackOnStreetAndDirt.mp4", poster: "vid-poster-f" },
  { file: "TearsOfSteel.mp4",                 poster: "vid-poster-g" },
  { file: "ElephantsDream.mp4",               poster: "vid-poster-h" },
];

const BASE = "https://storage.googleapis.com/gtv-videos-bucket/sample";

export const mockVideos = VIDEO_SOURCES.map(({ file, poster }, i) => ({
  id: `mock-vid-${i}`,
  url: `${BASE}/${file}`,
  poster: `https://picsum.photos/seed/${poster}/512/640`,
  width: 512,
  height: 640,
  type: "video",
  alt: "AI generated video",
}));
