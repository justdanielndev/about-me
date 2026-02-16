'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import HomeNavigation from '@/components/HomeNavigation';

function HomeContent() {
  const searchParams = useSearchParams();
  const truename = searchParams.get('truename');
  const [lastblogpostcontent, setLastBlogPostContent] = useState("Loading latest post...");
  const [lastblogposttitle, setLastBlogPostTitle] = useState("Loading latest post...");
  
  const queryString = truename ? `?truename=${truename}` : '';

  let basecolor = "text-blue-300";
  let myname = "Daniel Negre";
  let mynamefortitle = "dan";
  let mypronouns = "they/he";
  let extrausernamecontent = "";
  let myemail = "daniel@negrenavarro.me";
  let myexpression = ":D"
  let currentdomain = "negrenavarro.me"
  if (typeof window !== "undefined") {
    currentdomain = window.location.hostname;
  }
  if ((currentdomain === "zoe.negrenavarro.me" || currentdomain === "isitzoe.dev" || currentdomain === "zoe.rocks") && !truename) {
    window.location.href = window.location.href + `?truename=zoe`;
  }
  if (truename === "zoe" || currentdomain === "zoe.negrenavarro.me" || currentdomain === "isitzoe.dev" || currentdomain === "zoe.rocks") {
    mynamefortitle = "zoe";
    extrausernamecontent = " (yeah, deadname sadly. happens when you're not out to everyone :3)";
    myemail = "zoe@negrenavarro.me"
    mypronouns = "she/they";
    myname = "Zoe";
    basecolor = "text-rose-300";
    myexpression = ":3";
  }
  let thisurl = "https://negrenavarro.me";
  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const response = await fetch("/api/blog/latest/metadata");
        const data = await response.json();
        if (data && data.hmpdesc) {
          setLastBlogPostContent(data.hmpdesc);
        } else {
          setLastBlogPostContent("No blog posts found! Strange, I must say. Could you shoot me an email for me to check?");
        }
        if (data && data.title) {
          setLastBlogPostTitle(data.title);
        } else {
          setLastBlogPostTitle("go read it!");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setLastBlogPostContent("Something broke while I was fetching the latest post... Huh. Gotta fix it " + myexpression);
      }
    };

    fetchLatestPost();
  }, [myexpression]);

  if (typeof window !== "undefined") {
    thisurl = window.location.href;
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <HomeNavigation 
        mynamefortitle={mynamefortitle}
        basecolor={basecolor}
        queryString={queryString}
        myexpression={myexpression}
      />

      <main className="px-8 py-12 max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-lg mb-8">
            Hey {myexpression} I'm <span className={`${basecolor}`}>{myname}</span> ({mypronouns})! I'm a director, writer, developer... Overall, I make projects that are designed improve people's lives.

            <br />
            <br />
          Oh, you want examples... Hm... I built <a href="https://soundchestai.tech/" className={`${basecolor} hover:underline`}>SoundChestAI</a> for EduCaixa's The Challenge (and won my ticket to the finals!), started a <a href="https://nixentertainment.com" className={`${basecolor} hover:underline`}>media group</a> (which I'm really proud of, you should check it out), and more! (check my <a href={`/network${queryString}`} className={`${basecolor} hover:underline`}>Network</a> for all my projects!)
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">The Last Adventures</h2>
          <p className="mb-4">Might sound like some sort of TV show, but it's just where I show my latest stuff (blog posts, projects...):</p>
          
          <div className="bg-gray-900/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center border border-gray-600 rounded-lg p-4">
              <div>
                <h3 className="font-bold">CURRENT PROJECT</h3>
                <a href="https://nixentertainment.com/shadowborne-chronicles" className={`${basecolor} hover:underline`}>Shadowborne Chronicles</a>
                <p className="text-gray-400 text-sm italic">Working on an amazing brand new indie animated series! Go check it out {myexpression}</p>
              </div>
              </div>
              <div className="flex items-center border border-gray-600 rounded-lg p-4">
              <div>
                <h3 className="font-bold">LAST POST</h3>
                <a href={`/blog/latest${queryString}`} className={`${basecolor} hover:underline`}>{lastblogposttitle}</a>
                <p className="text-gray-400 text-sm italic">{lastblogpostcontent}</p>
              </div>
              </div>
            </div>
          </div>
        </section>

        <section className="">
          <h2 className="text-2xl font-bold mb-6">Want to contact me?</h2>
          <ul className="space-y-2">
            <li>
                {mynamefortitle === "dan" ? (
                <><strong>GitHub:</strong> <a href="https://github.com/justdanielndev" className={`${basecolor} hover:underline`}>justdanielndev</a>{extrausernamecontent}</>
                ) : (
                <><strong>GitHub:</strong> <a href="https://github.com/justdanielndev" className={`${basecolor} hover:underline`}>justdanielndev</a> (the deadname sucks help)</>
                )}
            </li>
            <li>
              <strong className="pr-2">Email:</strong> <a href={`mailto:${myemail}`} className={`${basecolor} hover:underline`}>{myemail}</a>
            </li>
            <li>
                {mynamefortitle === "dan" ? (
                <><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/daniel-negre/" className={`${basecolor} hover:underline`}>click here to open!</a>{extrausernamecontent}</>
                ) : (
                <><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/daniel-negre/" className={`${basecolor} hover:underline`}>click here to open!</a> (again, deadname sucks)</>
                )}
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
