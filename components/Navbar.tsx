import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Sparkles, User } from 'lucide-react';
import { siteData } from '../siteData';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Map icons to IDs defined in siteData
  const iconMap: Record<string, React.ElementType> = {
    home: Home,
    work: Layers,
    service: Sparkles,
    about: User
  };

  return (
    <nav className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[300px] md:max-w-none flex justify-center pb-safe">
      <div className="flex items-center gap-1 md:gap-2 px-3 py-2 md:py-3 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full shadow-2xl shadow-acid-green/10">
        {siteData.navigation.map((item) => {
          const Icon = iconMap[item.id] || Home;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative group p-3 md:p-3 rounded-full transition-all duration-300 ${
                isActive(item.path) 
                  ? 'bg-zinc-800 text-acid-green' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <Icon size={20} className="w-5 h-5 md:w-5 md:h-5" />
              
              {/* Tooltip */}
              <span className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono pointer-events-none whitespace-nowrap border border-zinc-700">
                {item.label}
              </span>
              
              {/* Active Dot */}
              {isActive(item.path) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-acid-green rounded-full shadow-[0_0_8px_#ccff00]"></span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;