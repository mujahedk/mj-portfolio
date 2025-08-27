export type Project = {
  title: string;
  summary: string;
  tags: string[];
  repo?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  { 
    title: "Data Structures Visualizer", 
    summary: "Interactive, step-by-step visualizations of classic data structures and algorithms. Features universal player system, 9 algorithm types, and responsive design for educational purposes.", 
    tags: ["typescript", "react", "algorithms"], 
    repo: "https://github.com/mujahedk/ds-visualizer",
    liveUrl: "https://mj-ds-visualizer.vercel.app/",
    image: "/images/ds-visualizer.png", 
    featured: true 
  },
  { title: "E-Commerce Platform", summary: "A full-stack e-commerce solution built with Next.js, featuring user authentication, product management, shopping cart functionality, and secure payment processing.", tags: ["full-stack", "next.js", "typescript"], image: "/images/sample-project-1.jpg" },
  { title: "Task Management App", summary: "A collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, and progress tracking.", tags: ["frontend", "react", "real-time"], image: "/images/sample-project-2.jpg" }
];

export const categories = ["All", "Frontend", "Full-Stack", "Backend"];

// Helper function to get featured projects
export function getFeaturedProjects(): Project[] {
  const featured = projects.filter(project => project.featured);
  // If no projects are marked as featured, return first 3 as fallback
  return featured.length > 0 ? featured : projects.slice(0, 3);
}
