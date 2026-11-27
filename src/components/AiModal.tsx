import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, Copy, Check } from 'lucide-react';
import { Button } from './Button';

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (input: string) => Promise<string>;
  placeholder: string;
  submitButtonText: string;
  initialInput?: string;
  suggestions?: string[];
}

export const AiModal: React.FC<AiModalProps> = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  placeholder,
  submitButtonText,
  initialInput = '',
  suggestions = [],
}) => {
  const [input, setInput] = useState(initialInput);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setInput(initialInput);
    setResult('');
    if (initialInput.trim()) {
      void runQuery(initialInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialInput]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const runQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsLoading(true);
    setResult('');

    try {
      const response = await onSubmit(queryText);
      setResult(response);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to get AI response.';
      setResult(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    void runQuery(input);
  };

  const handleClose = () => {
    setInput('');
    setResult('');
    setIsLoading(false);
    setCopied(false);
    onClose();
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-up"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-modal-title"
    >
      <div
        className="relative bg-indigo-950/95 border border-white/20 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_25px_70px_rgba(0,0,0,0.75)] max-w-2xl w-full max-h-[88vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient top glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-white/15 flex justify-between items-center bg-indigo-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-300/30 text-cyan-200">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 id="ai-modal-title" className="text-lg font-bold text-white leading-tight">
                {title}
              </h2>
              <p className="text-xs text-indigo-200/75">Powered by Gemini AI with smart offline fallback</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-indigo-200/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          <div className="space-y-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              autoFocus
              className="w-full px-4 py-3.5 bg-zinc-950/90 text-white placeholder:text-zinc-500 border border-zinc-700/80 rounded-xl font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
            />

            {suggestions.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-500">Try:</span>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setInput(s);
                      void runQuery(s);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 text-xs text-zinc-300 hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading || !input.trim()}
            className="w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                {submitButtonText}
              </>
            )}
          </Button>

          {result && (
            <div className="rounded-2xl bg-zinc-950/80 border border-purple-500/30 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-purple-400 text-sm font-bold flex items-center gap-2">
                  <Sparkles size={15} />
                  AI Response
                </h3>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
