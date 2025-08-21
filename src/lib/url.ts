import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function updateQueryParam(
  router: AppRouterInstance,
  key: string,
  value: string | null
): void {
  if (value === null || value === 'All') {
    // Remove the query parameter if it's null or "All"
    router.push(window.location.pathname);
  } else {
    // Add or update the query parameter
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    router.push(url.pathname + url.search);
  }
}
