'use client';

import { useSearchParams, usePathname } from 'next/navigation';

export default function BlogNotFound() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const truename = searchParams.get('truename');
  
  const queryString = truename ? `?truename=${truename}` : '';
  
  let basecolor = "text-blue-300";
  let mynamefortitle = "dan";
  let myexpression = ":D";
  
  let currentdomain = "pluraldan.link"
  if (typeof window !== "undefined") {
    currentdomain = window.location.hostname;
  }
  if (currentdomain === "zoe.negrenavarro.me" && !truename) {
    window.location.href = window.location.href + `?truename=zoe`;
  }
  if (truename === "zoe" || currentdomain === "zoe.negrenavarro.me") {
    mynamefortitle = "zoe";
    basecolor = "text-rose-300";
    myexpression = ":3";
  }

  const isLatestPost = pathname.endsWith('/latest');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="px-8 py-6">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <a href={`/${queryString}`} className="text-xl font-bold">about://{mynamefortitle}</a>
          <div className="flex gap-8 text-sm">
            <a href={`/${queryString}`} className={`hover:${basecolor} transition-colors`}>Home</a>
            <a href={`/about${queryString}`} className={`hover:${basecolor} transition-colors`}>About</a>
            <a href={`/blog${queryString}`} className={`hover:${basecolor} transition-colors ${basecolor}`}>Blog</a>
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

        <div className="text-center py-12">
          {isLatestPost ? (
            <>
              <h1 className="text-4xl font-bold mb-6">No Latest Post?</h1>
              <p className="text-xl text-gray-300 mb-8">
                Huh, strange... Could you please check back later? It might be a bug...
              </p>
              <p className="text-gray-400 mb-8">
                If it doesn't get fixed tomorrow, please reach out to me via email! You can find it at my homepage.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-6">Post Not Found!</h1>
              <p className="text-xl text-gray-300 mb-8">
                The post you're looking for seems to have wandered off on its own little adventure...
              </p>
              <p className="text-gray-400 mb-8">
                Or perhaps it never existed in the first place? Are we in a different timeline? Are you a secret time traveler and didn't tell me? Is this world even real? Or... maybe you just mistyped the URL {myexpression}
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}