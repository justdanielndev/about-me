import { getAllPosts } from '@/lib/blog';
import Navigation from '@/components/Navigation';

interface BlogPageProps {
  searchParams: Promise<{ truename?: string }>;
}

export default async function Blog({ searchParams }: BlogPageProps) {
  const { truename } = await searchParams;
  const posts = getAllPosts();
  
  const queryString = truename ? `?truename=${truename}` : '';

  let basecolor = "text-blue-300";
  let mynamefortitle = "dan";
  let myexpression = ":D"

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
    myexpression = ":3";
  }


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation 
        mynamefortitle={mynamefortitle}
        basecolor={basecolor}
        queryString={queryString}
        currentPage="blog"
      />

      <main className="px-8 py-12 max-w-4xl mx-auto">
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-6">The Blog</h1>
          <p className="text-lg mb-8">
            Oh! Welcome! I wasn't expecting company! Here, have a look... I've got a bunch of nice posts for you to read! {myexpression} <span className="text-gray-400">(you can search for a specific post too!)</span>
          </p>
        </section>

        <section>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Uh... it seems like all of the posts have gone in some sort of adventure to some unknown place... Guess you'll have to come back later for them!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.id} className="border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-colors">
                  <header className="mb-4">
                    <h2 className="text-2xl font-bold mb-2">
                      <a href={`/blog/${post.slug}${queryString}`} className={`${basecolor} hover:underline`}>
                        {post.title}
                      </a>
                    </h2>
                    <time className="text-gray-400 text-sm">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </time>
                  </header>
                  <p className="text-gray-300 mb-4">{post.excerpt}</p>
                  <a 
                    href={`/blog/${post.slug}${queryString}`}
                    className={`inline-flex items-center ${basecolor} hover:underline text-sm`}
                  >
                    Read more →
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}