[English](README.md) | 中文

# LazyDraw - AI 智能图表生成工具

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)](https://tailwindcss.com/)

一个基于 AI 技术的智能图表生成工具，能够将自然语言描述转换为专业的 Mermaid 图表代码，并提供实时渲染和编辑功能。

### 🎯 一个先进的 Web 应用程序，让开发者能够快速从自然语言描述创建专业图表。

### 🌐 访问我们的在线演示：[LazyDraw](https://lazy-draw.vercel.app/)

## 🌐 在线体验

**立即体验**: [https://lazy-draw.vercel.app/](https://lazy-draw.vercel.app/)

输入描述，一键生成专业图表！

## 🚀 项目特色

- **智能文本转图表**：使用 AI 将自然语言描述转换为 Mermaid 图表代码
- **多图表类型支持**：支持流程图、序列图、甘特图等多种图表类型
- **双渲染模式**：支持 Mermaid 原生渲染和 Excalidraw 手绘风格渲染
- **现代化界面**：基于 YouMind 设计风格的简洁现代界面
- **响应式设计**：完美适配桌面端和移动端
- **流畅动画**：使用 Framer Motion 提供流畅的交互动画

## 📸 项目截图

![LazyDraw 主界面](preview/home.png)

![LazyDraw 加载动画](preview/loading.png)

## 🛠️ 技术栈

- **前端框架**：Next.js 15 + React 18
- **UI 组件库**：shadcn/ui + Radix UI
- **样式系统**：Tailwind CSS v4
- **动画库**：Framer Motion
- **图标库**：Lucide React
- **类型安全**：TypeScript

## 📦 安装和运行

### 环境要求

- Node.js 18.x 或更高版本
- npm 或 yarn 包管理工具

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd LazyDraw
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 🎨 界面预览

项目实现了现代化的暗色主题界面设计：

- **主页面**：大标题 "Hi, What would you like to draw?" + 副标题布局
- **输入框**：居中的文本输入框，支持图表描述输入
- **动态背景**：紫色和玫瑰色渐变背景，浮动光圈元素
- **动画效果**：页面加载动画、进度条动画、元素飞出效果
- **编辑器**：全屏编辑器，支持 Excalidraw 画布编辑
- **响应式设计**：完美适配桌面端和移动端

## 📁 项目结构

```
LazyDraw/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   ├── editor/            # 编辑器页面
│   │   │   └── page.tsx       # 编辑器组件
│   │   └── globals.css        # 全局样式
│   ├── components/            # 可复用组件
│   │   ├── ui/               # 基础 UI 组件
│   │   │   ├── button.tsx    # 按钮组件
│   │   │   └── input.tsx     # 输入框组件
│   │   └── ExcalidrawCanvas.tsx # Excalidraw 画布组件
│   └── lib/                  # 工具库
│       ├── utils.ts          # 工具函数
│       └── mermaid.ts        # Mermaid 生成逻辑
├── preview/                  # 项目截图
│   ├── home.png             # 主界面截图
│   └── loading.png          # 加载动画截图
├── tec/                     # 技术文档
│   ├── PRD.md              # 产品需求文档
│   └── TRD.md              # 技术需求文档
└── package.json             # 项目配置
```

## 🎯 核心功能

### 1. 智能文本转图表
- 支持自然语言输入描述
- 智能识别图表类型（系统架构图、用户流程图、数据流图等）
- 自动生成 Mermaid 图表代码
- 实时渲染和预览

### 2. 多图表类型支持
- **系统架构图**：API网关、认证服务、数据库等组件
- **用户流程图**：注册、登录、使用等流程
- **数据流图**：数据源、清洗、转换、存储等步骤
- **通用流程图**：自定义业务流程

### 3. Excalidraw 画布集成
- **手绘风格渲染**：友好的视觉效果
- **可编辑画布**：支持拖拽、缩放、编辑
- **实时同步**：Mermaid 代码自动转换为画布元素
- **交互式编辑**：直接在画布上修改图表

### 4. 流畅动画效果
- **页面加载动画**：优雅的渐入效果
- **进度条动画**：生成过程的视觉反馈
- **元素飞出效果**：从主界面到编辑器的过渡
- **编辑器飞入**：3D 旋转飞入效果

## 🔧 开发指南

### 添加新功能

1. 在 `src/components/` 目录下创建新组件
2. 使用 TypeScript 和 Tailwind CSS
3. 遵循现有的组件结构和命名规范

### 样式定制

项目使用 Tailwind CSS，可以通过以下方式定制样式：

1. 修改 `tailwind.config.ts` 配置文件
2. 在 `src/app/globals.css` 中添加自定义样式
3. 使用 CSS 变量进行主题定制

### 动画效果

使用 Framer Motion 添加动画效果：

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## 📱 响应式设计

项目采用移动优先的响应式设计：

- **移动端**：单列布局，紧凑的间距
- **平板端**：适中的尺寸和间距
- **桌面端**：双列布局，充分利用屏幕空间

## 🚀 部署

### 在线体验

**生产环境**: [https://lazy-draw.vercel.app/](https://lazy-draw.vercel.app/)

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### Docker 部署

```bash
# 构建镜像
docker build -t lazydraw .

# 运行容器
docker run -p 3000:3000 lazydraw
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [YouMind](https://youmind.com/) - 界面设计灵感来源
- [Smart Mermaid](https://github.com/liujuntao123/smart-mermaid) - 功能设计参考
- [Next.js](https://nextjs.org/) - 前端框架
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [Framer Motion](https://www.framer.com/motion/) - 动画库

