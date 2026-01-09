
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { siteData } from '../siteData';

const Home: React.FC = () => {
  const { hero, marquee, featured } = siteData.home;
  const featuredProjects = siteData.projects.slice(0, 3);

  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const featuredSection = document.getElementById('featured');
    featuredSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pb-32">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* Top Decorative Header - Aligned to Layout Grid */}
        <div className="absolute top-0 left-0 w-full z-20 pointer-events-none pt-6 md:pt-8">
            <div className="max-w-7xl mx-auto px-4 md:px-6 w-full flex justify-between items-start">
                <span className="font-mono text-[10px] md:text-xs text-zinc-500 tracking-widest font-bold">MOMO_MONSTER :)</span>
                <span className="font-mono text-[10px] md:text-xs text-zinc-500 tracking-widest font-bold">2022-2025 &gt;</span>
            </div>
        </div>

        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src={hero.bgImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover object-[75%_center] md:object-right opacity-80 mix-blend-normal transition-all duration-1000 ease-in-out"
          />
          {/* Vignette & Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent md:via-zinc-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </div>

        {/* Background Noise/Grid (Texture Layer) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0 mix-blend-overlay"></div>
        
        {/* Main Content - Wrapped in Container & Grid System */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 z-10 relative h-full flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
                {/* Text Block occupies 7 columns on desktop to leave room for the image on the right */}
                <div className="col-span-1 md:col-span-7 flex flex-col justify-center text-center md:text-left mt-[-5vh] md:mt-0">
                    <h1 className="flex flex-col gap-3 md:gap-6 font-display font-bold uppercase text-white drop-shadow-2xl">
                        <span className="text-2xl md:text-5xl tracking-widest text-zinc-300 font-medium">
                        {hero.titleLine1}
                        </span>
                        
                        <span className="text-5xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-acid-green via-white to-zinc-200">
                        {hero.titleLine2}
                        </span>
                    </h1>
                    
                    <p className="mt-8 text-zinc-400 text-xs md:text-sm font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] mx-auto md:mx-0 drop-shadow-md border-l border-acid-green pl-4 ml-1">
                        {hero.description}
                    </p>

                    <div className="flex justify-center md:justify-start gap-4 pt-16 md:pt-20">
                        <button 
                        onClick={handleScrollDown}
                        className="group flex flex-col items-center gap-3 text-zinc-500 hover:text-acid-green transition-colors"
                        >
                        <span className="text-[10px] font-mono uppercase tracking-widest animate-pulse">{hero.ctaText}</span>
                        <div className="w-px h-16 bg-zinc-800 group-hover:bg-acid-green group-hover:h-24 transition-all duration-500 ease-out"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Showreel Strip */}
      <div className="w-full bg-acid-green overflow-hidden py-2 md:py-3 mb-16 md:mb-24 border-y-4 border-black relative z-10">
        <div className="animate-marquee whitespace-nowrap flex gap-4 md:gap-8 items-center font-display font-black text-2xl md:text-4xl text-black uppercase tracking-widest">
          {marquee.map((item, index) => (
             <React.Fragment key={index}>
               <span>{item}</span> •
             </React.Fragment>
          ))}
        </div>
      </div>

      {/* Featured Work - Consistent Container */}
      <section id="featured" className="max-w-7xl mx-auto px-4 md:px-6 scroll-mt-24">
        {/* Header aligned to grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 md:mb-12 items-end">
          <div className="col-span-1 md:col-span-8">
            <h2 className="text-3xl md:text-5xl font-display font-bold">{featured.title}</h2>
          </div>
          <div className="col-span-1 md:col-span-4 flex md:justify-end">
            <Link to="/projects" className="flex items-center gap-2 text-zinc-400 hover:text-acid-green transition-colors font-mono text-sm md:text-base">
                {featured.viewAllText} <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* 3-Column Grid for projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Link key={project.id} to={`/project/${project.id}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 relative mb-4">
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0" 
                />
              </div>
              <div className="flex justify-between items-center border-t border-zinc-900 pt-3">
                 <h3 className="text-lg md:text-xl font-bold font-display text-white group-hover:text-acid-green transition-colors">
                   {project.title}
                 </h3>
                 <ArrowUpRight size={18} className="text-zinc-600 group-hover:text-acid-green transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
