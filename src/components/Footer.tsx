import { site } from '@/config/site';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--header)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-[var(--muted)]">
            <span>© MJ 2025</span>
            <span>•</span>
            <a
              href={`mailto:${site.email}`}
              className="hover:text-[var(--link-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 rounded"
            >
              Email
            </a>
            <span>•</span>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--link-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 rounded"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--link-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 rounded"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
