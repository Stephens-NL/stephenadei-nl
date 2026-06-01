'use client';

import Image from 'next/image';
import { useState } from 'react';

interface YouTubeEmbedProps { videoId: string; title: string; }

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (!loaded) {
    return (
      <button onClick={() => setLoaded(true)} className="relative w-full aspect-video rounded-lg overflow-hidden group cursor-pointer" aria-label={`Play: ${title}`}>
        <Image src={thumbnailUrl} alt={title} fill className="object-cover" unoptimized />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" loading="lazy" />
    </div>
  );
}
