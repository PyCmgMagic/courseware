import { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PresentationMetaContext } from './PresentationMetaContext';
import { useCurrentStep } from './useSlideSteps';

/**
 * Cumulative reveal block: hidden (space preserved) until step >= n,
 * then fades/slides in once and stays visible — like a PowerPoint build.
 */
export const Step = ({ n = 1, children, className = '', style = {} }) => {
  const step = useCurrentStep();
  const visible = step >= n;

  return (
    <motion.div
      initial={false}
      animate={visible
        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
        : { opacity: 0, y: 16, filter: 'blur(4px)' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{
        ...style,
        visibility: visible ? 'visible' : 'hidden',
        pointerEvents: visible ? 'auto' : 'none'
      }}
      aria-hidden={!visible}
    >
      {children}
    </motion.div>
  );
};

export const Slide = ({ children, className = '', isActive = true }) => {
  const { registerSteps } = useContext(PresentationMetaContext);

  // Default: a slide has no internal steps. Page components that call
  // useSlideSteps(n) run their effect afterwards (parent effects run after
  // child effects) and override this registration.
  useEffect(() => {
    registerSteps(0);
  }, [registerSteps]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Apple-like spring/easing
      style={{
        width: '100vw',
        height: '100vh',
        minHeight: '100dvh',
        maxHeight: '100dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--slide-padding)',
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        left: 0
      }}
      className={`slide ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const SlideTitle = ({ children, eyebrow, qtag }) => {
  const meta = useContext(PresentationMetaContext);
  const stage = eyebrow || meta.sectionLabel;

  return (
  <motion.header
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="slide-heading"
  >
    <div className="slide-kicker">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span className="lesson-label">{meta.lessonLabel}</span>
        {stage && <span className="section-badge">{stage}</span>}
        {qtag && <span className="q-badge">{qtag}</span>}
      </div>
      <span className="slide-number-indicator">{meta.currentSlide + 1} / {meta.totalSlides}</span>
    </div>
    <h2 className="slide-title-text">{children}</h2>
  </motion.header>
  );
};

export const SlideContent = ({ children, className = '' }) => (
  <div className={`slide-content ${className}`}>
    <div className="slide-content-inner">
      {children}
    </div>
  </div>
);

// New Animation Components
export const StaggerContainer = ({ children, className = '', style = {} }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
      initial="hidden"
      animate="show"
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedItem = ({ children, className = '', style = {}, whileHover, whileTap }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
      }}
      whileHover={whileHover}
      whileTap={whileTap}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};
