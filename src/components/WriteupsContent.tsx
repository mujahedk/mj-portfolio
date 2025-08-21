'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import TagFilter from './TagFilter';
import { getWriteups, getAllTags, WriteupMeta } from '../lib/mdx';

export default function WriteupsContent() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [writeups, setWriteups] = useState<WriteupMeta[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    async function loadWriteups() {
      try {
        const [writeupsData, tagsData] = await Promise.all([
          getWriteups(),
          getAllTags()
        ]);
        setWriteups(writeupsData);
        setAllTags(tagsData);
      } catch (error) {
        console.error('Error loading writeups:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadWriteups();
  }, []);

  // Get category from URL query parameter
  useEffect(() => {
    const tag = searchParams.get('tag');
    if (tag && allTags.includes(tag)) {
      setSelectedTag(tag);
    }
  }, [searchParams, allTags]);

  // Filter writeups based on selected tag
  const filteredWriteups = selectedTag === 'All' 
    ? writeups 
    : writeups.filter(writeup => writeup.tags.includes(selectedTag));

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    if (tag === 'All') {
      router.push('/writeups');
    } else {
      router.push(`/writeups?tag=${tag}`);
    }
  };

  // Get unique tags for filter chips
  const uniqueTags = ['All', ...allTags];

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-6 max-w-md mx-auto"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-12 max-w-2xl mx-auto"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-12 max-w-lg mx-auto"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded max-w-2xl mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Notes & Research
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Short writeups and deeper dives on what I&apos;m building and learning — from systems and security to AI, product, and beyond.
          </p>
        </div>

        {/* Tags Filter */}
        <TagFilter
          tags={uniqueTags}
          activeTag={selectedTag}
          onChange={handleTagSelect}
        />

        {/* Writeups List or Empty State */}
        {writeups.length === 0 ? (
          <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700 max-w-md">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Notes coming soon!
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                I&apos;ll be sharing insights and research here soon.
              </p>
            </div>
          </div>
        ) : filteredWriteups.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No notes found
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              No notes found for the selected tag.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredWriteups.map((writeup) => (
              <div
                key={writeup.slug}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {writeup.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                    {writeup.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {writeup.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{writeup.date}</span>
                    </div>
                    <Link
                      href={`/writeups/${writeup.slug}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                      Read More
                      <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Want to contribute?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            I&apos;m always looking for guest writers and collaborators to share their knowledge and insights.
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
  );
}
