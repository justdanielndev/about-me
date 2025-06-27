'use client';
import { useSearchParams } from 'next/navigation';

export default function About() {
    const searchParams = useSearchParams();
    const truename = searchParams.get('truename');

    const queryString = truename ? `?truename=${truename}` : '';

    let timeshomehovered = 0;
    let basecolor = "text-blue-300";
    let myname = "Dan";
    let mynamefortitle = "dan";
    let mypronouns = "they/he";
    let extrausernamecontent = "";
    let myemail = "dan@pluraldan.link";
    let myexpression = ":D";
    let currentdomain = "pluraldan.link";
    let extracontent = <div></div>;
    if (typeof window !== "undefined") {
        currentdomain = window.location.hostname;
    }
    if (currentdomain === "zoe.negrenavarro.me" && !truename) {
        window.location.href = window.location.href + `?truename=zoe`;
    }
    if (truename === "zoe" || currentdomain === "zoe.negrenavarro.me") {
        mynamefortitle = "zoe";
        myname = "Zoe";
        mypronouns = "she/they";
        extrausernamecontent = " (yeah, deadname sadly. happens when you're not out to everyone :3)";
        myemail = "zoe@negrenavarro.me"
        basecolor = "text-rose-300";
        myexpression = ":3";
        extracontent = (
            <>
                <br />
                <br />
                <span className="text-rose-300">
                    And, putting this up today as a 28th of June thing (though you'll probably see this later, whoever you are),
                </span>
                    <br />
                    a nice secret for you! Some flags: 🩷💛🩵 (probably already knew this of me, in this case it refers to both panromantic and pansexual if you didn't know), and, finally... 🏳️‍⚧️ (guess)! Yeah, best way to come out, huh?
            </>
        );
    }
    let thisurl = "https://pluraldan.link";

    if (typeof window !== "undefined") {
        thisurl = window.location.href;
    }
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="px-8 py-6">
                <nav className="flex justify-between items-center max-w-6xl mx-auto">
                    <a href={`/${queryString}`} className="text-xl font-bold">about://{mynamefortitle}</a>
                    <div className="flex gap-8 text-sm">
                        <a id="home" href={`/home${queryString}`} className={`hover:${basecolor} transition-colors`}>Home</a>
                        <a href={`#${queryString}`} className={`hover:${basecolor} transition-colors ${basecolor}`}>About</a>
                        <a href={`/blog${queryString}`} className={`hover:${basecolor} transition-colors`}>Blog</a>
                        <a href={`/network${queryString}`} className={`hover:${basecolor} transition-colors`}>Network</a>
                        <a href={`/void${queryString}`} className={`hover:${basecolor} transition-colors`}>???</a>
                    </div>
                </nav>
            </header>

            <main className="px-8 py-12 max-w-4xl mx-auto">
                <section className="mb-12">
                    <p className="text-lg mb-8">
                        Hello again! So... you want to know things about me, right? Well...
                        <br />
                        I'm a student that loves coding, writing, and overall anything that involves creativity and technology. I'm a member of <a href="https://hackclub.com" className={`${basecolor} hover:underline`}>Hack Club</a>, and I spend most of my day (gotta sleep, study and eat, so not the whole day {myexpression}) working on... Well, depends on the day XD.
                        <br />
                        <br />
                        As for my setup, I have a <span className={`${basecolor}`}>Pixel 9 Pro XL</span> as my daily driver phone, a <span className={`${basecolor}`}>Macbook Air 13" (M2, 2024)</span> as my main PC and a <span className={`${basecolor}`}>Raspberry Pi 5</span> as my server/NAS.
                        <br />
                        <br />
                        The main apps I use... well, we've got <a href="https://code.visualstudio.com/" className={`${basecolor} hover:underline`}>VS Code</a> for all my programming, <a href="https://obsidian.md/" className={`${basecolor} hover:underline`}>Obsidian</a> for my notes (primarily for my animated series), <a href="https://www.figma.com/" className={`${basecolor} hover:underline`}>Figma</a> for design, and <a href="https://slack.com/" className={`${basecolor} hover:underline`}>Slack</a> and <a href="https://www.whatsapp.com/" className={`${basecolor} hover:underline`}>WhatsApp</a> (yeah, sadly I need to use it to communicate with close people) for communication.
                        <br />
                        <br />
                        And what else can I say? Uh... I use JS for 99% of the things I do :3 (JS supremacy lets gooooo), love nice UI/UX design (yeah, I'm always following the latest design trends), and I'm always looking for new projects to work on! Have ideas? Let me know! Not on email though, the challenge is to find me on Slack or Discord.
                        {extracontent}
                    </p>
                </section>
            </main>
        </div>
    );
}
