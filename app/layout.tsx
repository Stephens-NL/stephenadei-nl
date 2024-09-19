import Head from 'next/head';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface AppProps {
  children: ReactNode;
}

function RootLayout({ children }: AppProps) {
  return (
    <>
      <Head>
        {/* Page Title */}
        <title>Stephen Adei - Mathematician, Photographer, Musician, and Programmer</title>

        {/* Meta Description */}
        <meta name="description" content="Stephen Adei offers services in private tutoring, photography, programming, and data consultancy. Based in Amsterdam, Stephen is a versatile professional excelling in creative and analytical fields." />
        
        {/* Keywords for SEO */}
        <meta name="keywords" content="Stephen Adei, private tutor, mathematics, photography, data consultancy, music production, Amsterdam, Python, LaTeX" />

        {/* Favicon */}
        <link rel="icon" href="/metadata_images/favicon_32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/metadata_images/favicon_16.png" sizes="16x16" type="image/png" />

        {/* Apple Touch Icon for iOS */}
        <link rel="apple-touch-icon" href="/metadata_images/apple_touch_icon.png" sizes="180x180" />

        {/* Open Graph Meta Tags for Facebook/LinkedIn */}
        <meta property="og:title" content="Stephen Adei - Mathematician, Photographer, Musician, and Programmer" />
        <meta property="og:description" content="Discover Stephen Adei's services in private tutoring, photography, programming, and data consultancy. Based in Amsterdam, Stephen is an expert in both creative and analytical fields." />
        <meta property="og:image" content="/metadata_images/facebook_linkedin.png" />
        <meta property="og:url" content="https://stephenadei.nl" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card for Twitter Previews */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stephen Adei - Mathematician, Photographer, Musician, and Programmer" />
        <meta name="twitter:description" content="Explore the services of Stephen Adei, offering private lessons, photography, programming, and data consultancy in Amsterdam." />
        <meta name="twitter:image" content="/metadata_images/twitter.png" />

        {/* Icons for Messaging Platforms (e.g., WhatsApp) */}
        <link rel="apple-touch-icon" href="/metadata_images/whatsapp_imessage.png" />

        {/* General Open Graph Fallback Image */}
        <meta property="og:image" content="/metadata_images/open_graph_fallback.png" />

      </Head>

      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </>
  );
}

export default RootLayout;