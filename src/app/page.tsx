import Link from 'next/link';
import ProjectCard from '../components/ProjectCard';
import { getFeatured } from '../lib/projects';
import { getWriteups } from '../lib/mdx';
import CTAButton from '../components/CTAButton';

export default async function Home() {
  // Get featured projects
  const featuredProjects = getFeatured(3);
  
  // Get latest writeups from MDX files
  const latestWriteups = (await getWriteups()).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">MJ</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            I build fast, reliable apps and document what I learn — from frontend and backend to systems, security, and AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CTAButton href="/about">About</CTAButton>
            <CTAButton href="/projects">Projects</CTAButton>
            <CTAButton href="/writeups">Notes</CTAButton>
            <CTAButton href="/contact">Contact</CTAButton>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="mx-auto max-w-6xl py-10">
        <h2 className="text-center text-3xl font-semibold">What I Do</h2>
        <p className="mt-2 text-center text-slate-400">Building, researching, and sharing knowledge.</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Development</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Building secure, scalable applications with modern technologies and best practices.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Research</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Exploring new technologies, conducting experiments, and improving application quality.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Writeups</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sharing knowledge through detailed technical writeups and research findings.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="mx-auto max-w-6xl py-10">
        <h2 className="text-center text-3xl font-semibold">Featured Projects</h2>
        <p className="mt-2 text-center text-slate-400">A few things I&apos;m building and polishing.</p>
        
        {featuredProjects.length === 0 ? (
          // Skeleton cards when no projects
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
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
        ) : (
          // Featured projects grid
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {featuredProjects.map((project, index) => (
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
        
        <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              View All Projects
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
      </section>

      {/* Latest Notes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Notes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Recent insights and deeper dives on what I&apos;m building and learning.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestWriteups.map((writeup) => (
              <div
                key={writeup.slug}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {writeup.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {writeup.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {writeup.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {writeup.date}
                    </span>
                    <Link
                      href={`/writeups/${writeup.slug}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/writeups"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              View All Notes
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-4xl py-14 text-center">
        <h2 className="text-3xl font-semibold">Let&apos;s work together</h2>
        <p className="mt-2 text-slate-400">Have a project or question? Reach out anytime.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <CTAButton href="mailto:mujahedk@umich.edu?subject=Portfolio%20Inquiry">Email Me</CTAButton>
          <CTAButton href="/contact">Contact Page</CTAButton>
        </div>
      </section>
    </div>
  );
}
