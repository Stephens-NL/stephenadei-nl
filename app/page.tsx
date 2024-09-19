'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Camera, Database, CheckCircle, XCircle } from 'lucide-react';

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
}

const serviceCards: ServiceCard[] = [
  {
    title: "Private Tutoring",
    description: "Exclusive one-on-one learning experiences tailored to your needs.",
    icon: <ArrowRight className="w-6 h-6" />,
    url: "https://privelessen.stephenadei.nl"
  },
  {
    title: "Photography",
    description: "Capture your special moments with our professional photography services.",
    icon: <Camera className="w-6 h-6" />,
    url: "https://photography.stephenadei.nl"
  },
  {
    title: "Data Consultancy",
    description: "Unlock the power of your data with our expert consultancy services.",
    icon: <Database className="w-6 h-6" />,
    url: "https://data.stephenadei.nl"
  }
];

export default function Home() {
  const [linkStatus, setLinkStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const checkLinkStatus = async () => {
      const status: { [key: string]: boolean } = {};
      for (const card of serviceCards) {
        try {
          const response = await fetch(card.url, { mode: 'no-cors' });
          status[card.url] = true;
        } catch (error) {
          status[card.url] = false;
        }
      }
      setLinkStatus(status);
    };

    checkLinkStatus();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/jpeg/ik-portrait.jpeg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-20"
        />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl sm:text-7xl font-black mb-6 tracking-tighter">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              STEPHEN ADEI
            </span>
            <span className="block text-4xl sm:text-5xl mt-2 text-gray-300">SERVICES</span>
          </h1>
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore our range of services, from personalized tutoring to professional photography and data consultancy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCards.map((card, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full">{card.icon}</div>
                  {linkStatus[card.url] !== undefined && (
                    linkStatus[card.url] ? 
                      <CheckCircle className="w-6 h-6 text-green-500" /> : 
                      <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
                <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
                <p className="text-gray-400 mb-4">{card.description}</p>
                {linkStatus[card.url] ? (
                  <Link href={card.url} className="inline-block bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-4 py-2 rounded transition-all duration-300 hover:from-pink-600 hover:to-indigo-600">
                    Visit Site
                  </Link>
                ) : (
                  <span className="inline-block bg-gray-600 text-gray-300 px-4 py-2 rounded cursor-not-allowed">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}