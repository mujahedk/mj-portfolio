import { Suspense } from 'react';
import ProjectsContent from '@/components/ProjectsContent';

export default function Projects() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-6 max-w-md mx-auto"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-12 max-w-2xl mx-auto"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-12 max-w-lg mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
