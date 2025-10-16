import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, TrendingDown, ExternalLink, HelpCircle, Sparkles, Globe, Link, Star } from 'lucide-react';
import { brandReview } from '../data/mock';
import { KPI } from './KPI';
import { Trend } from './Trend';
import { BadgeList } from './BadgeList';
import { TimeStamp } from './TimeStamp';

interface BrandReviewProps {}

const BrandReview: React.FC<BrandReviewProps> = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState<string | null>(null);
  const data = brandReview;

  // Generate trend data if not available
  const trendData = data.backlinkTrend6mo || [62, 68, 71, 74, 79, 85];

  // Create 6 mentions (3 provided + 3 placeholders)
  const allMentions = [
    ...data.mentionsSample,
    { source: "TechNews Daily", title: "AI tools comparison roundup", sentiment: "positive" },
    { source: "Dev Community", title: "Best practices discussion", sentiment: "neutral" },
    { source: "Industry Report", title: "Market analysis insights", sentiment: "positive" }
  ];

  return (
    <motion.div
      id="brand-review"
      className="glass-card p-6 hover:shadow-2xl hover:shadow-cyan-400/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <motion.div
        className="flex items-center space-x-3 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold bg-gradient-to-r from-[hsl(var(--nebula-1))] to-[hsl(var(--nebula-2))] bg-clip-text text-transparent">
            Brand Review
          </h2>
          <p className="text-sm text-white/80">Reputation & Authority Audit</p>
        </div>
      </motion.div>

      {/* KPIs: Reputation Score, Total Backlinks, High/Med/Low Authority, 30‑day adds */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <KPI
          label="Reputation Score"
          value={data.reputationScore}
          delta={5}
          icon={Shield}
        />
        <KPI
          label="Total Backlinks"
          value={data.backlinkSummary.total.toLocaleString()}
          delta={12}
          icon={Link}
        />
        <KPI
          label="High Authority"
          value={data.backlinkSummary.highAuthority}
          delta={8}
          icon={Star}
        />
        <KPI
          label="30-Day Adds"
          value={data.backlinkSummary.recent30d}
          delta={15}
          icon={TrendingUp}
        />
      </motion.div>

      {/* Trend sparkline */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Backlink Growth Trend</h3>
          <TimeStamp isoString={data.snapshotAt} />
        </div>
        <Trend data={trendData} width={300} height={60} />
      </motion.div>

      {/* Table: 6 mentions */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-sm font-semibold text-white mb-3">Recent Mentions</h3>
        <div className="space-y-2">
          {allMentions.map((mention, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  mention.sentiment === 'positive' ? 'bg-green-400' :
                  mention.sentiment === 'neutral' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <div>
                  <div className="text-sm font-medium text-white">{mention.source}</div>
                  <div className="text-xs text-white/60">{mention.title}</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/50 hover:text-cyan-400 cursor-pointer" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Two BadgeLists: strengths vs. weaknesses */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div>
          <h3 className="text-sm font-semibold text-green-400 mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Strengths
          </h3>
          <BadgeList items={data.strengths} variant="success" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center">
            <TrendingDown className="w-4 h-4 mr-2" />
            Weaknesses
          </h3>
          <BadgeList items={data.weaknesses} variant="danger" />
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="mt-6 pt-4 border-t border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 flex items-center space-x-2"
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
              <span>See Sample Audit</span>
            </motion.button>
          </div>

          <div className="relative">
            <motion.button
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setShowHelpTooltip('brand-help')}
              onMouseLeave={() => setShowHelpTooltip(null)}
            >
              <HelpCircle className="w-4 h-4 text-white/60" />
            </motion.button>

            {showHelpTooltip === 'brand-help' && (
              <motion.div
                className="absolute bottom-full right-0 mb-2 p-3 bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg border border-white/20 max-w-xs z-20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative">
                  <p className="text-white/90">Brand Review analyzes your online reputation, backlink profile, and identifies key strengths and areas for improvement.</p>
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
            <p className="text-white/80 mb-6">Get a personalized walkthrough of Wrodium's brand analysis capabilities.</p>
            <div className="flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-cyan-400 text-white rounded-lg hover:bg-cyan-500 transition-colors">
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

export default BrandReview;
