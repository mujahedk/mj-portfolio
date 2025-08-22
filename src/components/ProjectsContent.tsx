'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import TagFilter from './TagFilter';
import { projects } from '@/data/projects';

export default function ProjectsContent() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get unique categories from project tags
  const uniqueCategories = useMemo(() => 
    ['All', ...Array.from(new Set(projects.flatMap(project => project.tags)))],
    []
  );

  // Get category from URL query parameter
  useEffect(() => {
    const tag = searchParams.get('tag');
    if (tag && uniqueCategories.includes(tag)) {
      setSelectedCategory(tag);
    }
  }, [searchParams, uniqueCategories]);

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(selectedCategory.toLowerCase()));

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      router.push('/projects');
    } else {
      router.push(`/projects?tag=${category}`);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of projects showcasing my skills in development, research, 
            and building applications. Each project represents a unique challenge and learning opportunity.
          </p>
        </div>

        {/* Category Filter */}
        <TagFilter
          tags={uniqueCategories}
          activeTag={selectedCategory}
          onChange={handleCategorySelect}
        />

        {/* Projects Grid or Empty State */}
        {projects.length === 0 ? (
          <div>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Projects coming soon!
              </h2>
              <div className="text-6xl mb-4">🚧</div>
            </div>
            {/* 3 Skeleton Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="animate-pulse">
                    <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6">
                      <div className="flex gap-2 mb-3">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                      </div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No projects found
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              No projects found for the selected category.
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
                repo={project.repo}
                liveUrl={project.liveUrl}
                image={project.image}
              />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Have a project in mind?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            I&apos;m always interested in new opportunities and collaborations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
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
