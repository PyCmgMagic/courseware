import { createContext } from 'react';

export const PresentationMetaContext = createContext({
  lessonLabel: '',
  sectionLabel: '',
  currentSlide: 0,
  totalSlides: 0
});
