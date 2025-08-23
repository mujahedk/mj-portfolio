'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import TagFilter from './TagFilter';
import { getWriteups, getAllTags, WriteupMeta } from '@/lib/mdx';

export default function WriteupsContent() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
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

  // Get tags from URL query parameter
  useEffect(() => {
    const tags = searchParams.get('tags');
    if (tags) {
      const tagArray = tags.split(',').filter(tag => allTags.includes(tag));
      setSelectedTags(tagArray);
    }
  }, [searchParams, allTags]);

  // Filter writeups based on selected tags
  const filteredWriteups = selectedTags.length === 0 
    ? writeups 
    : writeups.filter(writeup => 
        selectedTags.some(tag => writeup.tags.includes(tag))
      );

  // Handle tag selection
  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
    
    if (tags.length === 0) {
      // No tags selected = show all (equivalent to "All" tag)
      router.push('/writeups');
    } else {
      const tagsParam = tags.join(',');
      router.push(`/writeups?tags=${tagsParam}`);
    }
  };

  // Get unique tags for filter chips
  const uniqueTags = ['All', ...allTags];

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-[var(--muted)]/20 rounded mb-6 max-w-md mx-auto"></div>
            <div className="h-6 bg-[var(--muted)]/20 rounded mb-12 max-w-2xl mx-auto"></div>
            <div className="h-8 bg-[var(--muted)]/20 rounded mb-12 max-w-lg mx-auto"></div>
            <div className="h-64 bg-[var(--muted)]/20 rounded max-w-2xl mx-auto"></div>
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
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text)] mb-6">
            Notes & Research
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            Short writeups and deeper dives on what I&apos;m building and learning — from systems and security to AI, product, and beyond.
          </p>
        </div>

        {/* Tags Filter */}
        <TagFilter
          tags={uniqueTags}
          activeTags={selectedTags}
          onChange={handleTagChange}
        />

        {/* Writeups List or Empty State */}
        {writeups.length === 0 ? (
          <div className="flex justify-center">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center max-w-md">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-2">
                Notes coming soon!
              </h2>
              <p className="text-[var(--muted)]">
                I&apos;ll be sharing insights and research here soon.
              </p>
            </div>
          </div>
        ) : filteredWriteups.length === 0 ? (
          <div className="flex justify-center">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center max-w-md">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-2">
                No notes found
              </h2>
              <p className="text-[var(--muted)]">
                {selectedTags.length === 0 
                  ? 'No notes available yet.' 
                  : `No notes found for the selected tags: ${selectedTags.join(', ')}`
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredWriteups.map((writeup) => (
              <div
                key={writeup.slug}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-[var(--text)] mb-4">
                    {writeup.title}
                  </h2>
                  <p className="text-[var(--muted)] mb-6 text-lg">
                    {writeup.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {writeup.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm font-medium text-[var(--primary)] bg-[var(--primary)]/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                      <span>{writeup.date}</span>
                    </div>
                    <Link
                      href={`/writeups/${writeup.slug}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-lg hover:bg-[var(--surface-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
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
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">
            Want to contribute?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            I&apos;m always looking for guest writers and collaborators to share their knowledge and insights.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
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
