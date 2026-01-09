import React, { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { siteData } from '../siteData';

const Playground: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { title, description, badgePrefix, closeText } = siteData.playground;

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  // Generate image data with consistent seeds so thumbnails match full versions
  const images = [...Array(8)].map((_, i) => ({
    id: i,
    thumb: `https://picsum.photos/seed/lab${i}/400/400`,
    full: `https://picsum.photos/seed/lab${i}/1600/1600` // Higher res for lightbox
  }));

  return (
    <div className="pt-24 md:pt-32 pb-32 px-4 md:px-6 max-w-7xl mx-auto min-h-screen text-center">
       <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">{title}</h1>
       <p className="text-zinc-500 font-mono mb-12 md:mb-16 text-sm md:text-base">{description}</p>
       
       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((img) => (
             <div 
               key={img.id} 
               onClick={() => setSelectedImage(img.full)}
               className="aspect-square bg-zinc-900 rounded-xl overflow-hidden relative group cursor-pointer border border-zinc-800 hover:border-acid-green/50 transition-colors"
             >
               <img 
                 src={img.thumb} 
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" 
                 alt={`Experiment ${img.id + 1}`} 
               />
               
               {/* Overlay Badge */}
               <div className="absolute top-2 left-2 md:top-4 md:left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="px-2 py-1 bg-acid-green text-black font-bold font-mono text-[10px] md:text-xs rounded-sm">
                   {badgePrefix}0{img.id + 1}
                 </span>
               </div>

               {/* Zoom Icon */}
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-black/50 backdrop-blur p-2 md:p-3 rounded-full text-white">
                    <ZoomIn size={20} className="md:w-6 md:h-6" />
                  </div>
               </div>
             </div>
          ))}
       </div>

       {/* Lightbox Modal */}
       {selectedImage && (
         <div 
           className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-fadeIn"
           onClick={() => setSelectedImage(null)}
         >
           <button 
             onClick={() => setSelectedImage(null)}
             className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-zinc-900 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-800 z-50 flex items-center gap-2 group"
           >
             <span className="hidden md:block text-xs font-mono text-zinc-500 group-hover:text-white mr-1 border-r border-zinc-700 pr-2">{siteData.caseStudy.escText}</span>
             <X size={20} className="md:w-6 md:h-6" />
           </button>
           
           <div className="relative max-w-full max-h-full">
             <img 
               src={selectedImage} 
               alt="Full view" 
               className="max-h-[80vh] md:max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl border border-zinc-800"
               onClick={(e) => e.stopPropagation()} // Prevent close on image click
             />
             <p className="text-center text-zinc-500 font-mono text-xs mt-4">
               {closeText}
             </p>
           </div>
         </div>
       )}
    </div>
  );
};

export default Playground;