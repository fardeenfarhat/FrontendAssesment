import { NextResponse } from "next/server";
import { mockImages } from "@/lib/mocks/images";
import { mockVideos } from "@/lib/mocks/videos";
import { delay } from "@/lib/utils/delay";
import { generateId } from "@/lib/utils/ids";

export async function POST(request) {
  try {
    const { prompt, type = "image", count = 8 } = await request.json();

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ message: "Prompt is required." }, { status: 400 });
    }

    const sanitizedCount = Math.min(Math.max(1, Number(count) || 8), 16);

    // Simulate generation latency
    await delay(900 + Math.random() * 600);

    const pool = type === "video" ? mockVideos : mockImages;
    const items = Array.from({ length: sanitizedCount }, (_, i) => {
      const base = pool[Math.floor(Math.random() * pool.length)];
      return {
        ...base,
        id: generateId("item"),
        url: `${base.url}?cache=${Date.now()}-${i}`,
      };
    });

    return NextResponse.json({
      id: generateId("gen"),
      type,
      prompt: prompt.trim(),
      items,
      createdAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
