import { getAllNetworkItems } from '@/lib/network';

interface NetworkPageProps {
  searchParams: Promise<{ truename?: string }>;
}

export default async function Network({ searchParams }: NetworkPageProps) {
  const { truename } = await searchParams;
  const items = getAllNetworkItems();

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
            <a href={`#${queryString}`} className={`hover:${basecolor} transition-colors ${basecolor}`}>Network</a>
            <a href={`/void${queryString}`} className={`hover:${basecolor} transition-colors`}>???</a>
          </div>
        </nav>
      </header>

      <main className="px-8 py-12 max-w-4xl mx-auto">
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-6">Network</h1>
          <p className="text-lg mb-8">
            <span>This page has everything I've worked on, projects I made, groups I'm part of, competitions I participated in... Both current and past! The best place for your stalking needs... (¬_¬)</span>
          </p>
        </section>

        <section>
            <div className="grid grid-cols-2 gap-8">
              {items.map((item) => (
                <article key={item.id} className="border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-colors">
                  <header className="mb-4">
                    <h2 className="text-2xl font-bold mb-2">
                      <a href={`/network/${item.slug}${queryString}`} className={`${basecolor} hover:underline`}>
                        {item.title}
                      </a>
                    </h2>
                  </header>
                  <p className="text-gray-400 mb-4">{item.type}</p>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <a
                    href={`/network/${item.slug}${queryString}`}
                    className={`inline-flex items-center ${basecolor} hover:underline text-sm`}
                  >
                    Read more →
                  </a>
                </article>
              ))}
            </div>
        </section>
      </main>
    </div>
  );
}