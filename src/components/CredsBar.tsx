import React from 'react';
import { motion } from 'framer-motion';

const CredsBar: React.FC = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="px-6 py-2 text-center">
        <p className="text-sm text-white/70 font-medium">
          ✨ Trusted by data-driven teams at <span className="text-cyan-400">Fortune 500</span> companies
        </p>
      </div>
    </motion.div>
  );
};

export default CredsBar;
