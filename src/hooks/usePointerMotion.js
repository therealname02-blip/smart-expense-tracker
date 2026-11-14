import { useEffect } from 'react';

export function usePointerMotion(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    let activeArea = null;

    const resetCard = (card) => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    };

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch') return;

      const motionArea = event.target.closest?.('[data-parallax-area]');
      if (activeArea && activeArea !== motionArea) {
        activeArea.querySelectorAll('[data-parallax]').forEach((element) => {
          element.style.setProperty('--move-x', '0px');
          element.style.setProperty('--move-y', '0px');
        });
      }
      activeArea = motionArea;

      const bounds = (motionArea || container).getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      (motionArea || container).querySelectorAll('[data-parallax]').forEach((element) => {
        const distance = Number(element.dataset.parallax) || 0;
        element.style.setProperty('--move-x', `${x * distance}px`);
        element.style.setProperty('--move-y', `${y * distance}px`);
      });

      const card = event.target.closest?.('.interactive-card');
      if (!card || !container.contains(card)) return;

      const cardBounds = card.getBoundingClientRect();
      const cardX = (event.clientX - cardBounds.left) / cardBounds.width - 0.5;
      const cardY = (event.clientY - cardBounds.top) / cardBounds.height - 0.5;
      card.style.setProperty('--tilt-x', `${cardY * -5}deg`);
      card.style.setProperty('--tilt-y', `${cardX * 5}deg`);
    };

    const handlePointerOut = (event) => {
      const card = event.target.closest?.('.interactive-card');
      if (card && !card.contains(event.relatedTarget)) resetCard(card);
    };

    const resetMotion = () => {
      activeArea = null;
      container.querySelectorAll('.interactive-card').forEach(resetCard);
      container.querySelectorAll('[data-parallax]').forEach((element) => {
        element.style.setProperty('--move-x', '0px');
        element.style.setProperty('--move-y', '0px');
      });
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerout', handlePointerOut);
    container.addEventListener('pointerleave', resetMotion);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerout', handlePointerOut);
      container.removeEventListener('pointerleave', resetMotion);
      resetMotion();
    };
  }, [containerRef]);
}
