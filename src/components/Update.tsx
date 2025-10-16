import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle, XCircle, Clock, ExternalLink, HelpCircle, Sparkles } from 'lucide-react';
import { updatePanel } from '../data/mock';

interface UpdateProps {}

const Update: React.FC<UpdateProps> = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState<string | null>(null);
  const data = updatePanel;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };


  return (
    <motion.div
      id="update"
      className="glass-card p-6 hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl flex items-center justify-center">
          <RefreshCw className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Update</h2>
          <p className="text-sm text-white/80">Page Analysis & Recommendations</p>
        </div>
      </div>

      {/* Page Score */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/60">Page Score</span>
          <span className={`text-lg font-bold ${getScoreColor(data.page.score)}`}>
            {data.page.score}/100
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${data.page.score >= 80 ? 'bg-green-400' : data.page.score >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
            initial={{ width: 0 }}
            animate={{ width: `${data.page.score}%` }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </div>
      </motion.div>

      {/* Schema Status */}
      <motion.div
        className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white">Schema Markup</span>
          <div className="flex items-center space-x-2">
            {data.page.schema.status === 'ok' ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm ${data.page.schema.status === 'ok' ? 'text-green-400' : 'text-red-400'}`}>
              {data.page.schema.type}
            </span>
          </div>
        </div>

        <div className="text-sm text-white/80 mb-3">
          <strong>URL:</strong> {data.page.url}
        </div>

        {data.page.schema.issues.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm text-white/60">Issues:</span>
            {data.page.schema.issues.map((issue, index) => (
              <div key={index} className="text-sm text-red-400 bg-red-400/10 rounded p-2 border-l-2 border-red-400">
                {issue}
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Real-time Check */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center space-x-2 mb-3">
          <Clock className="w-4 h-4 text-white/60" />
          <span className="text-sm text-white/60">Freshness Check</span>
        </div>

        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white">Status</span>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              data.realtimeCheck.withinFreshnessWindow ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
            }`}>
              {data.realtimeCheck.withinFreshnessWindow ? 'Fresh' : 'Stale'}
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <span className="text-sm text-white/80">Suggested Updates:</span>
            {data.realtimeCheck.suggestedUpdates.map((update, index) => (
              <div key={index} className="text-sm text-white/70 ml-4">
                • {update}
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-3">
            <div className="text-sm text-white/80 mb-2">External Sources:</div>
            <div className="space-y-1">
              {data.realtimeCheck.sources.map((source, index) => (
                <div key={index} className="text-xs text-white/60 flex justify-between">
                  <span>{source.name}</span>
                  <span>{source.lastUpdated}</span>
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
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 flex items-center space-x-2"
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
              <span>Apply Updates</span>
            </motion.button>
          </div>

          <div className="relative">
            <motion.button
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setShowHelpTooltip('update-help')}
              onMouseLeave={() => setShowHelpTooltip(null)}
            >
              <HelpCircle className="w-4 h-4 text-white/60" />
            </motion.button>

            {showHelpTooltip === 'update-help' && (
              <motion.div
                className="absolute bottom-full right-0 mb-2 p-3 bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg border border-white/20 max-w-xs z-20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative">
                  <p className="text-white/90">Update panel analyzes your current page performance, identifies technical issues, and provides prioritized recommendations for improvement.</p>
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
            <p className="text-white/80 mb-6">Discover how Wrodium's update recommendations can boost your page performance and search rankings.</p>
            <div className="flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors">
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

export default Update;
