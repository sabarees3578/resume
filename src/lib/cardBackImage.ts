import { useState, useEffect } from 'react';

const CARD_WIDTH = 768;
const CARD_HEIGHT = 1080;
const QUOTE_LINES = ['A men with', 'dreams to be', 'a millionaire'];

let cachedTitanOneDataUrl: string | null = null;

function renderCardBackDataUrl(): string {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';

  const maxLineWidth = CARD_WIDTH - 110;
  let fontSize = 74;
  ctx.font = `normal 400 ${fontSize}px "Titan One", sans-serif`;

  while (
    fontSize > 36 &&
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

export function useCardBackImage(): string | undefined {
  const [dataUrl, setDataUrl] = useState<string | undefined>(() => cachedTitanOneDataUrl ?? undefined);

  useEffect(() => {
    if (cachedTitanOneDataUrl) return;
    let cancelled = false;

    const loadTitanOne = async () => {
      try {
        if (document.fonts) {
          await document.fonts.load(
            'normal 400 74px "Titan One"',
            QUOTE_LINES.join(' ')
          );
        }
      } catch {
        // Fallback render
      }
      if (!cancelled) {
        const rendered = renderCardBackDataUrl();
        cachedTitanOneDataUrl = rendered;
        setDataUrl(rendered);
      }
    };

    void loadTitanOne();
    return () => {
      cancelled = true;
    };
  }, []);

  return dataUrl;
}
