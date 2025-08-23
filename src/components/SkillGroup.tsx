interface SkillGroupProps {
  title: string;
  items: string[];
}

export default function SkillGroup({ title, items }: SkillGroupProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <h3 className="text-lg font-semibold text-[var(--text)] mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center rounded-full border border-[var(--border)] px-3 py-1 text-sm font-medium text-[var(--text)] bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10 transition-colors duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
