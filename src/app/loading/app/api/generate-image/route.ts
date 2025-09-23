import { type NextRequest, NextResponse } from "next/server"
import { fal } from "@fal-ai/client"

// Configure fal with API key
fal.config({
  credentials: process.env.FAL_KEY,
})

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API: Starting image generation request")

    const formData = await request.formData()
    const mode = formData.get("mode") as string
    const prompt = formData.get("prompt") as string

    console.log("[v0] API: Mode:", mode)
    console.log("[v0] API: Prompt:", prompt)

    if (!mode || !prompt) {
      console.log("[v0] API: Missing required fields")
      return NextResponse.json({ error: "Mode and prompt are required" }, { status: 400 })
    }

    let result: any

    if (mode === "text-to-image") {
      console.log("[v0] API: Using text-to-image mode")

      result = await fal.subscribe("fal-ai/nano-banana", {
        input: {
          prompt: prompt,
          num_images: 1,
          output_format: "jpeg",
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs?.map((log) => log.message).forEach(console.log)
          }
        },
      })
    } else if (mode === "image-editing") {
      console.log("[v0] API: Using image-editing mode")

      const image1 = formData.get("image1") as File
      const image2 = formData.get("image2") as File

      if (!image1 || !image2) {
        console.log("[v0] API: Missing images for editing mode")
        return NextResponse.json({ error: "Two images are required for editing mode" }, { status: 400 })
      }

      console.log("[v0] API: Converting images to base64")

      // Convert images to base64
      const image1Buffer = await image1.arrayBuffer()
      const image2Buffer = await image2.arrayBuffer()
      const image1Base64 = `data:${image1.type};base64,${Buffer.from(image1Buffer).toString("base64")}`
      const image2Base64 = `data:${image2.type};base64,${Buffer.from(image2Buffer).toString("base64")}`

      console.log("[v0] API: Image1 base64 length:", image1Base64.length)
      console.log("[v0] API: Image2 base64 length:", image2Base64.length)

      result = await fal.subscribe("fal-ai/nano-banana/edit", {
        input: {
          prompt: prompt,
          image_urls: [image1Base64, image2Base64],
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs?.map((log) => log.message).forEach(console.log)
          }
        },
      })
    } else {
      console.log("[v0] API: Invalid mode:", mode)
      return NextResponse.json({ error: "Invalid mode. Must be 'text-to-image' or 'image-editing'" }, { status: 400 })
    }

    console.log("[v0] API: Fal response received")
    console.log("[v0] API: Result data:", JSON.stringify(result.data, null, 2))

    if (!result.data || !result.data.images || result.data.images.length === 0) {
      console.log("[v0] API: No images in response")
      throw new Error("No images generated")
    }

    const imageUrl = result.data.images[0].url
    const description = result.data.description || ""

    console.log("[v0] API: Generated image URL:", imageUrl)
    console.log("[v0] API: AI Description:", description)

    return NextResponse.json({
      url: imageUrl,
      prompt: prompt,
      description: description,
    })
  } catch (error) {
    console.error("[v0] API: Error generating image:", error)
    console.error("[v0] API: Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    return NextResponse.json(
      {
        error: "Failed to generate image",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
