
import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, Download, X, FileText, AlertCircle } from 'lucide-react';
import { siteData } from '../siteData';

const About: React.FC = () => {
  // @ts-ignore - skillsTitle is optional/removed in data now
  const { hero, experienceTitle, experienceSubtitle, footerText } = siteData.about;
  const experience = siteData.experience;
  
  const [showContact, setShowContact] = useState(false);
  const [showDownloadConfirm, setShowDownloadConfirm] = useState(false);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowContact(false);
        setShowDownloadConfirm(false);
      }
    };

    if (showContact || showDownloadConfirm) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showContact, showDownloadConfirm]);

  // Handle Image Download Execution
  const executeDownload = async () => {
    setShowDownloadConfirm(false); // Close confirm modal
    
    try {
      // Fetch the image to create a blob for downloading
      const response = await fetch(siteData.general.resumeUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "Lillian_Resume.jpg"; // Set default download filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed, opening in new tab", error);
      // Fallback: Just open the URL in a new tab if automatic download fails
      window.open(siteData.general.resumeUrl, '_blank');
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-32 px-4 md:px-6 max-w-7xl mx-auto min-h-screen">
      
      {/* 1. Header Section (Title) - Split into two lines */}
      <div className="mb-12 md:mb-20">
         <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-acid-green from-0% via-white via-20% to-white">
           <span className="block">{hero.titlePrefix}</span>
           <span className="block">{hero.titleHighlight}.</span>
         </h1>
      </div>

      {/* 2. Main Content Grid (Avatar Left + Text Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 md:mb-40 items-center">
        
        {/* Left Column: Circular Avatar */}
        <div className="md:col-span-4 flex justify-start">
           <div className="relative w-64 h-64 md:w-full md:aspect-square rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
              <img 
                src={hero.portraitImage} 
                alt="Portrait" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" 
              />
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] rounded-full"></div>
           </div>
        </div>

        {/* Right Column: Text & Buttons */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-8 md:pl-8">
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-zinc-200 font-light leading-relaxed">
              {hero.introPrimary}
            </p>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
              {hero.introSecondary}
            </p>
            <p className="text-zinc-400 text-sm md:text-base font-mono border-l-2 border-acid-green pl-4">
              <span dangerouslySetInnerHTML={{ __html: hero.introTertiary.replace('Growth', '<strong>Growth</strong>') }} />
            </p>
          </div>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
             <button 
               onClick={() => setShowContact(true)}
               className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-acid-green transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]"
             >
               <Mail size={18} /> {hero.ctaContact}
             </button>
             
             <button 
               onClick={() => setShowDownloadConfirm(true)}
               className="px-8 py-3 border border-zinc-700 text-white rounded-full hover:bg-zinc-900 hover:border-zinc-500 transition-all flex items-center justify-center gap-2"
             >
               <Download size={18} /> {hero.ctaResume}
             </button>
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="w-full">
        <div className="flex flex-row items-baseline gap-4 mb-8 md:mb-16 border-b border-zinc-800 pb-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">{experienceTitle}</h2>
            <span className="text-[10px] md:text-xs font-mono text-zinc-500 tracking-widest">{experienceSubtitle}</span>
        </div>
        
        <div className="space-y-16">
           {experience.map((job, index) => (
             <div key={index} className="relative border-l border-zinc-800 pl-8 group hover:border-acid-green/30 transition-colors">
                {/* Indicator Dot: First one is always neon, others grey/green on hover */}
                <span className={`absolute -left-1.5 top-2 w-3 h-3 rounded-full transition-all duration-300 ${job.active ? 'bg-acid-green shadow-[0_0_10px_#ccff00]' : 'bg-zinc-800 group-hover:bg-acid-green'}`}></span>
                
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                   {/* Role Title: White by default, Green on block hover */}
                   <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-acid-green transition-colors duration-300">
                     {job.role}
                   </h3>
                   
                   {/* Period Text: First item is always green, all others remain grey */}
                   <span className={`text-xs font-mono transition-colors duration-300 ${
                     job.active 
                       ? 'text-acid-green' 
                       : 'text-zinc-500' // Changed: Removed group-hover to keep it grey
                   }`}>
                     {job.period}
                   </span>
                </div>
                
                <p className="text-zinc-500 font-mono text-xs md:text-sm mb-6 uppercase tracking-wider">{job.company}</p>
                
                <div className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-5xl space-y-2 pl-4 md:pl-6">
                    {job.description.split('\n').map((line, i) => (
                        <p 
                          key={i}
                          className={line.trim().startsWith('·') ? 'pl-[1em] -indent-[1em]' : ''}
                        >
                            {line}
                        </p>
                    ))}
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-24 pt-12 md:pt-16 pb-8">
         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-zinc-500 font-mono text-xs text-center md:text-left whitespace-pre-line">
             {footerText}
           </div>
         </div>
      </footer>

      {/* Modals */}
      {showContact && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowContact(false)}
        >
          <div 
            className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl flex flex-col items-center gap-6 max-w-sm w-full relative shadow-[0_0_50px_rgba(204,255,0,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setShowContact(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="w-full aspect-square bg-white p-2 rounded-xl overflow-hidden border-2 border-acid-green/50">
               <img src={hero.contactQr} alt="WeChat QR Code" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">ADD ME ON WECHAT</p>
              <p className="text-2xl font-display font-bold text-white tracking-wider">
                {hero.contactPhone}
              </p>
            </div>
          </div>
        </div>
      )}

      {showDownloadConfirm && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowDownloadConfirm(false)}
        >
          <div 
            className="bg-zinc-950 border border-zinc-800 p-6 md:p-8 rounded-2xl w-full max-w-sm relative shadow-[0_0_50px_rgba(204,255,0,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-3 mb-6">
                <FileText className="text-acid-green" size={24} />
                CONFIRM DOWNLOAD
            </h3>
            <div className="space-y-4 mb-8">
                <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                    <p className="text-zinc-500 text-xs font-mono mb-1">FILENAME</p>
                    <p className="text-white font-mono text-sm break-all">Lillian_Resume.jpg</p>
                </div>
                <div className="flex items-start gap-3">
                    <AlertCircle className="text-zinc-500 mt-0.5 flex-shrink-0" size={16} />
                    <p className="text-zinc-400 text-xs leading-relaxed">
                        This file will be saved to your browser's <span className="text-zinc-200">Default Download Folder</span>.
                    </p>
                </div>
            </div>
            <div className="flex gap-3">
                <button onClick={() => setShowDownloadConfirm(false)} className="flex-1 py-3 border border-zinc-700 text-zinc-300 rounded-full hover:bg-zinc-900 hover:text-white transition-colors font-mono text-xs md:text-sm font-bold">
                    CANCEL
                </button>
                <button onClick={executeDownload} className="flex-1 py-3 bg-acid-green text-black font-bold rounded-full hover:bg-[#b3e600] transition-colors font-mono text-xs md:text-sm shadow-[0_0_20px_rgba(204,255,0,0.2)]">
                    DOWNLOAD
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
