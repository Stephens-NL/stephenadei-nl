import { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'Stephen Adei - Mathematician, Photographer, Musician, and Programmer',
  description: 'Stephen Adei offers services in private tutoring, photography, programming, and data consultancy. Based in Amsterdam, Stephen is a versatile professional excelling in creative and analytical fields.',
  keywords: 'Stephen Adei, private tutor, mathematics, photography, data consultancy, music production, Amsterdam, Python, LaTeX',
  openGraph: {
    title: 'Stephen Adei - Versatile Professional Services',
    description: 'Discover Stephen Adei\'s services in private tutoring, photography, programming, and data consultancy. Based in Amsterdam, Stephen is an expert in both creative and analytical fields.',
    url: 'https://stephenadei.nl',
    siteName: 'Stephen Adei',
    images: [
      {
        url: 'https://stephenadei.nl/images/jpg/banner2.jpg',
        width: 1200,
        height: 630,
        alt: 'Stephen Adei - Professional Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stephen Adei - Mathematician, Photographer, Musician, and Programmer',
    description: 'Explore the services of Stephen Adei, offering private lessons, photography, programming, and data consultancy in Amsterdam.',
    images: ['https://stephenadei.nl/images/jpg/banner.jpg'],
    creator: '@stephenadei',
  },
  other: {
    'msapplication-TileColor': '#2b5797',
    'theme-color': '#ffffff',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}