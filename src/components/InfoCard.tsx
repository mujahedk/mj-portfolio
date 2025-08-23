interface InfoCardProps {
  emoji: string;
  title: string;
  blurb?: string;
  bullets?: string[];
}

export default function InfoCard({ emoji, title, blurb, bullets }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-shadow duration-200 p-5">
      <div className="text-center">
        <div className="text-4xl mb-3">{emoji}</div>
        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
          {title}
        </h3>
        {blurb && (
          <p className="text-sm text-[var(--muted)] mb-4">
            {blurb}
          </p>
        )}
      </div>
      
      {bullets && bullets.length > 0 && (
        <ul className="space-y-2">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start">
              <span className="text-[var(--muted)] mr-2 mt-1 text-sm">•</span>
              <span className="text-sm text-[var(--muted)]">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
