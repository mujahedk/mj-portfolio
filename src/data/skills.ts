export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  { title: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { title: "Frontend", items: ["React", "Next.js (App Router)", "Tailwind CSS"] },
  { title: "Backend", items: ["FastAPI", "Express", "REST", "OpenAPI"] },
  { title: "Data & Storage", items: ["Postgres", "Prisma", "Redis"] },
  { title: "DevEx & Infra", items: ["Docker", "GitHub Actions", "Vercel"] },
  { title: "Quality & Observability", items: ["Playwright", "pytest/Jest", "OpenTelemetry"] }
];
