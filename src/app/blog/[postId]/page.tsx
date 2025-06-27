import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface BlogPageProps {
    params: Promise<{ postId: string }>;
    searchParams: Promise<{ truename?: string }>;
}

export default async function BlogPost({ params, searchParams }: BlogPageProps) {
    const { truename } = await searchParams;
    const { postId } = await params;
    const post = getPostBySlug(postId);

    if (!post) {
        notFound();
    }

    const queryString = truename ? `?truename=${truename}` : '';

    let basecolor = "text-blue-300";
    let mynamefortitle = "dan";
    let extrausernamecontent = "";
    let myemail = "daniel@negrenavarro.me";
    let myexpression = ":D"

    let currentdomain = "negrenavarro.me"
    if (typeof window !== "undefined") {
        currentdomain = window.location.hostname;
    }
    if (currentdomain === "zoe.negrenavarro.me" && !truename) {
    window.location.href = window.location.href + `?truename=zoe`;
    }
    if (truename === "zoe" || currentdomain === "zoe.negrenavarro.me") {
        mynamefortitle = "zoe";
        extrausernamecontent = " (yeah, deadname sadly. happens when you're not out to everyone :3)";
        myemail = "zoe@negrenavarro.me"
        basecolor = "text-rose-300";
        myexpression = ":3";
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="px-8 py-6">
                <nav className="flex justify-between items-center max-w-6xl mx-auto">
                    <a href={`/${queryString}`} className="text-xl font-bold">about://{mynamefortitle}</a>
                    <div className="flex gap-8 text-sm">
                        <a href={`/${queryString}`} className={`hover:${basecolor} transition-colors`}>Home</a>
                        <a href={`/about${queryString}`} className={`hover:${basecolor} transition-colors`}>About</a>
                        <a href={`/blog${queryString}`} className={`hover:${basecolor} transition-colors`}>Blog</a>
                        <a href={`/network${queryString}`} className={`hover:${basecolor} transition-colors`}>Network</a>
                        <a href={`/void${queryString}`} className={`hover:${basecolor} transition-colors`}>???</a>
                    </div>
                </nav>
            </header>

            <main className="px-8 py-12 max-w-4xl mx-auto">
                <nav className="mb-8">
                    <a href={`/blog${queryString}`} className={`${basecolor} hover:underline text-sm`}>
                        {`<`} Back to my Blog
                    </a>
                </nav>

                <article>
                    <header className="mb-12">
                        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                        <div className="text-gray-400 text-sm mb-4">
                            <time>
                                {new Date(post.date).toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }).replace(/(\d+)/, (match) => {
                                    const day = parseInt(match);
                                    const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 || day > 20) ? 0 : day % 10];
                                    return `I wrote this post on the ${day}${suffix} of`
                                })} {(() => {
                                    const postDate = new Date(post.date);
                                    const today = new Date();
                                    const diffTime = Math.abs(today.getTime() - postDate.getTime());
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                    return `(${diffDays} day${diffDays === 1 ? '' : 's'} ago)`;
                                })()}
                            </time>
                        </div>
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>

                    <div className={`max-w-none [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-white [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-white [&_p]:mb-4 [&_p]:text-gray-300 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_li]:mb-1 [&_li]:text-gray-300 [&_strong]:text-white [&_em]:text-gray-200 [&_code]:bg-gray-800 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:text-gray-200 [&_pre]:bg-gray-800 [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-400 [&_blockquote]:mb-4 [&_a]:${basecolor} [&_a]:underline [&_a]:hover:opacity-80 [&_a]:transition-opacity [&_a]:duration-200`} id="mdx-content">
                        <MDXRemote source={post.content} />
                    </div>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                const linkColor = '${basecolor === 'text-blue-300' ? '#93c5fd' : '#fda4af'}';
                                function styleMDXLinks() {
                                    const contentDiv = document.getElementById('mdx-content');
                                    if (contentDiv) {
                                        const links = contentDiv.querySelectorAll('a');
                                        links.forEach(link => {
                                            link.style.color = linkColor;
                                            link.style.textDecoration = 'underline';
                                            link.style.transition = 'opacity 0.2s';
                                            link.addEventListener('mouseenter', () => {
                                                link.style.opacity = '0.8';
                                            });
                                            link.addEventListener('mouseleave', () => {
                                                link.style.opacity = '1';
                                            });
                                        });
                                    }
                                }
                                if (document.readyState === 'loading') {
                                    document.addEventListener('DOMContentLoaded', styleMDXLinks);
                                } else {
                                    styleMDXLinks();
                                }
                                setTimeout(styleMDXLinks, 100);
                            })();
                        `
                    }} />
                </article>
            </main>
        </div>
    );
}