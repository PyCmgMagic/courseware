import { motion } from 'framer-motion';

export const Slide = ({ children, className = '', isActive = true }) => {
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

export const SlideTitle = ({ children }) => (
  <motion.h2 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    style={{ fontSize: 'var(--slide-title-size)', fontWeight: 800, margin: '0 0 var(--element-gap) 0', textAlign: 'center', letterSpacing: '-0.02em', flexShrink: 0 }} 
    className="text-gradient"
  >
    {children}
  </motion.h2>
);

export const SlideContent = ({ children, className = '' }) => (
  <div style={{ flex: 1, minHeight: 0, maxHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflow: 'hidden' }} className={`slide-content ${className}`}>
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxHeight: '100%', alignItems: 'center', justifyContent: 'center', margin: 'auto 0', padding: 'var(--element-gap) 0', flexShrink: 1 }}>
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
