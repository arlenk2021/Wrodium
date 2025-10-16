import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Bot, User } from 'lucide-react';

interface LLMCardProps {
  llm: string;
  prompt: string;
  description?: string;
  className?: string;
}

export const LLMCard: React.FC<LLMCardProps> = ({
  llm,
  prompt,
  description,
  className = ""
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <motion.div
      className={`p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-semibold text-white">{llm}</span>
        </div>
        <motion.button
          className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <Check className="w-3 h-3 text-green-400" />
          ) : (
            <Copy className="w-3 h-3 text-white/60" />
          )}
        </motion.button>
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs text-white/70 mb-3 leading-relaxed">
          {description}
        </p>
      )}

      {/* Prompt */}
      <div className="relative">
        <div className="flex items-start gap-2 mb-2">
          <User className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-white/80 font-mono leading-relaxed">
            {prompt}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
