'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import FlagButton from './FlagButton';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: isHome ? '#projects' : '/#projects', label: t('projects') },
    { href: isHome ? '#research' : '/#research', label: t('research') },
    { href: '/creative', label: t('creative') },
    { href: isHome ? '#contact' : '/#contact', label: t('contact') },
  ];

  const switchLocale = (locale: 'en' | 'nl') => {
    const newPath = locale === 'en' ? pathname : `/nl${pathname === '/' ? '' : pathname}`;
    window.location.href = newPath;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-emerald-950/90 backdrop-blur-md border-b border-emerald-800/50' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-emerald-100 hover:text-white transition-colors">
          Stephen Adei
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm text-emerald-200 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
          <FlagButton onSwitch={switchLocale} />
        </div>

        <div className="md:hidden flex items-center gap-3">
          <FlagButton onSwitch={switchLocale} />
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-emerald-200 hover:text-white" aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-emerald-950/95 backdrop-blur-md border-b border-emerald-800/50">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-emerald-200 hover:text-white transition-colors py-2" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
