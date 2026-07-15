import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Home, Maximize2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export const Presentation = ({ slides, onGoHome }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const isEditing = target instanceof HTMLElement && (
        target.matches('input, textarea, select, button, [contenteditable="true"]')
      );

      if (isEditing || e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 60) return;
    if (deltaX < 0) nextSlide();
    else prevSlide();
  };

  return (
    <main
      className="presentation-shell"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="presentation-progress"
        style={{ transform: `scaleX(${(currentSlide + 1) / slides.length})` }}
        aria-hidden="true"
      />
      <AnimatePresence mode="wait">
        {slides.map((SlideComponent, index) => (
          index === currentSlide && (
            <SlideComponent key={index} isActive={true} />
          )
        ))}
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="nav-controls">
        <button 
          onClick={onGoHome}
          className="glass-panel"
          style={{ padding: '0.75rem', cursor: 'pointer', border: 'none', color: 'var(--text-primary)' }}
          title="返回课程首页"
          aria-label="返回课程首页"
        >
          <Home size={24} />
        </button>
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="glass-panel"
          style={{ padding: '0.75rem', cursor: currentSlide === 0 ? 'not-allowed' : 'pointer', border: 'none', color: 'var(--text-primary)', opacity: currentSlide === 0 ? 0.5 : 1 }}
          title="上一页（← / PageUp）"
          aria-label="上一页"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="glass-panel" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', color: 'var(--text-primary)' }}>
          {currentSlide + 1} / {slides.length}
        </span>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="glass-panel"
          style={{ padding: '0.75rem', cursor: currentSlide === slides.length - 1 ? 'not-allowed' : 'pointer', border: 'none', color: 'var(--text-primary)', opacity: currentSlide === slides.length - 1 ? 0.5 : 1 }}
          title="下一页（→ / 空格 / PageDown）"
          aria-label="下一页"
        >
          <ChevronRight size={24} />
        </button>
        <button
          onClick={toggleFullscreen}
          className="glass-panel"
          style={{ padding: '0.75rem', cursor: 'pointer', border: 'none', color: 'var(--text-primary)' }}
          title="全屏（F）"
          aria-label="切换全屏"
        >
          <Maximize2 size={24} />
        </button>
      </div>
    </main>
  );
};
