export interface WriteupMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
}

// Static data for the sample writeup
const sampleWriteup: WriteupMeta = {
  title: "SAMPLE WRITE UP",
  description: "SAMPLE DESCRIPTION",
  date: "2025-08-21",
  tags: ["learning", "foundation"],
  slug: "sample-write-up",
};

export async function getWriteups(): Promise<WriteupMeta[]> {
  // Return the sample writeup for now
  return [sampleWriteup];
}

export async function getWriteupBySlug(slug: string): Promise<{ meta: WriteupMeta; content: string } | null> {
  if (slug === "sample-write-up") {
    return {
      meta: sampleWriteup,
      content: `Content goes here. A short paragraph is fine.

This is a placeholder writeup that demonstrates the MDX system. It includes basic content structure and will be used to test the category filtering and individual post rendering functionality.

The writeup system supports:
- Frontmatter with title, description, date, and tags
- MDX content rendering
- Category-based filtering
- SEO optimization
- Open Graph metadata

When you're ready to add real content, simply replace this file with your actual writeups.`
    };
  }
  return null;
}

export async function getWriteupsByTag(tag: string): Promise<WriteupMeta[]> {
  const allWriteups = await getWriteups();
  return allWriteups.filter((writeup) =>
    writeup.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function getAllTags(): Promise<string[]> {
  const allWriteups = await getWriteups();
  const tags = new Set<string>();
  
  allWriteups.forEach((writeup) => {
    writeup.tags.forEach((tag) => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}
