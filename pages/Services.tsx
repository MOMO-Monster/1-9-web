
import React, { useState, useEffect } from 'react';
import { siteData } from '../siteData';
import { CapabilityItem } from '../types';
import { X, ArrowUpRight, Maximize2 } from 'lucide-react';

const Services: React.FC = () => {
  // @ts-ignore - headerBgImage added to types implicitly via siteData update
  const { title, description, items, headerBgImage } = siteData.servicesPage;
  const [selectedItem, setSelectedItem] = useState<CapabilityItem | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    if (selectedItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  return (
    <div className="min-h-screen flex flex-col pb-32">
      
      {/* Header Section - Updated padding and height for consistency */}
      <section className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden mb-8 md:mb-12">
         {/* Background Layer */}
        {headerBgImage && (
          <div className="absolute inset-0 z-0">
             <img 
              src={headerBgImage} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30"></div>
            <div className="absolute inset-0 bg-zinc-950/20 mix-blend-multiply"></div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10">
            {/* Title - Acid Gradient */}
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-acid-green from-0% via-white via-20% to-white">
            {title}
            </h1>
            <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-acid-green"></div>
            <p className="text-zinc-300 font-mono text-sm md:text-base tracking-wide drop-shadow-md">
                {description}
            </p>
            </div>
        </div>
      </section>

      {/* Cards Grid */}
      <div className="px-4 md:px-6 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow items-start">
        {items.map((item, index) => (
          <div 
            key={index}
            onClick={() => setSelectedItem(item)}
            className="group relative bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 cursor-pointer hover:border-acid-green/50 hover:bg-zinc-900/80 transition-all duration-300 h-full flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="flex justify-between items-start mb-8">
                <span className="font-mono text-zinc-600 text-xs border border-zinc-800 px-2 py-1 rounded group-hover:text-acid-green group-hover:border-acid-green/30 transition-colors">
                  0{index + 1}
                </span>
                <Maximize2 size={18} className="text-zinc-600 group-hover:text-acid-green transition-colors" />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">
                {item.title}
              </h3>
              
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            {/* Bottom visual hint */}
            <div className="pt-6 border-t border-zinc-800/50 flex items-center text-zinc-600 text-xs font-mono uppercase tracking-widest gap-2 group-hover:text-zinc-300 transition-colors">
              <span>View Structure</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-zinc-950 w-full max-w-6xl max-h-[90vh] md:h-[80vh] rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-sm rounded-full text-zinc-400 hover:text-white border border-zinc-700 hover:border-acid-green transition-all"
            >
              <X size={24} />
            </button>

            {/* Visual Side (Image) */}
            <div className="h-1/2 md:h-full md:w-2/3 relative bg-zinc-900 overflow-hidden">
               <img 
                 src={selectedItem.modalImage} 
                 alt={selectedItem.title} 
                 className="w-full h-full object-cover opacity-90"
               />
               {/* Overlay gradient */}
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:bg-gradient-to-r"></div>
            </div>

            {/* Content Side (Text) */}
            <div className="h-1/2 md:h-full md:w-1/3 p-6 md:p-12 flex flex-col justify-center bg-zinc-950 border-t md:border-t-0 md:border-l border-zinc-800 overflow-y-auto">
              <span className="text-acid-green font-mono text-xs uppercase tracking-widest mb-4">Methodology</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                {selectedItem.title}
              </h2>
              
              <div className="w-8 h-1 bg-zinc-800 mb-8"></div>
              
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                {selectedItem.modalContent}
              </p>

              <div className="mt-12 pt-8 border-t border-zinc-900">
                <p className="text-zinc-600 text-xs font-mono">
                  {siteData.caseStudy.escText} to close
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
