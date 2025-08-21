interface InfoCardProps {
  emoji: string;
  title: string;
  blurb?: string;
  bullets?: string[];
}

export default function InfoCard({ emoji, title, blurb, bullets }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 dark:bg-slate-900/40">
      <div className="text-center">
        <div className="text-4xl mb-3">{emoji}</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        {blurb && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {blurb}
          </p>
        )}
      </div>
      
      {bullets && bullets.length > 0 && (
        <ul className="space-y-2">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1 text-sm">•</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
