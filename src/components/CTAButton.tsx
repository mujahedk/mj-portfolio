import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function CTAButton({ href, children }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-400 text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      {children}
    </Link>
  );
}
