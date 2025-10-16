import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPIProps {
  label: string;
  value: string | number;
  delta?: number;
  icon?: LucideIcon;
  className?: string;
}

export const KPI: React.FC<KPIProps> = ({
  label,
  value,
  delta,
  icon: Icon,
  className = ""
}) => {
  const getDeltaIcon = () => {
    if (!delta) return <Minus className="w-3 h-3" />;
    return delta > 0 ? (
      <TrendingUp className="w-3 h-3 text-green-400" />
    ) : (
      <TrendingDown className="w-3 h-3 text-red-400" />
    );
  };

  const getDeltaColor = () => {
    if (!delta) return "text-gray-400";
    return delta > 0 ? "text-green-400" : "text-red-400";
  };

  return (
    <motion.div
      className={`text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 ${className}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {Icon && (
        <div className="flex justify-center mb-2">
          <Icon className="w-5 h-5 text-cyan-400" />
        </div>
      )}
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-white/80 mb-2">{label}</div>
      {delta !== undefined && (
        <div className={`text-xs flex items-center justify-center gap-1 ${getDeltaColor()}`}>
          {getDeltaIcon()}
          <span className="font-medium">{Math.abs(delta)}%</span>
        </div>
      )}
    </motion.div>
  );
};
