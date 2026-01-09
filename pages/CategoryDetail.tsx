
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, X, ZoomIn } from 'lucide-react';
import { siteData } from '../siteData';
import { ProjectCategory } from '../types';

const CategoryDetail: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categoryDef = siteData.projectsPage.categories.find(c => c.id === category);
  
  // Logic to determine view mode
  const isGalleryMode = category === ProjectCategory.CAMPAIGN || category === ProjectCategory.ILLUSTRATION;
  
  // Get content based on category
  const projects = siteData.projects.filter(p => p.category === category);
  
  // Gallery Images (Mock data or specific lists from siteData)
  const galleryImages = category === ProjectCategory.CAMPAIGN 
    ? siteData.projectsPage.campaignImages 
    : siteData.projectsPage.illustrationImages;

  // Handle ESC for Lightbox OR Back Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          navigate('/projects');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigate]);

  if (!categoryDef) return <div className="text-center pt-40 text-zinc-500">Category not found</div>;

  return (
    <div className="min-h-screen bg-zinc-950 pb-32">
      
      {/* Header Section - Updated padding to align with main Projects page */}
      <div className="relative w-full pt-24 pb-12 md:pt-32 md:pb-16 mb-12 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
           <img 
             src={categoryDef.coverImage} 
             alt={categoryDef.title} 
             className="w-full h-full object-cover opacity-60"
           />
           {/* Gradient Overlays for readability */}
           <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30"></div>
           <div className="absolute inset-0 bg-zinc-950/20 mix-blend-multiply"></div>
        </div>

        {/* Header Content - Aligned to max-w-7xl */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6">
            <Link to="/projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 font-mono text-[10px] uppercase tracking-widest bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-zinc-800/50">
                <ArrowLeft size={12} /> {siteData.caseStudy.backText}
            </Link>
            
            {/* Title - Matched with Projects.tsx */}
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-acid-green from-0% via-white via-20% to-white mb-6 drop-shadow-xl">
                {categoryDef.title}
            </h1>

            {/* Subtitle - Matched with Projects.tsx */}
            <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-acid-green"></div>
                <p className="text-zinc-300 font-mono text-sm md:text-base tracking-wide drop-shadow-md">
                  {categoryDef.subtitle}
                </p>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* MODE 1: PROJECT LIST (Branding / Logo) */}
        {!isGalleryMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Link 
                key={project.id} 
                to={`/project/${project.id}`}
                className="group block bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-acid-green/50 transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-white">
                     {project.mockImageCount}+ IMAGES
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-acid-green transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-xs font-mono">{project.client} • {project.year}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* MODE 2: GALLERY (Campaign / Illustration) */}
        {isGalleryMode && galleryImages && (
          <div className={`grid gap-4 ${category === ProjectCategory.CAMPAIGN ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`
                  relative group cursor-pointer border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900
                  ${category === ProjectCategory.CAMPAIGN ? 'aspect-[9/16]' : 'aspect-[3/4]'}
                `}
              >
                <img 
                  src={img} 
                  alt={`${categoryDef.title} ${idx}`} 
                  className={`
                    w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300
                    ${category === ProjectCategory.CAMPAIGN ? 'object-top' : 'object-center'}
                  `} 
                />
                
                {/* Zoom Hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="bg-black/60 backdrop-blur-sm p-3 rounded-full text-white">
                     <ZoomIn size={24} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal for Gallery Mode */}
      {selectedImage && (
         <div 
           className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-md animate-fadeIn ${
             category === ProjectCategory.CAMPAIGN 
               ? 'overflow-y-auto block' 
               : 'flex items-center justify-center p-4'
           }`}
           onClick={() => setSelectedImage(null)}
         >
           <button 
             className="fixed top-4 right-4 md:top-8 md:right-8 p-3 bg-zinc-900 rounded-full text-white border border-zinc-700 hover:bg-zinc-800 hover:border-acid-green transition-all z-[110] flex items-center gap-2"
           >
             <span className="hidden md:inline font-mono text-xs text-zinc-400">{siteData.caseStudy.escText}</span>
             <X size={24} />
           </button>
           
           {category === ProjectCategory.CAMPAIGN ? (
             // Campaign Mode: Full width/height scrolling for long images
             <div className="w-full min-h-screen py-10 md:py-20 px-4 flex justify-center cursor-zoom-out">
               <img 
                 src={selectedImage} 
                 alt="Full View" 
                 className="w-full max-w-2xl h-auto shadow-2xl cursor-default"
                 onClick={(e) => e.stopPropagation()} 
               />
             </div>
           ) : (
             // Standard Mode: Fit to screen
             <img 
               src={selectedImage} 
               alt="Full View" 
               className="max-w-full max-h-screen object-contain shadow-2xl"
               onClick={(e) => e.stopPropagation()} 
             />
           )}
         </div>
       )}
    </div>
  );
};

export default CategoryDetail;
