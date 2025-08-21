import { projects } from "@/data/projects";

export function getFeatured(limit = 3) {
  const featured = projects.filter(p => p.featured);
  const list = featured.length >= limit ? featured.slice(0, limit) : projects.slice(0, limit);
  return list;
}
