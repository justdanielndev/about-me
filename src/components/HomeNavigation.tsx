'use client';

import { useState, useEffect } from 'react';

interface HomeNavigationProps {
  mynamefortitle: string;
  basecolor: string;
  queryString: string;
  myexpression: string;
}

export default function HomeNavigation({ mynamefortitle, basecolor, queryString, myexpression }: HomeNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeshomehovered, setTimesHomeHovered] = useState(0);

  const navItems = [
    { href: `/about${queryString}`, label: 'About', page: 'about' },
    { href: `/blog${queryString}`, label: 'Blog', page: 'blog' },
    { href: `/network${queryString}`, label: 'Network', page: 'network' },
    { href: `/void${queryString}`, label: '???', page: 'void' },
  ];

  const updateHomeText = () => {
    const homeTextElement = document.getElementById("home");
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

  const handleHomeHover = () => {
    updateHomeText();
    setTimesHomeHovered(prev => prev + 1);
  };

  const handleHomeLeave = () => {
    const homeTextElement = document.getElementById("home");
    if (homeTextElement) {
      homeTextElement.innerHTML = "Home";
    }
  };

  const handleHomeClick = () => {
    updateHomeText();
    setTimesHomeHovered(prev => prev + 1);
  };

  return (
    <header className="px-8 py-6">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-xl font-bold cursor-default">
          about://{mynamefortitle}
        </div>

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <div className="relative w-6 h-6">
              <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white rotate-45 transform -translate-y-1/2"></span>
              <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white -rotate-45 transform -translate-y-1/2"></span>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          )}
        </button>

        <div className="hidden md:flex gap-8 text-sm">
          <a 
            id="home" 
            href="#" 
            className={`hover:${basecolor} transition-colors ${basecolor}`}
            onMouseOver={handleHomeHover}
            onMouseOut={handleHomeLeave}
            onClick={handleHomeClick}
          >
            Home
          </a>
          {navItems.map((item) => (
            <a
              key={item.page}
              href={item.href}
              className={`hover:${basecolor} transition-colors`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 md:hidden">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-8 py-6">
                <div className="text-xl font-bold cursor-default">
                  about://{mynamefortitle}
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex justify-center items-center w-8 h-8"
                  aria-label="Close menu"
                >
                  <div className="relative w-6 h-6">
                    <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white rotate-45 transform -translate-y-1/2"></span>
                    <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white -rotate-45 transform -translate-y-1/2"></span>
                  </div>
                </button>
              </div>

              <div className="flex flex-col items-center justify-center flex-1 space-y-8">
                <a
                  href="#"
                  className={`text-2xl hover:${basecolor} transition-colors ${basecolor}`}
                  onClick={() => {
                    handleHomeClick();
                    setIsMenuOpen(false);
                  }}
                >
                  Home
                </a>
                {navItems.map((item) => (
                  <a
                    key={item.page}
                    href={item.href}
                    className={`text-2xl hover:${basecolor} transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}