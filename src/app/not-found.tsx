import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-400 text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
