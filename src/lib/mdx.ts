export interface WriteupMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
}

// Writeup data - easy to add new ones here
const writeups: WriteupMeta[] = [
  {
    title: "Building a Modern Portfolio with Next.js 15 and Theme Switching",
    description: "A deep dive into creating a responsive portfolio with Next.js App Router, Tailwind CSS, and next-themes for seamless light/dark mode switching",
    date: "2025-01-27",
    tags: ["nextjs", "react", "tailwind", "theming", "portfolio", "frontend"],
    slug: "building-modern-portfolio",
  },
  // Add more writeups here by copying this structure:
  // {
  //   title: "Your Writeup Title",
  //   description: "Your writeup description",
  //   date: "2025-01-28",
  //   tags: ["tag1", "tag2", "tag3"],
  //   slug: "your-writeup-slug",
  // },
];

// Writeup content mapping
const writeupContent: Record<string, string> = {
  "building-modern-portfolio": `# Building a Modern Portfolio with Next.js 15 and Theme Switching

Building a portfolio website is more than just showcasing projects—it's an opportunity to demonstrate technical skills, design thinking, and attention to detail. In this writeup, I'll walk through the process of creating a modern, responsive portfolio using Next.js 15, Tailwind CSS, and implementing a robust theme switching system.

## The Tech Stack

### Next.js 15 App Router
The latest version of Next.js brings significant improvements to the App Router, making it easier to build performant applications with better SEO capabilities. The file-based routing system simplifies navigation and allows for dynamic routes like \`/writeups/[slug]\`.

### Tailwind CSS for Styling
Tailwind's utility-first approach enables rapid development while maintaining consistency. The design system is built around CSS custom properties (variables) that change based on the active theme.

### next-themes for Theme Management
Implementing theme switching can be tricky due to hydration mismatches. The \`next-themes\` library solves this by providing a hydration-safe way to manage themes with proper SSR support.

## Key Implementation Challenges

### 1. Theme Provider Setup
\`\`\`tsx
<ThemeProvider 
  attribute="class" 
  defaultTheme="dark" 
  enableSystem={false} 
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
\`\`\`

The \`suppressHydrationWarning\` on the HTML element prevents hydration warnings while the theme system initializes.

### 2. CSS Variables for Design Tokens
Instead of hardcoding colors, we use CSS custom properties that change based on the theme:

\`\`\`css
:root {
  --bg: #ffffff;
  --text: #0f172a;
  --surface: #eaf2ff;
}

.dark {
  --bg: #0b1220;
  --text: #e5e7eb;
  --surface: rgba(15,23,42,.6);
}
\`\`\`

### 3. Hydration-Safe Theme Toggle
The theme toggle component uses a \`mounted\` state to prevent hydration mismatches:

\`\`\`tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

if (!mounted) return <button>Theme</button>;
\`\`\`

## Advanced Features

### Multi-Tag Filtering System
The portfolio includes a sophisticated filtering system that allows users to select multiple tags for both projects and writeups. This is implemented using URL state management and OR logic filtering.

### Responsive Project Carousel
A custom carousel component that adapts to different screen sizes:
- Mobile: 1 project per view
- Tablet: 2 projects per view  
- Desktop: 3 projects per view

### MDX Content Management
Writeups are written in MDX format, allowing for rich content with React components while maintaining excellent SEO and performance.

## Performance Optimizations

### Image Optimization
Next.js Image component with proper sizing and lazy loading ensures fast page loads.

### Static Generation
Most pages are statically generated at build time, providing instant loading and excellent Core Web Vitals.

### Code Splitting
Automatic code splitting ensures users only download the JavaScript they need.

## Lessons Learned

### 1. Theme System Architecture
Designing a theme system from the start is crucial. Retroactively adding themes can lead to inconsistencies and require significant refactoring.

### 2. Component Composition
Building reusable components with clear interfaces makes the codebase maintainable and allows for easy feature additions.

### 3. State Management
Using URL state for filters ensures users can bookmark and share filtered views, improving the overall user experience.

### 4. Accessibility
Proper ARIA labels, keyboard navigation, and focus management are essential for a professional portfolio.

## Future Enhancements

- **Blog System**: Expand the writeups into a full blog with categories and search
- **Project Showcase**: Add interactive demos and detailed case studies
- **Analytics**: Implement privacy-focused analytics to understand visitor behavior
- **CMS Integration**: Consider adding a headless CMS for easier content management

## Conclusion

Building this portfolio has been an excellent exercise in modern web development practices. The combination of Next.js 15, Tailwind CSS, and a well-thought-out theme system creates a foundation that's both beautiful and maintainable.

The key takeaway is that good architecture decisions early in the process pay dividends throughout development. Whether it's the theme system, component structure, or state management, thinking about scalability and maintainability from the start makes all the difference.

---

*This writeup was written while building the portfolio it describes. The code examples and implementation details reflect the actual system in production.*`,
};

export async function getWriteups(): Promise<WriteupMeta[]> {
  return writeups.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getWriteupBySlug(slug: string): Promise<{ meta: WriteupMeta; content: string } | null> {
  const writeup = writeups.find(w => w.slug === slug);
  
  if (!writeup) {
    return null;
  }
  
  const content = writeupContent[slug];
  
  if (!content) {
    return null;
  }
  
  return { meta: writeup, content };
}

export async function getWriteupsByTag(tag: string): Promise<WriteupMeta[]> {
  const allWriteups = await getWriteups();
  return allWriteups.filter((writeup) =>
    writeup.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function getAllTags(): Promise<string[]> {
  const allWriteups = await getWriteups();
  const tags = new Set<string>();
  
  allWriteups.forEach((writeup) => {
    writeup.tags.forEach((tag) => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}
