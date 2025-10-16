import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Shuffle, FileText, HelpCircle, Sparkles, ExternalLink } from 'lucide-react';
import { promptRestructuring } from '../data/mock';

interface PromptRestructuringProps {}

const PromptRestructuring: React.FC<PromptRestructuringProps> = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState<string | null>(null);
  const data = promptRestructuring;

  return (
    <motion.div
      id="prompt-restructuring"
      className="glass-card p-6 hover:shadow-2xl hover:shadow-green-400/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-cyan-600 rounded-xl flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Prompt Restructuring</h2>
          <p className="text-sm text-white/80">Query Optimization & Content Planning</p>
        </div>
      </div>

      {/* User Query & Predicted Rewrites */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-4">
          <div className="text-sm text-white/60 mb-2">Original Query:</div>
          <div className="text-sm font-medium text-white">"{data.userQuery}"</div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Shuffle className="w-4 h-4 text-green-400" />
          <span className="text-sm text-white/60">AI would likely rewrite as:</span>
        </div>

        <div className="space-y-2">
          {data.predictedRewrites.map((rewrite, index) => (
            <div key={index} className="p-4 bg-green-400/10 rounded-lg border border-green-400/20">
              <div className="text-sm font-medium text-green-400">"{rewrite}"</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Context Scaffold */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Context Scaffold
        </h3>
        <div className="space-y-4">
          <div className="p-3 bg-blue-400/10 rounded-lg border border-blue-400/20">
            <div className="text-sm text-blue-400 mb-2">Entities</div>
            <div className="flex flex-wrap gap-1">
              {data.contextScaffold.entities.map((entity, index) => (
                <span key={index} className="px-2 py-1 bg-blue-400/20 text-blue-300 text-xs rounded-full">
                  {entity}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
            <div className="text-sm text-yellow-400 mb-2">Constraints</div>
            <div className="space-y-1">
              {data.contextScaffold.constraints.map((constraint, index) => (
                <div key={index} className="text-sm text-white/80">
                  • {constraint}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-purple-400/10 rounded-lg border border-purple-400/20">
            <div className="text-sm text-purple-400 mb-2">Outline Structure</div>
            <div className="space-y-1">
              {data.contextScaffold.outline.map((item, index) => (
                <div key={index} className="text-sm text-white/80">
                  {index + 1}. {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Buttons & Help */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-green-400 to-cyan-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-green-400/25 transition-all duration-300 flex items-center space-x-2"
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
              <span>See Sample Outline</span>
            </motion.button>
          </div>

          <div className="relative">
            <motion.button
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setShowHelpTooltip('prompt-help')}
              onMouseLeave={() => setShowHelpTooltip(null)}
            >
              <HelpCircle className="w-4 h-4 text-white/60" />
            </motion.button>

            {showHelpTooltip === 'prompt-help' && (
              <motion.div
                className="absolute bottom-full right-0 mb-2 p-3 bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg border border-white/20 max-w-xs z-20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative">
                  <p className="text-white/90">Prompt Restructuring helps optimize your content queries for better AI understanding and generates structured outlines for comprehensive coverage.</p>
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-l-black/80 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

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
            <p className="text-white/80 mb-6">Learn how Wrodium's prompt optimization can improve your content strategy and AI discoverability.</p>
            <div className="flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition-colors">
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

export default PromptRestructuring;
