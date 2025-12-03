import { getAllNetworkItems } from '@/lib/network';
import Navigation from '@/components/Navigation';
import { headers } from 'next/headers';

interface NetworkPageProps {
  searchParams: Promise<{ truename?: string }>;
}

export default async function Network({ searchParams }: NetworkPageProps) {
  const { truename } = await searchParams;
  const items = getAllNetworkItems();

  const queryString = truename ? `?truename=${truename}` : '';

  let basecolor = "text-blue-300";
  let mynamefortitle = "dan";

  const headersList = await headers();
  const host = headersList.get('host') || "";
  let currentdomain = "negrenavarro.me";
  if (host.includes("zoe.negrenavarro.me") || host.includes("isitzoe.dev")) {
      currentdomain = "zoe.negrenavarro.me";
  }

  if (truename === "zoe" || currentdomain === "zoe.negrenavarro.me") {
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
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-6">Network</h1>
          <p className="text-lg mb-8">
            <span>This page has everything I've worked on, projects I made, groups I'm part of, competitions I participated in... Both current and past! The best place for your stalking needs... (¬_¬)</span>
          </p>
        </section>

        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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