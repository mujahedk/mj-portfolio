import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function CTAButton({ href, children }: CTAButtonProps) {
  // Check if it's an internal link (starts with /) or external/mailto
  const isInternal = href.startsWith('/');
  
  if (isInternal) {
    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition"
      >
        {children}
      </Link>
    );
  }
  
  // External link or mailto
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition"
    >
      {children}
    </a>
  );
}
