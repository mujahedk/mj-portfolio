'use client';

interface TagFilterProps {
  tags: string[];
  activeTag: string;
  onChange: (tag: string) => void;
}

export default function TagFilter({ tags, activeTag, onChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          aria-pressed={activeTag === tag}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
            activeTag === tag
              ? 'text-white bg-blue-600 dark:bg-blue-500 border border-blue-600 dark:border-blue-500'
              : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
