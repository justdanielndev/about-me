'use client';

import { useState, useEffect } from 'react';

interface GlitchTextProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  href?: string;
  className?: string;
}

const fonts = [
  'monospace',
  'sans-serif',
  'serif',
  'cursive',
  'fantasy',
  'Courier New',
  'Times New Roman',
  'Arial Black',
  'Impact',
  'Comic Sans MS',
  'Verdana',
  'Georgia',
  'Trebuchet MS',
  'Lucida Console'
];

const colors = [
  '#fca5a5', // red-300
  '#fdba74', // orange-300
  '#fde047', // yellow-300
  '#86efac', // green-300
  '#93c5fd', // blue-300
  '#a5b4fc', // indigo-300
  '#d8b4fe', // purple-300
  '#f9a8d4', // pink-300
  '#cbd5e1', // slate-300
];

export default function GlitchText({ text, href, className = '', ...props }: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!isHovered) {
      setStyle({});
      return;
    }

    let count = 0;
    const interval = setInterval(() => {
      if (count >= 4) {
        clearInterval(interval);
        setStyle({});
        return;
      }

      setStyle({
        fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      count++;
    }, 150);

    return () => {
      clearInterval(interval);
      setStyle({});
    };
  }, [isHovered]);

  const containerProps = {
    className: `${className} inline-block`,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    ...props
  };

  const content = (
    <span className="transition-none inline-block" style={style}>
      {text}
    </span>
  );

  if (href) {
    return (
      <a href={href} {...containerProps}>
        {content}
      </a>
    );
  }

  return (
    <div {...containerProps} className={`${className} cursor-default inline-block`}>
      {content}
    </div>
  );
}
