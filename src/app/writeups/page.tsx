import { Suspense } from 'react';
import WriteupsContent from '@/components/WriteupsContent';

export default function Writeups() {
  return (
    <Suspense fallback={
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
    }>
      <WriteupsContent />
    </Suspense>
  );
}
