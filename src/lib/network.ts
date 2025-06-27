import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface NetworkItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  type: string;
  order: string;
}

const networkDirectory = path.join(process.cwd(), 'src/content/network');

export function getAllNetworkItems(): NetworkItem[] {
  if (!fs.existsSync(networkDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(networkDirectory);
  const allNetworkItems = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(networkDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        id,
        slug: data.slug || id,
        title: data.title || 'Top Secret',
        description: data.description || '',
        content,
        type: data.type || '???',
        order: data.order || '0',
      };
    });

  return allNetworkItems.sort((a, b) => (a.order > b.order ? 1 : -1));
}

export function getNetworkItemById(id: string): NetworkItem | null {
  try {
    const fullPath = path.join(networkDirectory, `${id}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id,
      slug: data.slug || id,
      title: data.title || 'Top Secret',
      description: data.description || '',
      content,
      type: data.type || '???',
    };
  } catch (error) {
    console.error(`Error reading network item ${id}:`, error);
    return null;
  }
}

export function getNetworkItemBySlug(slug: string): NetworkItem | null {

  const items = getAllNetworkItems();
  return items.find(item => item.slug === slug) || null;
}