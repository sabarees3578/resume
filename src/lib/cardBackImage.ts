import { useState, useEffect } from 'react';

const CARD_WIDTH = 1024;
const CARD_HEIGHT = 1440;
const QUOTE_LINES = ['A men with', 'dreams to be', 'a millionaire'];

function renderCardBackDataUrl(): string {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Pure black background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // Clean white 3-line quote in Titan One Regular
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';

  const maxLineWidth = CARD_WIDTH - 140;
  let fontSize = 98;
  ctx.font = `normal 400 ${fontSize}px "Titan One", sans-serif`;

  while (
    fontSize > 48 &&
    QUOTE_LINES.some((line) => ctx.measureText(line).width > maxLineWidth)
  ) {
    fontSize -= 2;
    ctx.font = `normal 400 ${fontSize}px "Titan One", sans-serif`;
  }

  const lineHeight = Math.round(fontSize * 1.32);
  const startY = CARD_HEIGHT * 0.52 - ((QUOTE_LINES.length - 1) * lineHeight) / 2;

  QUOTE_LINES.forEach((line, idx) => {
    ctx.fillText(line, CARD_WIDTH / 2, startY + idx * lineHeight);
  });

  return canvas.toDataURL('image/png');
}

export function useCardBackImage(): string {
  const [dataUrl, setDataUrl] = useState<string>(() => renderCardBackDataUrl());

  useEffect(() => {
    let cancelled = false;

    const loadTitanOne = async () => {
      try {
        if (document.fonts) {
          await document.fonts.load(
            'normal 400 98px "Titan One"',
            QUOTE_LINES.join(' ')
          );
          await document.fonts.ready;
        }
      } catch {
        // Fallback already rendered
      }
      if (!cancelled) {
        setDataUrl(renderCardBackDataUrl());
      }
    };

    void loadTitanOne();

    const handleLoadingDone = () => {
      if (!cancelled) {
        setDataUrl(renderCardBackDataUrl());
      }
    };
    document.fonts?.addEventListener('loadingdone', handleLoadingDone);

    return () => {
      cancelled = true;
      document.fonts?.removeEventListener('loadingdone', handleLoadingDone);
    };
  }, []);

  return dataUrl;
}
