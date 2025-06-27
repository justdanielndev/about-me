'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const searchParams = useSearchParams();
  const truename = searchParams.get('truename');
  const [lastblogpostcontent, setLastBlogPostContent] = useState("Loading latest post...");
  const [lastblogposttitle, setLastBlogPostTitle] = useState("Loading latest post...");
  
  const queryString = truename ? `?truename=${truename}` : '';

  let timeshomehovered = 0;
  let basecolor = "text-blue-300";
  let myname = "Dan";
  let mynamefortitle = "dan";
  let mypronouns = "they/he";
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
    mypronouns = "she/they";
    myname = "Zoe";
    basecolor = "text-rose-300";
    myexpression = ":3";
  }
  let thisurl = "https://pluraldan.link";
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
    const homeTextElement = document.getElementById("home");
    const updateHomeText = () => {
      if (!homeTextElement) return;
      if (timeshomehovered === 0) {
        homeTextElement.innerHTML = "You're... already here.";
      } else if (timeshomehovered === 1) {
        homeTextElement.innerHTML = "Seriously, you're already here.";
      } else if (timeshomehovered === 2) {
        homeTextElement.innerHTML = "Again?";
      } else if (timeshomehovered === 3) {
        homeTextElement.innerHTML = "I'll tear your soul apart " + myexpression + " (/j)";
      } else if (timeshomehovered === 4) {
        homeTextElement.innerHTML = "Why are you still hovering?";
      } else if (timeshomehovered === 5) {
        homeTextElement.innerHTML = "A̵̛̱̞͓̝̣̖̜̫̪̰̙͙͉̩̭̪̿̇̿̾̌̎̉̇̐̀͗̌́̇̑̍̀̓̑͒̕͝͠͠Á̷̧̡̛̹̓͊̏̓̓́̅͐̓̌̄̾̌̿̀̈́̒̌̇͊̍̎͆̂̚A̶̲̔̓̋̍̎͊̈́͂̓̅́́͐͆̌̾̎̊̅͘̕͝Ǎ̴̢̡̢̤̖̪͔̤̥̺͙̦̮͉̹̖̗̣̀̈́̿͑̅̀̈̉̇̊̊̌A̴̧̡͚̼̘̤̙̝̮̟͈̯̖̯͉̖͍̗̺̤̩͇̞͇̜̱̓͌͂̍̄͊́̆̿̀͌̈́̒͗́̎̐̏̀̓̀̃̑͌͘̕͜͝A̴̩͍̭͊͂̈́͐̑̾̾̾̾̐̅̀̽͛̓͝A̶̢̢̡̢̛̱̰̭̘͖̳̮̰̩̘̯̺͎̟̻̲̙̫̬̙̜̙̍͒͋͂͑̈̾̏̀̏̐̉̓̈́̍̓̚̚͜͝ͅÄ̸̧̨͔͇͖̳͍̭̻͉͈̻̥́̏̃̅̑̀͂͝Ä̸̛̛̺́̾͑̐̈́̐̕Ą̷̢̧̛̞̭͈͈̝͔͕̼̩̣̞̮͈̺͎̘͉̺̭͓͍̰̝̜̈́̅̀̇͛̍̽̌͌̐̔͂̃̌̏̎̋̅̐͗͜͝";
      } else if (timeshomehovered === 6) {
        homeTextElement.innerHTML = "I can see you.";
      } else if (timeshomehovered === 7) {
        homeTextElement.innerHTML = "Ok, I give up.";
      } else if (timeshomehovered === 8) {
        homeTextElement.innerHTML = "Do you have nothing else to do?";
      } else if (timeshomehovered === 9) {
        homeTextElement.innerHTML = "Go read or something.";
      } else if (timeshomehovered === 10) {
        homeTextElement.innerHTML = "Seriously?";
      } else if (timeshomehovered === 11) {
        homeTextElement.innerHTML = "Johan and you would be good friends";
      } else if (timeshomehovered === 12) {
        homeTextElement.innerHTML = "He... I don't know if he's even alive anymore.";
      } else if (timeshomehovered <= 17) {
        homeTextElement.innerHTML = "...";
      } else if (timeshomehovered >= 18) {
        window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
      }
    };
    homeTextElement?.addEventListener("mouseover", () => {
      updateHomeText();
      timeshomehovered++;
    });
    homeTextElement?.addEventListener("mouseout", () => {
      homeTextElement.innerHTML = "Home";
    });
    homeTextElement?.addEventListener("click", () => {
      updateHomeText();
      timeshomehovered++;
    });
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="px-8 py-6">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="text-xl font-bold cursor-default">about://{mynamefortitle}</div>
          <div className="flex gap-8 text-sm">
            <a id="home" href="#" className={`hover:${basecolor} transition-colors ${basecolor}`}>Home</a>
            <a href={`/about${queryString}`} className={`hover:${basecolor} transition-colors`}>About</a>
            <a href={`/blog${queryString}`} className={`hover:${basecolor} transition-colors`}>Blog</a>
            <a href={`/network${queryString}`} className={`hover:${basecolor} transition-colors`}>Network</a>
            <a href="#" className={`hover:${basecolor} transition-colors`}>???</a>
          </div>
        </nav>
      </header>

      <main className="px-8 py-12 max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-lg mb-8">
            Hey {myexpression} I'm <span className={`${basecolor}`}>{myname}</span> ({mypronouns}) and uh... I do stuff! I research about how we work (humans, of course... or are you an AI? ಠಿ_ಠ), code lots of projects and try to make people's lives better with what I do!

            <br />
            <br />
          Oh, you want examples... Hm... I built <a href="https://soundchestai.tech/" className={`${basecolor} hover:underline`}>SoundChestAI</a> for EduCaixa's The Challenge (and went to the finals!), started an <a href="https://nixmedia.studio" className={`${basecolor} hover:underline`}>animation group</a>, and more! (check <a href={`/network${queryString}`} className={`${basecolor} hover:underline`}>Network</a> for all my projects!)
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">The Last Adventures</h2>
          <p className="mb-4">Might sound like some sort of TV show, but it's just where I show my latest stuff (blog posts, projects...):</p>
          
          <div className="bg-gray-900/50">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center border border-gray-600 rounded-lg p-4">
              <div>
                <h3 className="font-bold">CURRENT PROJECT</h3>
                <a href={thisurl} className={`${basecolor} hover:underline`}>this site!</a>
                <p className="text-gray-400 text-sm italic">Does it look cool? Wanted to renew my portfolio for a while {myexpression}</p>
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
                <><strong>GitHub:</strong> <a href="#" className={`${basecolor} hover:underline`}>justdanielndev</a>{extrausernamecontent}</>
                ) : (
                <span>GitHub: <span className={`${basecolor} cursor-default`}>soon (the fking deadname sucks)</span></span>
                )}
            </li>
            <li>
              <strong className="pr-2">Email:</strong> <a href={`mailto:${myemail}`} className={`${basecolor} hover:underline`}>{myemail}</a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
