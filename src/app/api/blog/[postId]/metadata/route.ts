import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug, getLatestPostMetadata } from '@/lib/blog';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  let metadata;
  
  if (postId === 'latest') {
    metadata = getLatestPostMetadata();
  } else {
    const post = getPostBySlug(postId);
    if (post) {
      metadata = {
        id: post.id,
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        tags: post.tags,
        hmpdesc: post.hmpdesc
      };
    }
  }

  if (!metadata) {
    return NextResponse.json(
      { error: 'Post not found' }, 
      { status: 404 }
    );
  }

  return NextResponse.json(metadata);
}