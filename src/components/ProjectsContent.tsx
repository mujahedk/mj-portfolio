'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import TagFilter from './TagFilter';
import { projects } from '@/data/projects';

export default function ProjectsContent() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get unique categories from project tags
  const uniqueCategories = useMemo(() => 
    ['All', ...Array.from(new Set(projects.flatMap(project => project.tags)))],
    []
  );

  // Get tags from URL query parameter
  useEffect(() => {
    const tags = searchParams.get('tags');
    if (tags) {
      const tagArray = tags.split(',').filter(tag => uniqueCategories.includes(tag));
      setSelectedTags(tagArray);
    }
  }, [searchParams, uniqueCategories]);

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) {
      return projects; // Show all projects when no tags selected (including when "All" is active)
    }
    
    return projects.filter(project => 
      selectedTags.some(tag => project.tags.includes(tag.toLowerCase()))
    );
  }, [selectedTags]);

  // Handle tag selection
  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
    
    if (tags.length === 0) {
      // No tags selected = show all (equivalent to "All" tag)
      router.push('/projects');
    } else {
      const tagsParam = tags.join(',');
      router.push(`/projects?tags=${tagsParam}`);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text)] mb-6">
            My Projects
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            A collection of projects showcasing my skills in development, research, 
            and building applications. Each project represents a unique challenge and learning opportunity.
          </p>
        </div>

        {/* Category Filter */}
        <TagFilter
          tags={uniqueCategories}
          activeTags={selectedTags}
          onChange={handleTagChange}
        />

        {/* Projects Grid or Empty State */}
        {projects.length === 0 ? (
          <div>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-2">
                Projects coming soon!
              </h2>
              <div className="text-6xl mb-4">🚧</div>
            </div>
            {/* 3 Skeleton Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                  <div className="animate-pulse">
                    <div className="w-full aspect-video bg-[var(--muted)]/20"></div>
                    <div className="p-6">
                      <div className="flex gap-2 mb-3">
                        <div className="h-6 bg-[var(--muted)]/20 rounded-full w-16"></div>
                        <div className="h-6 bg-[var(--muted)]/20 rounded-full w-20"></div>
                      </div>
                      <div className="h-6 bg-[var(--muted)]/20 rounded mb-3"></div>
                      <div className="h-4 bg-[var(--muted)]/20 rounded mb-2"></div>
                      <div className="h-4 bg-[var(--muted)]/20 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-2">
              No projects found
            </h2>
            <p className="text-[var(--muted)]">
              {selectedTags.length === 0 
                ? 'No projects available yet.' 
                : `No projects found for the selected tags: ${selectedTags.join(', ')}`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                tags={project.tags}
                summary={project.summary}
                image={project.image}
                repo={project.repo}
                liveUrl={project.liveUrl}
              />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">
            Have a project in mind?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            I&apos;m always interested in new opportunities and collaborations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
          >
            Let&apos;s Discuss
            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
