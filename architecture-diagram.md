# LazyDraw AI 聊天系统架构图

## 系统架构

```mermaid
graph TB
    A[用户] --> B[首页 /page.tsx]
    B --> C[AI 聊天页面 /chat/page.tsx]
    
    C --> D[ChatMessage 组件]
    C --> E[侧边栏功能面板]
    C --> F[消息输入区域]
    
    D --> G[消息渲染]
    D --> H[图表预览]
    D --> I[操作按钮]
    
    H --> J[ExcalidrawCanvas]
    J --> K[Mermaid 图表渲染]
    
    E --> L[快速开始按钮]
    E --> M[对话历史]
    E --> N[AI 能力展示]
    
    F --> O[消息提交]
    O --> P[模拟 AI 响应]
    P --> Q[消息列表更新]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style J fill:#fce4ec
```

## 组件关系图

```mermaid
graph LR
    A[Home Page] --> B[Chat Button]
    B --> C[Chat Page]
    
    C --> D[ChatMessage Component]
    C --> E[Sidebar]
    C --> F[Input Area]
    
    D --> G[Message Bubble]
    D --> H[Diagram Preview]
    D --> I[Action Buttons]
    
    H --> J[ExcalidrawCanvas]
    J --> K[Mermaid Renderer]
    
    E --> L[Quick Start]
    E --> M[History]
    E --> N[AI Capabilities]
    
    style A fill:#bbdefb
    style C fill:#c8e6c9
    style D fill:#ffe0b2
    style J fill:#f8bbd9
```

## 数据流图

```mermaid
sequenceDiagram
    participant U as 用户
    participant H as 首页
    participant C as 聊天页面
    participant CM as ChatMessage
    participant E as ExcalidrawCanvas
    
    U->>H: 点击"与 AI 对话"按钮
    H->>C: 跳转到 /chat
    C->>CM: 渲染欢迎消息
    
    U->>C: 输入消息
    C->>C: 添加到消息列表
    C->>C: 显示生成中状态
    
    C->>CM: 渲染 AI 响应
    CM->>CM: 检测是否需要图表
    CM->>E: 渲染 Mermaid 图表
    E->>U: 显示图表预览
    
    U->>CM: 点击操作按钮
    CM->>U: 执行相应操作
```

## 功能特性

### 1. 首页集成
- 添加了"与 AI 对话"按钮
- 使用 YouMind 风格的渐变设计
- 平滑的动画过渡效果

### 2. 聊天界面
- 类似 Chatbox AI 的对话界面
- 支持用户和 AI 消息的区分显示
- 实时消息生成动画
- 消息操作按钮（复制、点赞、重新生成）

### 3. 图表渲染
- 自动检测消息中的图表需求
- 集成 ExcalidrawCanvas 组件
- 支持 Mermaid 语法渲染
- 可折叠的图表预览面板

### 4. 侧边栏功能
- 快速开始按钮
- 对话历史管理
- AI 能力展示
- YouMind 风格的设计元素

### 5. 响应式设计
- 移动端适配
- 桌面端侧边栏
- 流畅的动画效果
- 现代化的 UI 设计

## 技术栈

- **框架**: Next.js 15
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **组件**: Radix UI
- **图标**: Lucide React
- **图表**: Excalidraw + Mermaid
- **类型**: TypeScript

## 设计原则

1. **简洁易懂**: 界面简洁，功能清晰
2. **模块化**: 组件可复用，易于维护
3. **响应式**: 适配各种设备尺寸
4. **动画流畅**: 使用 Framer Motion 提供流畅体验
5. **YouMind 风格**: 采用现代化的渐变和毛玻璃效果