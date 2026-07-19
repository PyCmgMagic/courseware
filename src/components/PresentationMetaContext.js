import { createContext } from 'react';

export const PresentationMetaContext = createContext({
  lessonLabel: '',
  sectionLabel: '',
  currentSlide: 0,
  totalSlides: 0,
  // PPT-style cumulative step reveal
  step: 0,
  stepCount: 0,
  registerSteps: () => {}
});
