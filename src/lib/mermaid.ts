export function generateMockMermaidFromIntent(intent: string): string {
  const safe = intent.trim().toLowerCase() || "idea";
  
  // 根据意图生成不同的图表
  if (safe.includes("系统架构") || safe.includes("架构图") || safe.includes("architecture")) {
    return [
      "flowchart TD",
      "A[用户界面] --> B[API网关]",
      "B --> C[认证服务]",
      "B --> D[业务服务]",
      "D --> E[数据库]",
      "D --> F[缓存层]",
      "C --> G[用户数据库]",
      "H[负载均衡器] --> B",
      "I[CDN] --> A"
    ].join("\n");
  }
  
  if (safe.includes("用户流程") || safe.includes("流程图") || safe.includes("flow")) {
    return [
      "flowchart TD",
      "A[用户注册] --> B[邮箱验证]",
      "B --> C[登录系统]",
      "C --> D[选择功能]",
      "D --> E[使用服务]",
      "E --> F[完成操作]"
    ].join("\n");
  }
  
  if (safe.includes("数据流") || safe.includes("数据") || safe.includes("data")) {
    return [
      "flowchart LR",
      "A[数据源] --> B[数据清洗]",
      "B --> C[数据转换]",
      "C --> D[数据存储]",
      "D --> E[数据分析]",
      "E --> F[数据可视化]"
    ].join("\n");
  }
  
  // 默认生成一个通用流程图
  return [
    "flowchart TD",
    `A[${intent || "开始"}] --> B[分析需求]`,
    "B --> C[设计方案]",
    "C --> D[实施开发]",
    "D --> E[测试验证]",
    "E --> F[部署上线]"
  ].join("\n");
}


