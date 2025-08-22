import { notFound } from 'next/navigation';
import { getWriteupBySlug, getWriteups } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Metadata } from 'next';

interface WriteupPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: WriteupPageProps): Promise<Metadata> {
  const { slug } = await params;
  const writeup = await getWriteupBySlug(slug);
  
  if (!writeup) {
    return {
      title: 'Note Not Found',
      description: 'The requested note could not be found.',
    };
  }

  const { meta } = writeup;
  
  return {
    title: `${meta.title} - MJ Portfolio`,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'article',
      publishedTime: meta.date,
      tags: meta.tags,
    },
    twitter: {
      card: 'summary',
      title: meta.title,
      description: meta.description,
    },
  };
}

export async function generateStaticParams() {
  const writeups = await getWriteups();
  return writeups.map((writeup) => ({
    slug: writeup.slug,
  }));
}

export default async function WriteupPage({ params }: WriteupPageProps) {
  const { slug } = await params;
  const writeup = await getWriteupBySlug(slug);

  if (!writeup) {
    notFound();
  }

  const { meta, content } = writeup;

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back to Notes & Research */}
        <div className="mb-8">
          <Link
            href="/writeups"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Notes & Research
          </Link>
        </div>

        {/* Writeup Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {meta.date}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {meta.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {meta.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Writeup Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote source={content} />
        </article>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Found this note helpful? Have questions or want to discuss?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Get In Touch
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
