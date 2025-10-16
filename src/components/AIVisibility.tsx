import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Search, MessageSquare, HelpCircle, Sparkles, ExternalLink } from 'lucide-react';
import { aiVisibility } from '../data/mock';
import { LLMCard } from './LLMCard';

interface AIVisibilityProps {}

const AIVisibility: React.FC<AIVisibilityProps> = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState<string | null>(null);
  const data = aiVisibility;

  return (
    <motion.div
      id="ai-visibility"
      className="glass-card p-6 hover:shadow-2xl hover:shadow-purple-400/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-cyan-600 rounded-xl flex items-center justify-center">
          <Eye className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">AI Visibility</h2>
          <p className="text-sm text-white/80">Search Intent & AI Response Analysis</p>
        </div>
      </div>

      {/* Search Intents Overview */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
          <Search className="w-4 h-4 mr-2" />
          Search Intents Analysis
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {data.intents.map((intent, index) => (
            <motion.div
              key={index}
              className="p-3 bg-white/5 rounded-lg border border-white/10 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-xs text-white/60 mb-1">{intent.intent}</div>
              <div className="text-lg font-bold text-cyan-400">{intent.volumeIndex}</div>
              <div className="text-xs text-white/50">Volume</div>
              <div className="text-xs text-yellow-400 mt-1">Diff: {intent.difficultyIndex}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* LLM Cards */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          AI Platform Responses
        </h3>
        <div className="space-y-4">
          {data.promptsByLLM.map((item, index) => (
            <LLMCard
              key={index}
              llm={item.llm}
              prompt={item.prompt}
              className="animate-pulse"
            />
          ))}
        </div>
      </motion.div>

      {/* Consumer Prompts */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Suggested Consumer Prompts
        </h3>
        <div className="space-y-2">
          {data.suggestedPromptsForConsumers.map((prompt, index) => (
            <motion.div
              key={index}
              className="p-2 bg-white/5 rounded-lg border border-white/10 text-sm text-white/80"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              "{prompt}"
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Buttons & Help */}
      <motion.div
        className="mt-6 pt-4 border-t border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-purple-400 to-cyan-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-purple-400/25 transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDemoModal(true)}
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Demo</span>
            </motion.button>

            <motion.button
              className="px-4 py-2 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>See Sample Report</span>
            </motion.button>
          </div>

          <div className="relative">
            <motion.button
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setShowHelpTooltip('ai-help')}
              onMouseLeave={() => setShowHelpTooltip(null)}
            >
              <HelpCircle className="w-4 h-4 text-white/60" />
            </motion.button>

            {showHelpTooltip === 'ai-help' && (
              <motion.div
                className="absolute bottom-full right-0 mb-2 p-3 bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg border border-white/20 max-w-xs z-20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative">
                  <p className="text-white/90">AI Visibility analyzes how your content appears across different AI platforms and suggests optimization strategies for better AI discoverability.</p>
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-l-black/80 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Demo Modal */}
      {showDemoModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowDemoModal(false)}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Request a Demo</h3>
            <p className="text-white/80 mb-6">See how Wrodium optimizes your content for AI platforms like ChatGPT, Claude, and Gemini.</p>
            <div className="flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors">
                Schedule Demo
              </button>
              <button
                className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors"
                onClick={() => setShowDemoModal(false)}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AIVisibility;
