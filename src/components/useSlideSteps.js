import { useContext, useEffect } from 'react';
import { PresentationMetaContext } from './PresentationMetaContext';

/**
 * Register how many PPT-style reveal steps the active slide has.
 * Returns the number of steps currently revealed.
 * Call with 0 (or not at all) for plain or fully interactive slides.
 */
export const useSlideSteps = (count) => {
  const { registerSteps, step } = useContext(PresentationMetaContext);
  useEffect(() => {
    registerSteps(count);
  }, [count, registerSteps]);
  return step;
};

/** Current revealed step count, for conditional highlight inside a slide. */
export const useCurrentStep = () => useContext(PresentationMetaContext).step;
