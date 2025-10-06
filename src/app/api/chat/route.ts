import { NextRequest } from "next/server";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.KIMI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing KIMI_API_KEY in environment" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const { searchParams } = new URL(req.url);
    const wantStream = searchParams.get("stream") === "1" || searchParams.get("stream") === "true";

    const body = (await req.json()) as { messages?: ChatMessage[]; temperature?: number };
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    if (messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "messages is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Streaming path: proxy SSE from Kimi and return a plain text stream of tokens
    if (wantStream) {
      const resp = await fetch("https://api.moonshot.cn/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "kimi-k2-0905-preview",
          messages,
          temperature: typeof body?.temperature === "number" ? body.temperature : 0.7,
          stream: true,
        }),
      });

      if (!resp.ok || !resp.body) {
        const text = await resp.text().catch(() => "");
        return new Response(
          JSON.stringify({ error: "kimi_error", detail: text || "no_body" }),
          { status: 502, headers: { "Content-Type": "application/json" } },
        );
      }

      const reader = resp.body.getReader();
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      const stream = new ReadableStream<Uint8Array>({
        async pull(controller) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            return;
          }
          const chunk = decoder.decode(value, { stream: true });
          // Kimi returns SSE lines; extract data: { choices[0].delta.content }
          const lines = chunk.split(/\r?\n/);
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(payload);
              const delta = json?.choices?.[0]?.delta;
              const contentPart = delta?.content ?? "";
              if (contentPart) controller.enqueue(encoder.encode(contentPart));
            } catch {
              // ignore malformed line
            }
          }
        },
        cancel() {
          reader.cancel().catch(() => {});
        },
      });

      return new Response(stream, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
        },
      });
    }

    // Non-stream path
    const resp = await fetch("https://api.moonshot.cn/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "kimi-k2-0905-preview",
        messages,
        temperature: typeof body?.temperature === "number" ? body.temperature : 0.7,
        stream: false,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new Response(
        JSON.stringify({ error: "kimi_error", detail: text }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    const data = await resp.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "server_error", detail: String(err?.message || err) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}


