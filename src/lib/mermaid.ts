export function generateMockMermaidFromIntent(intent: string): string {
  const safe = intent.trim() || "Idea";
  // 简单生成一个 flowchart，后续可替换为真实 AI 结果
  return [
    "flowchart TD",
    `A[${safe}] --> B[Plan]`,
    "B --> C[Implement]",
    "C --> D[Test]",
    "D --> E[Deliver]",
  ].join("\n");
}


