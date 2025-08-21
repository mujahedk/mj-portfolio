interface SkillGroupProps {
  title: string;
  items: string[];
}

export default function SkillGroup({ title, items }: SkillGroupProps) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 dark:bg-slate-900/40">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-600 px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
