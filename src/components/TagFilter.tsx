'use client';

interface TagFilterProps {
  tags: string[];
  activeTags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagFilter({ tags, activeTags, onChange }: TagFilterProps) {
  const toggleTag = (tag: string) => {
    if (tag === 'All') {
      // "All" tag clears all other selections
      onChange([]);
    } else if (activeTags.includes(tag)) {
      // Remove tag if already selected
      onChange(activeTags.filter(t => t !== tag));
    } else {
      // Add tag if not selected
      onChange([...activeTags, tag]);
    }
  };

  const clearAll = () => {
    onChange([]);
    // Remove focus after action to prevent persistent focus ring
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const selectAll = () => {
    onChange(tags.filter(tag => tag !== 'All'));
    // Remove focus after action to prevent persistent focus ring
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="mb-12">
      {/* Filter Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <button
          onClick={clearAll}
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
        >
          Clear All
        </button>
        <button
          onClick={selectAll}
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
        >
          Select All
        </button>
      </div>

      {/* Tag Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {tags.map((tag) => {
          const isActive = tag === 'All' ? activeTags.length === 0 : activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              aria-pressed={isActive}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg)] ${
                isActive
                  ? 'text-white bg-[var(--primary)] border border-[var(--primary)] shadow-md scale-105'
                  : 'text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-hover)] hover:scale-102'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Active Filters Display */}
      {activeTags.length > 0 && (
        <div className="text-center mt-4 text-sm text-[var(--muted)]">
          Showing content with: {activeTags.join(', ')}
        </div>
      )}
    </div>
  );
}
