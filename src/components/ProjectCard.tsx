import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  tags: string[];
  summary: string;
  image?: string;
}

export default function ProjectCard({ title, tags, summary, image }: ProjectCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-shadow duration-300 overflow-hidden">
      {/* Project Image */}
      <div className="aspect-video bg-[var(--muted)]/20 overflow-hidden relative">
        {image && image !== '/api/placeholder/400/250' ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-[var(--muted)] text-center">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="text-sm">Project Image</div>
            </div>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-[var(--text)] mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Tags */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium text-[var(--primary)] bg-[var(--primary)]/10 rounded-full"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium text-[var(--muted)]">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        <p className="text-[var(--muted)] text-sm mb-4 line-clamp-3">
          {summary}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className="flex-1 inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-white bg-[var(--primary)]/60 hover:bg-[var(--primary)]/60 cursor-not-allowed shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
            title="Coming soon - Project demo not available yet"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Live
          </button>
          <button
            className="flex-1 inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-white bg-[var(--primary)]/60 hover:bg-[var(--primary)]/60 cursor-not-allowed shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
            title="Coming soon - Repository not available yet"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 1.842-1.339 3.694-4.365 4.951.209.18.403.535.403 1.08 0 .533-.01 1.964-.01 2.229 0 .224.18.49.68.407A9.019 9.019 0 0024 12.017C24 6.484 19.523 2 12 2z" clipRule="evenodd" />
            </svg>
            View Code
          </button>
        </div>
      </div>
    </div>
  );
}
