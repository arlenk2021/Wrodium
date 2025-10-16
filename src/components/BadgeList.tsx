import React from 'react';
import { motion } from 'framer-motion';

interface BadgeListProps {
  items: string[];
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const BadgeList: React.FC<BadgeListProps> = ({
  items,
  variant = 'default',
  className = ""
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-400/10 text-green-400 border-green-400/20';
      case 'warning':
        return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20';
      case 'danger':
        return 'bg-red-400/10 text-red-400 border-red-400/20';
      default:
        return 'bg-white/5 text-white/80 border-white/10';
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item, index) => (
        <motion.span
          key={index}
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getVariantStyles()}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
};
