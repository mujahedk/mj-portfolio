# MJ Portfolio

A modern, responsive personal portfolio website built with Next.js 15, showcasing projects, technical writeups, and professional experience. This site represents MJ (Mujahedulislam Khan), a CS graduate and full-stack developer passionate about building secure, scalable applications and sharing knowledge through detailed technical documentation.

## 🚀 About MJ

**MJ** is a Computer Science graduate and full-stack developer who loves turning ideas into working products. With expertise in both frontend and backend development, MJ focuses on:

- **Development**: Building secure, scalable applications with modern technologies and best practices
- **Research**: Exploring new technologies, conducting experiments, and improving application quality  
- **Knowledge Sharing**: Documenting learnings through detailed technical writeups and research findings

### Core Skills
- **Frontend**: React/Next.js, Tailwind CSS, accessibility & keyboard support
- **Backend**: FastAPI/Express, Postgres/Prisma, authentication & validation
- **DevOps**: CI/CD, Docker, OpenTelemetry, health checks
- **Testing**: pytest/Jest, comprehensive test coverage
- **Security**: Building security and testing in from the start

## 🌐 Site Overview

This portfolio website serves as a comprehensive showcase of MJ's work, skills, and professional journey. The site features a modern design with dark/light theme support, responsive layouts, and smooth user interactions.

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4 with custom theme system
- **Language**: TypeScript
- **Deployment**: Vercel-ready with optimized builds
- **Email**: Resend API integration for contact forms
- **Content**: MDX support for technical writeups

## 📱 Site Structure & Content

### 🏠 **Home Page** (`/`)
The main landing page featuring:
- **Hero Section**: Personal introduction with call-to-action buttons
- **What I Do**: Three core focus areas (Development, Research, Writeups)
- **Featured Projects**: Interactive project carousel showcasing recent work
- **Latest Writeups**: Recent technical notes and research findings
- **Quick Navigation**: Direct links to About, Projects, Notes, and Contact

### 👤 **About Page** (`/about`)
Comprehensive professional overview including:
- **Personal Introduction**: Professional headshot and background story
- **Core Competencies**: Four main skill areas with detailed breakdowns
  - Frontend: Accessible, fast UIs with React/Next.js + Tailwind
  - Backend: Typed APIs with auth & comprehensive testing
  - Product: User-centered development with metrics-driven iteration
  - Reliability: CI/CD, monitoring, and operational excellence
- **Skill Groups**: Organized technical skills by category
- **Professional Journey**: Current focus and learning objectives

### 💼 **Projects Page** (`/projects`)
Showcase of development work featuring:
- **Project Grid**: Visual cards displaying completed projects
- **Filtering System**: Tag-based filtering by technology and project type
- **Project Details**: Each project includes:
  - Project images and descriptions
  - Technology stack and tools used
  - Live demos and source code links
  - Key features and accomplishments
- **Interactive Elements**: Hover effects and smooth transitions

### 📝 **Writeups Page** (`/notes`)
Technical documentation and research sharing:
- **Content Library**: MDX-powered technical writeups
- **Research Findings**: Detailed documentation of experiments and learnings
- **Knowledge Base**: Organized collection of technical insights
- **Search & Filter**: Easy navigation through different topics and categories
- **Rich Content**: Support for code blocks, images, and interactive elements

### 📧 **Contact Page** (`/contact`)
Professional communication hub featuring:
- **Contact Form**: Integrated form with Resend API for direct email delivery
- **Direct Email**: Quick mailto: link for immediate contact
- **Professional Information**: Clear communication channels and response times
- **Form Validation**: Comprehensive error handling and user feedback
- **Accessibility**: Keyboard navigation and screen reader support

## 🎨 Design Features

### Theme System
- **Dark Theme Default**: Deep navy backgrounds with light text
- **Light Theme Option**: Clean white backgrounds with dark text
- **Smooth Transitions**: Seamless theme switching with CSS variables
- **Consistent Design**: Unified color scheme across all components

### Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Modern UI**: Clean, professional aesthetic with subtle animations
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Performance**: Optimized images and lazy loading

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd mj-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Available Scripts
```bash
npm run dev          # Start development server
npm run dev:turbo    # Start with Turbopack (faster)
npm run build        # Build for production
npm run build:turbo  # Build with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
npm run clean        # Clean and reinstall dependencies
```

## 📧 Contact Form Setup

The contact form uses [Resend](https://resend.com) for reliable email delivery:

### 1. Get Resend API Key
1. Sign up at [resend.com](https://resend.com)
2. Create a new API key in the dashboard
3. Copy the API key

### 2. Environment Configuration
Create a `.env.local` file in your project root:
```bash
RESEND_API_KEY=your_resend_api_key_here
```

### 3. Features
- Direct email delivery to `mujahedk@umich.edu`
- Rate limiting and validation
- Fallback to mailto: if API fails
- Professional email formatting

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel for optimal Next.js performance
```

### Other Platforms
The site is built with standard Next.js and can be deployed to any platform supporting Node.js applications.

## 📚 Content Management

### Projects
Add new projects by editing `src/data/projects.ts`:
```typescript
export const projects: Project[] = [
  {
    id: "project-name",
    title: "Project Title",
    description: "Project description...",
    // ... other fields
  }
];
```

### Writeups
Add new technical writeups as MDX files in `src/content/writeups/`:
```markdown
---
title: "Writeup Title"
date: "2024-01-01"
tags: ["tag1", "tag2"]
---

Your content here...
```

## 🤝 Contributing

This is a personal portfolio site, but feedback and suggestions are welcome. Feel free to:
- Report bugs or issues
- Suggest improvements to the design or functionality
- Share ideas for new features

## 📄 License

This project is private and personal. All rights reserved.

---

**Connect with MJ:**
- 📧 Email: [mujahedk@umich.edu](mailto:mujahedk@umich.edu)
- 💼 LinkedIn: [Mujahedulislam Khan](https://www.linkedin.com/in/mujahedulislamkhan/)
- 🐙 GitHub: [mujahedk](https://github.com/mujahedk)

*Built with Next.js, TypeScript, and Tailwind CSS*
