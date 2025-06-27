import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
  hmpdesc?: string;
}

export interface BlogMetadata {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  hmpdesc?: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        id,
        slug: data.slug || id,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || '',
        content,
        tags: data.tags || [],
        hmpdesc: data.hmpdesc || data.excerpt || ''
      };
    });

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostById(id: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${id}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id,
      slug: data.slug || id,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || '',
      content,
      tags: data.tags || [],
      hmpdesc: data.hmpdesc || data.excerpt || ''
    };
  } catch (error) {
    console.error(`Error reading post ${id}:`, error);
    return null;
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (slug === 'latest') {
    return getLatestPost();
  }
  
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

export function getLatestPost(): BlogPost | null {
  const posts = getAllPosts();
  return posts.length > 0 ? posts[0] : null;
}

export function getPostMetadata(id: string): BlogMetadata | null {
  const post = getPostById(id);
  if (!post) return null;
  
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    tags: post.tags,
    hmpdesc: post.hmpdesc
  };
}

export function getLatestPostMetadata(): BlogMetadata | null {
  const post = getLatestPost();
  if (!post) return null;
  
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    tags: post.tags,
    hmpdesc: post.hmpdesc
  };
}