import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sourceUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    const response = await fetch(sourceUrl)
    if (!response.ok || !response.body) {
      res.status(502).json({ error: "Upstream audio fetch failed" })
      return
    }

    res.setHeader("Content-Type", "audio/mpeg")
    res.setHeader("Cache-Control", "public, max-age=86400, immutable")

    // Stream the audio through
    const reader = response.body.getReader()
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read()
        if (done) {
          controller.close()
          return
        }
        controller.enqueue(value)
      },
      cancel() {
        reader.cancel()
      }
    })

    // @ts-ignore - Node response supports web streams in Next.js
    return new Response(stream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    }).body?.pipeTo((res as any).stream)
  } catch (err) {
    res.status(500).json({ error: "Audio proxy error" })
  }
}


