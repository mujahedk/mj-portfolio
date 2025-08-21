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
  { title: "PROJECT NAME", summary: "PROJECT DESCRIPTION", tags: ["frontend","full-stack"], image: "/images/sample-project-1.jpg", featured: true },
  { title: "PROJECT NAME 2", summary: "PROJECT DESCRIPTION", tags: ["backend"], image: "/images/sample-project-2.jpg", featured: true },
  { title: "PROJECT NAME 3", summary: "PROJECT DESCRIPTION", tags: ["ai"], image: "/images/sample-project-3.jpg" }
];

export const categories = ["All", "Frontend", "Full-Stack", "Backend"];

// Helper function to get featured projects
export function getFeaturedProjects(): Project[] {
  const featured = projects.filter(project => project.featured);
  // If no projects are marked as featured, return first 3 as fallback
  return featured.length > 0 ? featured : projects.slice(0, 3);
}
