
import React from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../siteData';
import { ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
  const { title, subtitle, categories, headerBgImage } = siteData.projectsPage;

  return (
    <div className="bg-zinc-950 min-h-screen">
      
      {/* Header Section - Updated padding and height for consistency */}
      <section className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        
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
          <div className="flex flex-col">
            {/* Title - Acid Gradient */}
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-acid-green from-0% via-white via-20% to-white mb-6">
              {title}
            </h1>
            
            {/* Subtitle */}
            <div className="flex items-center gap-4">
               <div className="h-[2px] w-12 bg-acid-green"></div>
               <p className="text-zinc-300 font-mono text-sm md:text-base tracking-wide drop-shadow-md">
                 {subtitle}
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <div className="px-4 md:px-6 max-w-7xl mx-auto pb-32 relative z-20 mt-8 md:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/projects/${category.id}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800"
            >
              {/* Background Image with Scale Effect */}
              <img 
                src={category.coverImage} 
                alt={category.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" 
              />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <span className="font-mono text-xs text-zinc-300 border border-zinc-600 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm group-hover:border-acid-green group-hover:text-acid-green transition-colors">
                     0{categories.indexOf(category) + 1}
                   </span>
                   <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                     <ArrowUpRight size={20} />
                   </div>
                </div>

                <div>
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 group-hover:text-acid-green transition-colors">
                    {category.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-8 bg-zinc-400 group-hover:w-12 group-hover:bg-acid-green transition-all"></div>
                    <p className="text-zinc-200 font-mono text-sm md:text-base group-hover:text-acid-green transition-colors">
                      {category.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
