import React from 'react';
import { Mail, Linkedin, Music, Camera, Calendar, Phone } from 'lucide-react';

const EnhancedContactSection = () => {
  const contactLinks = [
    {
      href: 'mailto:info@stephenadei.nl',
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      bgColor: 'bg-blue-600'
    },
    {
      href: 'https://wa.me/31647357426',
      icon: <Phone className="w-5 h-5" />,
      label: 'WhatsApp',
      bgColor: 'bg-green-500'
    },
    {
      href: 'https://www.linkedin.com/in/stephen-adei/',
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      bgColor: 'bg-blue-600'
    }
  ];

  const socialLinks = [
    {
      href: 'https://www.instagram.com/callhimdavinci.als/',
      icon: <Music className="w-5 h-5" />,
      label: 'Music Production',
    },
    {
      href: 'https://www.instagram.com/callhimdavinci.jpg/',
      icon: <Camera className="w-5 h-5" />,
      label: 'Photography',
    },
    {
      href: 'https://www.instagram.com/stephensevents/',
      icon: <Calendar className="w-5 h-5" />,
      label: 'Event Management',
    }
  ];

  return (
    <div className="mt-16 px-4">
      <h2 className="text-4xl font-semibold mb-6 text-center text-emerald-100">Contact</h2>
      
      <div className="max-w-3xl mx-auto bg-emerald-800 bg-opacity-70 backdrop-blur-sm rounded-lg p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-emerald-100 mb-2">Stephen Adei, BSc</h3>
          <p className="text-lg text-emerald-100">Academic Teacher • Data Scientist • Creative Professional</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${link.bgColor} hover:bg-yellow-400 hover:text-blue-900 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 group`}
            >
              {React.cloneElement(link.icon, {
                className: `w-5 h-5 transition-colors duration-300 group-hover:text-blue-900 ${link.icon.props.className}`
              })}
              <span className="font-medium">{link.label}</span>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="bg-emerald-600 hover:bg-yellow-400 hover:text-blue-900 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 group"
            >
              {React.cloneElement(link.icon, {
                className: `w-5 h-5 transition-colors duration-300 group-hover:text-blue-900 ${link.icon.props.className}`
              })}
              <span className="font-medium">{link.label}</span>
            </a>
          ))}
        </div>
        
        <div className="mt-8 text-center text-emerald-100 text-sm">
          <p>Available for both creative and non-creative workshops and training.</p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedContactSection;