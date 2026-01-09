
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import StatsDashboard from '../components/StatsDashboard';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { siteData } from '../siteData';

const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = siteData.projects.find(p => p.id === id);
  const labels = siteData.caseStudy;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Handle ESC key to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // If we have a category, go back to that category listing
        if (project?.category) {
            navigate(`/projects/${project.category}`);
        } else {
            navigate('/projects');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, project]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!project) return <div className="text-white pt-40 text-center">{labels.notFound}</div>;

  return (
    <div className="bg-zinc-950 min-h-screen pb-32">
      {/* Header Section - Updated padding to align with main Projects page */}
      <div className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 mb-12 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src={project.coverImage} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-60" 
          />
          {/* Gradient Overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30"></div>
          <div className="absolute inset-0 bg-zinc-950/20 mix-blend-multiply"></div>
        </div>
        
        {/* Content Container - Aligned to max-w-7xl */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6">
            {/* Navigation Back */}
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 font-mono text-[10px] uppercase tracking-widest bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-zinc-800/50 group"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> 
              <span>{labels.backText}</span>
              <span className="hidden md:inline border-l border-zinc-700 pl-2 ml-1 text-zinc-500">{labels.escText}</span>
            </button>

            {/* Category Label */}
            <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-acid-green text-black font-bold font-mono text-[10px] md:text-xs uppercase tracking-widest">
                    {project.category}
                </span>
            </div>

            {/* Title - Matched with Projects.tsx */}
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-acid-green from-0% via-white via-20% to-white mb-6 drop-shadow-xl leading-[0.95]">
                {project.title}
            </h1>

            {/* Metadata - Matched Subtitle Style */}
            <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-acid-green"></div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-zinc-300 font-mono text-sm md:text-base tracking-wide drop-shadow-md">
                    <span>{project.client}</span>
                    <span className="hidden md:block w-1 h-1 bg-zinc-600 rounded-full"></span>
                    <span className="text-acid-green/80">{project.year}</span>
                </div>
            </div>
        </div>
      </div>

      {/* Overview */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-0 md:py-8 mb-12 md:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 border-b border-zinc-900 pb-12 md:pb-16">
          <div className="md:col-span-1">
             <h4 className="text-zinc-500 font-mono text-sm mb-4 uppercase tracking-widest">{labels.challengeLabel}</h4>
             <div className="flex flex-wrap gap-2">
               {project.tags.map(tag => (
                 <span key={tag} className="text-[10px] font-mono text-acid-green border border-acid-green/30 px-2 py-0.5 rounded-sm bg-acid-green/5">{tag}</span>
               ))}
             </div>
          </div>
          <div className="md:col-span-3">
             <p className="text-lg md:text-2xl font-light text-zinc-200 leading-relaxed max-w-4xl">
               {project.summary}
             </p>
          </div>
        </div>
      </div>

      {/* Content Builder */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-16 md:space-y-24">
        {project.blocks.map((block, index) => {
          switch (block.type) {
            case 'text':
              return (
                <div key={index} className="max-w-2xl mx-auto">
                  <p className="text-base md:text-lg text-zinc-400 leading-relaxed border-l-2 border-acid-green pl-4 md:pl-6">
                    {block.content}
                  </p>
                </div>
              );
            case 'image':
              return (
                <div key={index} className="rounded-2xl overflow-hidden border border-zinc-800">
                  <img src={block.src} alt={block.alt} className="w-full h-auto" />
                  {block.alt && <p className="text-zinc-600 text-xs font-mono mt-2 text-center px-4">{block.alt}</p>}
                </div>
              );
            case 'stats':
              if (block.statsData && block.chartData) {
                return (
                  <StatsDashboard key={index} stats={block.statsData} chartData={block.chartData} />
                );
              }
              return null;
            case 'gallery':
              return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {block.galleryImages?.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-zinc-800">
                      <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              );
            default:
              return null;
          }
        })}

        {/* MOCK IMAGE GENERATOR */}
        {project.mockImageCount && (
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Project Assets</h3>
                    <span className="text-[10px] font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded">{project.mockImageCount} ITEMS</span>
                </div>
                <div className="grid grid-cols-1 gap-8">
                    {Array.from({ length: project.mockImageCount }).map((_, i) => (
                        <div key={`mock-${i}`} className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                             <img 
                                src={`https://picsum.photos/seed/${project.id}-${i}/1200/800`} 
                                alt={`Asset ${i + 1}`} 
                                className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
                                loading="lazy"
                             />
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>

      {/* Footer - Scroll to Top */}
      <div className="mt-24 md:mt-32 border-t border-zinc-900 pt-12 md:pt-16 flex flex-col items-center justify-center">
        <button 
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-4 text-zinc-500 hover:text-white transition-colors"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-acid-green transition-all duration-300">
            <ArrowUp size={20} className="group-hover:text-acid-green group-hover:-translate-y-1 transition-transform md:w-6 md:h-6" />
          </div>
          <span className="font-mono text-xs tracking-widest uppercase">{labels.backToTop}</span>
        </button>
      </div>
    </div>
  );
};

export default CaseStudy;
