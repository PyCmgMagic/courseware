import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Home, Maximize2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { PresentationMetaContext } from './PresentationMetaContext';

export const Presentation = ({ slides, onGoHome, lessonLabel = '', stages = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [step, setStep] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const touchStartX = useRef(null);
  // 'start' = enter next slide with steps hidden; 'end' = enter previous slide fully revealed
  const pendingEntry = useRef('start');

  // Slides register their step count on mount (Slide registers 0 by default,
  // page components override via useSlideSteps; child effects run first).
  const registerSteps = useCallback((count) => {
    setStepCount(count);
    setStep(pendingEntry.current === 'end' ? count : 0);
  }, []);

  const goToSlide = useCallback((index, entry = 'start') => {
    pendingEntry.current = entry;
    setCurrentSlide(Math.max(0, Math.min(index, slides.length - 1)));
  }, [slides.length]);

  // PPT-style advance: reveal next step first, then turn the page.
  const advance = useCallback(() => {
    if (step < stepCount) {
      setStep((s) => s + 1);
    } else if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1, 'start');
    }
  }, [step, stepCount, currentSlide, slides.length, goToSlide]);

  // Reverse: hide the latest step first, then go back (previous page fully shown).
  const retreat = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1);
    } else if (currentSlide > 0) {
      goToSlide(currentSlide - 1, 'end');
    }
  }, [step, currentSlide, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const isEditing = target instanceof HTMLElement && (
        target.matches('input, textarea, select, [contenteditable="true"]')
      );
      const isButtonFocused = target instanceof HTMLElement && target.matches('button, a[href]');

      if (isEditing || e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;

      // Space/Enter should activate a focused control, not unexpectedly change slides.
      if ((e.key === ' ' || e.key === 'Enter') && isButtonFocused) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        advance();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        retreat();
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
  }, [advance, retreat]);

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
    if (deltaX < 0) advance();
    else retreat();
  };

  // Clicking slide background behaves like pressing → (reveal step, then turn page).
  // Interactive areas (buttons, inputs, game panels marked data-no-advance) are excluded.
  const handleBackgroundClick = (e) => {
    if (e.button !== 0) return;
    if (e.target.closest('button, a, input, select, textarea, [contenteditable="true"], [data-no-advance]')) return;
    advance();
  };

  const sectionLabel = [...stages]
    .reverse()
    .find((stage) => currentSlide >= stage.from)?.label || '';

  return (
    <main
      className="presentation-shell"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleBackgroundClick}
    >
      <div
        className="presentation-progress"
        style={{ transform: `scaleX(${(currentSlide + 1) / slides.length})` }}
        aria-hidden="true"
      />
      <PresentationMetaContext.Provider value={{ lessonLabel, sectionLabel, currentSlide, totalSlides: slides.length, step, stepCount, registerSteps }}>
        <AnimatePresence mode="wait">
          {slides.map((SlideComponent, index) => (
            index === currentSlide && (
              <SlideComponent key={index} isActive={true} />
            )
          ))}
        </AnimatePresence>
      </PresentationMetaContext.Provider>

      {/* Stages Timeline Breadcrumbs */}
      {stages && stages.length > 0 && (
        <div className="stages-timeline" style={{ pointerEvents: 'auto' }}>
          {stages.map((stage, idx) => {
            const isActive = currentSlide >= stage.from && (idx === stages.length - 1 || currentSlide < stages[idx + 1].from);
            const isCompleted = currentSlide >= (stages[idx + 1]?.from || slides.length);
            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                <button 
                  className={`timeline-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => goToSlide(stage.from, 'start')}
                  title={`跳转到 ${stage.label}`}
                >
                  <span className="timeline-dot" />
                  <span className="timeline-label">{stage.label}</span>
                </button>
                {idx < stages.length - 1 && <span className="timeline-connector" />}
              </div>
            );
          })}
        </div>
      )}

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
          onClick={retreat}
          disabled={currentSlide === 0 && step === 0}
          className="glass-panel"
          style={{ padding: '0.75rem', cursor: (currentSlide === 0 && step === 0) ? 'not-allowed' : 'pointer', border: 'none', color: 'var(--text-primary)', opacity: (currentSlide === 0 && step === 0) ? 0.5 : 1 }}
          title="上一步（← / PageUp）"
          aria-label="上一步"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="glass-panel" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.55rem', color: 'var(--text-primary)' }}>
          {currentSlide + 1} / {slides.length}
          {stepCount > 0 && (
            <span
              className="step-dots"
              title={`本页分步进度 ${Math.min(step, stepCount)} / ${stepCount}`}
              aria-label={`本页共 ${stepCount} 步，已展示 ${Math.min(step, stepCount)} 步`}
            >
              {Array.from({ length: stepCount }, (_, i) => (
                <span key={i} className={`step-dot ${i < step ? 'revealed' : ''}`} />
              ))}
            </span>
          )}
        </span>
        <button 
          onClick={advance}
          disabled={currentSlide === slides.length - 1 && step >= stepCount}
          className="glass-panel"
          style={{ padding: '0.75rem', cursor: (currentSlide === slides.length - 1 && step >= stepCount) ? 'not-allowed' : 'pointer', border: 'none', color: 'var(--text-primary)', opacity: (currentSlide === slides.length - 1 && step >= stepCount) ? 0.5 : 1 }}
          title={step < stepCount ? '下一步（→ / 空格 / 点击空白）' : '下一页（→ / 空格 / 点击空白）'}
          aria-label="下一步"
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
