'use client';

import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/data/projects';

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Limit to maximum 6 featured projects
  const maxFeaturedProjects = 6;
  const limitedProjects = projects.slice(0, maxFeaturedProjects);

  // Update viewport on resize
  useEffect(() => {
    const updateViewport = () => {
      if (window.innerWidth < 768) {
        setViewport('mobile');
      } else if (window.innerWidth < 1024) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Reset to first slide when viewport changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [viewport]);

  // Calculate navigation based on viewport
  const getNavigationInfo = () => {
    if (viewport === 'mobile') {
      // Mobile: show 1 project, can navigate through all (up to 6)
      return {
        projectsPerView: 1,
        maxIndex: limitedProjects.length - 1,
        showArrows: limitedProjects.length > 1
      };
    } else if (viewport === 'tablet') {
      // Tablet: show 2 projects, can navigate through sets
      return {
        projectsPerView: 2,
        maxIndex: Math.max(0, limitedProjects.length - 2),
        showArrows: limitedProjects.length > 2
      };
    } else {
      // Desktop: show 3 projects, can navigate through sets
      return {
        projectsPerView: 3,
        maxIndex: Math.max(0, limitedProjects.length - 3),
        showArrows: limitedProjects.length > 3
      };
    }
  };

  const { projectsPerView, maxIndex, showArrows } = getNavigationInfo();
  
  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, maxIndex, viewport]); // Include all dependencies

  // Get the current projects to display
  const getCurrentProjects = () => {
    let currentProjects = limitedProjects.slice(currentIndex, currentIndex + projectsPerView);
    
    // If we have less than needed, pad with the first ones
    while (currentProjects.length < projectsPerView && limitedProjects.length > 0) {
      currentProjects.push(limitedProjects[currentProjects.length % limitedProjects.length]);
    }
    
    return currentProjects;
  };

  const currentProjects = getCurrentProjects();

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      {showArrows && (
        <>
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-[var(--surface)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--text)] hover:bg-[var(--surface-hover)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
            aria-label="Previous projects"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-[var(--surface)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--text)] hover:bg-[var(--surface-hover)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
            aria-label="Next projects"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Projects Grid - Responsive */}
      <div className={`grid gap-6 mt-8 ${
        viewport === 'mobile' 
          ? 'grid-cols-1 max-w-sm mx-auto' 
          : viewport === 'tablet' 
            ? 'grid-cols-2 max-w-4xl mx-auto' 
            : 'grid-cols-3'
      }`}>
        {currentProjects.map((project, index) => (
          <ProjectCard
            key={`${currentIndex}-${index}`}
            title={project.title}
            tags={project.tags}
            summary={project.summary}
            repo={project.repo}
            liveUrl={project.liveUrl}
            image={project.image}
          />
        ))}
      </div>

      {/* Dots Indicator */}
      {showArrows && maxIndex > 0 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 hover:scale-125 ${
                index === currentIndex
                  ? 'bg-[var(--primary)] scale-110'
                  : 'bg-[var(--border)] hover:bg-[var(--muted)]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* More Projects Indicator */}
      {projects.length > maxFeaturedProjects && (
        <div className="text-center mt-4 text-sm text-[var(--muted)]">
          Showing {limitedProjects.length} of {projects.length} projects
        </div>
      )}
    </div>
  );
}
