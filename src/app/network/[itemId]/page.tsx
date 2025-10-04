import { notFound } from 'next/navigation';
import { getNetworkItemBySlug } from '@/lib/network';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Navigation from '@/components/Navigation';

interface NetworkPageProps {
    params: Promise<{ itemId: string }>;
    searchParams: Promise<{ truename?: string }>;
}

export default async function NetworkItem({ params, searchParams }: NetworkPageProps) {
    const { truename } = await searchParams;
    const { itemId } = await params;
    const item = getNetworkItemBySlug(itemId);

    if (!item) {
        notFound();
    }

    const queryString = truename ? `?truename=${truename}` : '';

    let basecolor = "text-blue-300";
    let mynamefortitle = "dan";

    let currentdomain = "negrenavarro.me"
    if (typeof window !== "undefined") {
        currentdomain = window.location.hostname;
    }
    if ((currentdomain === "zoe.negrenavarro.me" || currentdomain === "isitzoe.dev") && !truename) {
    window.location.href = window.location.href + `?truename=zoe`;
    }
    if (truename === "zoe" || currentdomain === "zoe.negrenavarro.me" || currentdomain === "isitzoe.dev") {
        mynamefortitle = "zoe";
        basecolor = "text-rose-300";
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navigation 
                mynamefortitle={mynamefortitle}
                basecolor={basecolor}
                queryString={queryString}
                currentPage="network"
            />

            <main className="px-8 py-12 max-w-4xl mx-auto">
                <nav className="mb-8">
                    <a href={`/network${queryString}`} className={`${basecolor} hover:underline text-sm`}>
                        {`<`} Back to Network
                    </a>
                </nav>

                <article>
                    <header className="mb-12">
                        <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
                        <div className="text-gray-400 text-sm mb-4">
                        </div>
                        {item.type && (
                            <div className="flex flex-wrap gap-2">
                                <span
                                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                                >
                                    {item.type}
                                </span>
                            </div>
                        )}
                    </header>

                    <div className={`max-w-none [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-white [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-white [&_p]:mb-4 [&_p]:text-gray-300 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_li]:mb-1 [&_li]:text-gray-300 [&_strong]:text-white [&_em]:text-gray-200 [&_code]:bg-gray-800 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:text-gray-200 [&_pre]:bg-gray-800 [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-400 [&_blockquote]:mb-4 [&_a]:${basecolor} [&_a]:underline [&_a]:hover:opacity-80 [&_a]:transition-opacity [&_a]:duration-200`} id="mdx-content">
                        <MDXRemote source={item.content} />
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