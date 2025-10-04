'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Navigation from '@/components/Navigation';

function NotFoundContent() {
  const searchParams = useSearchParams();
  const truename = searchParams.get('truename');
  
  const queryString = truename ? `?truename=${truename}` : '';
  
  let basecolor = "text-blue-300";
  let mynamefortitle = "dan";
  let myexpression = ":D";
  
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
      />

      <main className="px-8 py-12 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-6xl font-bold mb-6">404</h1>
          <h2 className="text-3xl font-bold mb-8">Page Not Found!</h2>
          <p className="text-xl text-gray-300 mb-8">
            This is not the page you're looking for...
          </p>
          <p className="text-gray-400 mb-8">
            This page either doesn't exist, has a mistyped URL slug, or maybe I forgot to build it! Or it could be that an unknown interdimensional entity has gobbled it up... Sounds right to me!
          </p>
        </div>
      </main>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}