English | [中文](README.zh.md)

# LazyDraw - AI-Powered Diagram Generation Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)](https://tailwindcss.com/)

An intelligent diagram generation tool that converts natural language descriptions into professional Mermaid diagram code with real-time rendering and editing capabilities.

### 🎯 An advanced web application that empowers developers to quickly create professional diagrams from natural language descriptions.

### 🌐 Visit our live demo: [LazyDraw](https://lazy-draw.vercel.app/)

## 🌐 Try It Online

**Live Demo**: [https://lazy-draw.vercel.app/](https://lazy-draw.vercel.app/)

Input your description and generate professional diagrams in seconds!

## 🚀 Key Features

- **Smart Text-to-Diagram**: AI-powered conversion from natural language to Mermaid diagram code
- **Multiple Chart Types**: Support for flowcharts, sequence diagrams, Gantt charts, and more
- **Dual Rendering Modes**: Native Mermaid rendering and Excalidraw hand-drawn style rendering
- **Modern Interface**: Clean, modern design inspired by YouMind
- **Responsive Design**: Perfect adaptation for desktop and mobile devices
- **Smooth Animations**: Fluid interactive animations powered by Framer Motion

## 📸 Screenshots

![LazyDraw Main Interface](preview/home.png)

![LazyDraw Loading Animation](preview/loading.png)

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15 + React 18
- **UI Component Library**: shadcn/ui + Radix UI
- **Styling System**: Tailwind CSS v4
- **Animation Library**: Framer Motion
- **Icon Library**: Lucide React
- **Type Safety**: TypeScript

## 📦 Installation & Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd LazyDraw
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Access the application**
Open your browser and visit [http://localhost:3000](http://localhost:3000)

## 🎨 Interface Preview

The project features a modern dark theme interface design:

- **Main Page**: Large title "Hi, What would you like to draw?" with subtitle layout
- **Input Field**: Centered text input for diagram descriptions
- **Dynamic Background**: Purple and rose gradient background with floating orb elements
- **Animation Effects**: Page load animations, progress bar animations, element fly-out effects
- **Editor**: Full-screen editor with Excalidraw canvas editing support
- **Responsive Design**: Perfect adaptation for desktop and mobile devices

## 📁 Project Structure

```
LazyDraw/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── editor/            # Editor page
│   │   │   └── page.tsx       # Editor component
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   │   ├── button.tsx    # Button component
│   │   │   └── input.tsx     # Input component
│   │   └── ExcalidrawCanvas.tsx # Excalidraw canvas component
│   └── lib/                  # Utility libraries
│       ├── utils.ts          # Utility functions
│       └── mermaid.ts        # Mermaid generation logic
├── preview/                  # Project screenshots
│   ├── home.png             # Main interface screenshot
│   └── loading.png          # Loading animation screenshot
├── tec/                     # Technical documentation
│   ├── PRD.md              # Product Requirements Document
│   └── TRD.md              # Technical Requirements Document
└── package.json             # Project configuration
```

## 🎯 Core Features

### 1. Smart Text-to-Diagram
- Support for natural language input descriptions
- Intelligent chart type recognition (system architecture, user flow, data flow, etc.)
- Automatic Mermaid diagram code generation
- Real-time rendering and preview

### 2. Multiple Chart Type Support
- **System Architecture**: API gateway, authentication services, databases, etc.
- **User Flow**: Registration, login, usage processes
- **Data Flow**: Data sources, cleaning, transformation, storage steps
- **General Flowcharts**: Custom business processes

### 3. Excalidraw Canvas Integration
- **Hand-drawn Style Rendering**: Friendly visual effects
- **Editable Canvas**: Support for drag, zoom, and edit operations
- **Real-time Sync**: Mermaid code automatically converted to canvas elements
- **Interactive Editing**: Direct chart modification on canvas

### 4. Smooth Animation Effects
- **Page Load Animation**: Elegant fade-in effects
- **Progress Bar Animation**: Visual feedback for generation process
- **Element Fly-out Effect**: Transition from main interface to editor
- **Editor Fly-in**: 3D rotation fly-in effect

## 🔧 Development Guide

### Adding New Features

1. Create new components in the `src/components/` directory
2. Use TypeScript and Tailwind CSS
3. Follow existing component structure and naming conventions

### Style Customization

The project uses Tailwind CSS. You can customize styles by:

1. Modifying the `tailwind.config.ts` configuration file
2. Adding custom styles in `src/app/globals.css`
3. Using CSS variables for theme customization

### Animation Effects

Add animation effects using Framer Motion:

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

## 📱 Responsive Design

The project adopts a mobile-first responsive design:

- **Mobile**: Single-column layout with compact spacing
- **Tablet**: Moderate size and spacing
- **Desktop**: Dual-column layout, making full use of screen space

## 🚀 Deployment

### Online Experience

**Production Environment**: [https://lazy-draw.vercel.app/](https://lazy-draw.vercel.app/)

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Automatic deployment completed

### Docker Deployment

```bash
# Build image
docker build -t lazydraw .

# Run container
docker run -p 3000:3000 lazydraw
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [YouMind](https://youmind.com/) - Interface design inspiration
- [Smart Mermaid](https://github.com/liujuntao123/smart-mermaid) - Feature design reference
- [Next.js](https://nextjs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
