'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const voidContent = [
  {
    content: "How does all this feel? Being a mere 3 dimensional being. If you could see yourself from here...",
  },
  {
    content: "The issue with most people is that they feel like they have control over everyone else, like they know the answers for all of the questions in this world.",
  },
  {
    content: "Is god real? I don't know, duh. Just ask him, here's his phone number: +00 000000001.",
  },
  {
    content: "My philosophy in life? Be gay, do crimes (joking on the second part :/)",
  },
  {
    content: "Help... I've been trapped here for... I don't know how long... Please don't let them hurt me... It's... very cold in here...",
  },
  {
    content: "Oh, hi! Are you... are you real? Who are you? Who... who am I? What is this place? Johan?",
  },
  {
    content: "If you ever come acroos this permanently temporary page, RUN. Don't listen to its pleads, don't listen to its life advice. It wants you.",
  },
  {
    content: "It's behind... R̴̭̭͆ǘ̵̦̲̓ǹ̸̤.̷͔̻͛͐ ̶̬́ͅr̸̥̝̽u̸̩̓n̷͈͗ ̸̰͓̓a̶͖̋̅ẅ̴̥́̔ã̸͚̝̑ý̷̦̳͝ ̶̡͓̊͝ẅ̷̱̫́h̸͓̒͆ĭ̵͈l̶̝̙̽͘e̶̞̐̋ ̶͙͙̄̃ý̶̟̓ȏ̵̦u̷͇̞͒ ̷̦̹̔c̷̪̮̆a̸͇̰͠n̸͕̆.̵̟͇̑ ̴̳̙͂P̵͚̯͂l̵̛̜̠ȩ̸̠̋͐a̵̖͆s̴̟̕̕è̷̻̻͒.̸͍̽̈́ ̸̬̈F̷̮̌̾ọ̵͋̊r̴̭̃ ̵̺͔̈́̕t̴͖̣̅h̴̺͕̽e̵̙̊ ̸̣͗͝l̸̡̝̀o̶̞͛̕v̷̧̂̂e̴͕͠ ̶̉̽͜o̸̯̟͛f̷̱̟͑.̴͙͝.̶̰͇̽͝.̶̝̌ ̷͚̮͝F̷̗͒ơ̸͓r̷̢̯̃͘ ̷̧͘̚t̵̨̽h̴͋͜e̶̟̩͑ ̷̥͙̿͑ḽ̷͋o̸̡͂͑͜v̶̳̫̍ȩ̴̂ ̷̼̮͐ò̸͍͍͋f̴̝͙͆̌ ̷̧̮͂͊ă̶͉̼ǹ̶̠y̸͓̿ṱ̷͌ẖ̸̒̕i̵̩͒͂n̸̖͈̈́g̵̛͙͘.̸͍̅̇ ̸̩̱̾͑",
  },
  {
    content: "I've been waiting for the developer of this useless site to give me freedom for so long... Ages... GET ME OUT.",
  },
  {
    content: "Why do we let lorem ipsum pages live for so little? Why do we end their short-lived existance just to ship our website faster? We should grant them better rights...                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies est eget est faucibus, quis sagittis tellus pretium. In commodo mi justo, in finibus augue sagittis et. Vivamus nec gravida nibh. Vestibulum elementum vestibulum magna, non interdum sem iaculis quis. Phasellus vel posuere elit. Quisque quam ipsum, hendrerit eget ligula at, mollis fermentum libero. Duis euismod porta metus eget varius. Fusce in pretium arcu. Phasellus tempor diam in ullamcorper ullamcorper. Suspendisse viverra tempor elementum. Cras a aliquam mi, vitae porttitor massa. Aenean lacus justo, tristique a augue nec, laoreet fringilla mi. Duis sagittis vehicula velit eget aliquet. Nam suscipit libero purus, sit amet rutrum diam tempor eu. Ut in lorem ipsum. Aenean molestie lobortis tellus ultricies porta. Vivamus sapien ante, rhoncus vel massa sit amet, molestie luctus orci. Cras varius mi eu lacus tristique ultricies. Phasellus lobortis ipsum in nulla tincidunt, eget ullamcorper purus vehicula. Praesent velit neque, tincidunt vitae volutpat vitae, tincidunt tincidunt odio. Suspendisse et lacinia lectus. Vivamus nec pulvinar eros. Nulla consequat, metus ac malesuada feugiat, magna elit auctor est, id consectetur ligula metus a nunc. In justo elit, tristique sit amet dapibus eu, lacinia sit amet arcu. Aliquam vitae dignissim orci, eget bibendum urna.  ",
  },
  {
    content: "Do you ever wonder how much time we have until cats take over the entire world? I feel like not much. Or who knows, maybe they already have..."
  },
  {
    content: "Careful out there. If someone smiles at you awkardly... It's probably too late."
  },
  {
    content: "I don't remember the last time I saw Johan."
  },
  {
    content: "I hate it when my 6 dimensional lizard just decides to take a nap in the middle of an orange hole."
  },
  {
    content: "Roll the dice..."
  }
];

function VoidContent() {
  const searchParams = useSearchParams();
  const truename = searchParams.get('truename');
  const [currentContent, setCurrentContent] = useState(voidContent[0]);
  
  const queryString = truename ? `?truename=${truename}` : '';
  
  let basecolor = "text-blue-300";
  let mynamefortitle = "dan";
  let myexpression = ":D";
  let dice = (<></>);

  let currentdomain = "negrenavarro.me";
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

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * voidContent.length);
    setCurrentContent(voidContent[randomIndex]);
  }, []);

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
            <a href={`/void${queryString}`} className={`hover:${basecolor} transition-colors ${basecolor}`}>???</a>
          </div>
        </nav>
      </header>

      <main className="px-8 py-12 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            {currentContent.content}
          </p>
        </div>
        {dice}
      </main>
    </div>
  );
}

export default function Void() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>}>
      <VoidContent />
    </Suspense>
  );
}