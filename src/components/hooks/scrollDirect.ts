// hooks/useScrollDirection.ts
import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export default function useScrollDirection(): ScrollDirection {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction: ScrollDirection = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && 
          (Math.abs(scrollY - lastScrollY) > 5)) {
        setScrollDirection(direction);
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDirection]);

  return scrollDirection;
}