import React, { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './Button';

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (input: string) => Promise<string>;
  placeholder: string;
  submitButtonText: string;
}

export const AiModal: React.FC<AiModalProps> = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  placeholder,
  submitButtonText
}) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setResult('');

    try {
      const response = await onSubmit(input);
      setResult(response);
    } catch (error) {
      setResult('Error: Unable to get AI response. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setInput('');
    setResult('');
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border-2 border-white shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-500 border-b-2 border-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="text-black" size={24} />
            <h2 className="text-xl font-bold text-black">{title}</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-black hover:text-zinc-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 bg-zinc-800 text-white border-2 border-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading || !input.trim()}
            className="w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                {submitButtonText}
              </>
            )}
          </Button>

          {result && (
            <div className="bg-zinc-800 border-2 border-purple-500 p-4 shadow-[4px_4px_0px_0px_rgba(168,85,247,1)]">
              <h3 className="text-purple-500 font-bold mb-2 flex items-center gap-2">
                <Sparkles size={16} />
                AI Response
              </h3>
              <p className="text-white whitespace-pre-wrap">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
