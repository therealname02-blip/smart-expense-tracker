import { useEffect } from 'react';

export function useCursorWords(textRef) {
  useEffect(() => {
    const text = textRef.current;
    if (!text || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const words = text.querySelectorAll('[data-cursor-word]');
    const resetWords = () => {
      words.forEach((word) => word.style.setProperty('--word-opacity', '1'));
    };

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch') return;

      words.forEach((word) => {
        const bounds = word.getBoundingClientRect();
        const dx = event.clientX - (bounds.left + bounds.width / 2);
        const dy = event.clientY - (bounds.top + bounds.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - distance / 145);
        word.style.setProperty('--word-opacity', String(1 - proximity * 0.96));
      });
    };

    text.addEventListener('pointermove', handlePointerMove);
    text.addEventListener('pointerleave', resetWords);

    return () => {
      text.removeEventListener('pointermove', handlePointerMove);
      text.removeEventListener('pointerleave', resetWords);
      resetWords();
    };
  }, [textRef]);
}
