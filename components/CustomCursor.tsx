import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on devices with fine pointers (mouse)
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);
    }

    const onMouseMove = (e: MouseEvent) => {
      // Direct DOM manipulation for zero-latency performance
      // Using translate3d forces GPU acceleration
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for interactive elements (links, buttons, clickable items)
      const isHover = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('[role="button"]') || 
        target.classList.contains('cursor-pointer');

      // Use body class to handle state globally without React re-renders
      if (isHover) {
        document.body.classList.add('cursor-hover-active');
      } else {
        document.body.classList.remove('cursor-hover-active');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.body.classList.remove('cursor-hover-active');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        /* Ensure default cursor is hidden on desktop */
        @media (hover: hover) and (pointer: fine) {
          body, a, button, [role="button"] { cursor: none !important; }
        }

        .custom-cursor-container {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
          /* Critical: No transition on movement to prevent inertia/lag */
          transition: none;
        }

        .cursor-dot {
          width: 12px;
          height: 12px;
          background-color: #ccff00;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          /* Only transition properties that change on hover, NOT position */
          transition: width 0.2s ease-out, 
                      height 0.2s ease-out,
                      opacity 0.2s,
                      background-color 0.2s;
          mix-blend-mode: difference;
        }

        .cursor-ring {
          width: 40px;
          height: 40px;
          border: 1px solid #ccff00;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          /* Smooth transition for size changes only */
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                      height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-width 0.3s,
                      background-color 0.3s;
          mix-blend-mode: difference;
        }

        /* Hover States controlled by body class */
        body.cursor-hover-active .cursor-dot {
          width: 0;
          height: 0;
          opacity: 0;
        }

        body.cursor-hover-active .cursor-ring {
          width: 80px;
          height: 80px;
          background-color: rgba(204, 255, 0, 0.1);
          border-width: 0;
        }

        .cursor-text {
          font-family: 'Space Grotesk', monospace;
          font-size: 10px;
          font-weight: bold;
          color: #ccff00;
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.2s, transform 0.2s;
        }

        body.cursor-hover-active .cursor-text {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>

      {/* Dot Layer */}
      <div ref={dotRef} className="custom-cursor-container hidden md:block">
        <div className="cursor-dot" />
      </div>

      {/* Ring Layer */}
      <div ref={ringRef} className="custom-cursor-container hidden md:block">
        <div className="cursor-ring">
          <span className="cursor-text">OPEN</span>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;