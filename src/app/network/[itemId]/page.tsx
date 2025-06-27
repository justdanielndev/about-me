import { notFound } from 'next/navigation';
import { getNetworkItemBySlug } from '@/lib/network';
import { MDXRemote } from 'next-mdx-remote/rsc';

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
    let extrausernamecontent = "";
    let myemail = "dan@pluraldan.link";
    let myexpression = ":D"

    let currentdomain = "pluraldan.link"
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

                    <div className="max-w-none [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-white [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-white [&_p]:mb-4 [&_p]:text-gray-300 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_li]:mb-1 [&_li]:text-gray-300 [&_strong]:text-white [&_em]:text-gray-200 [&_code]:bg-gray-800 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:text-gray-200 [&_pre]:bg-gray-800 [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-400 [&_blockquote]:mb-4">
                        <MDXRemote source={item.content} />
                    </div>
                </article>
            </main>
        </div>
    );
}