import React from 'react';
import { motion } from 'framer-motion';

interface CircleScoreProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export const CircleScore: React.FC<CircleScoreProps> = ({
  score,
  maxScore = 100,
  size = 120,
  strokeWidth = 8,
  label,
  className = ""
}) => {
  const normalizedScore = Math.min(Math.max(score, 0), maxScore);
  const percentage = (normalizedScore / maxScore) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return '#22c55e'; // green
    if (score >= 60) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  const getBgColor = () => {
    if (score >= 80) return 'rgba(34, 197, 94, 0.1)';
    if (score >= 60) return 'rgba(234, 179, 8, 0.1)';
    return 'rgba(239, 68, 68, 0.1)';
  };

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getScoreColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Background fill for low scores */}
        {percentage < 100 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - strokeWidth / 2}
            fill={getBgColor()}
          />
        )}
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="text-2xl font-bold text-white">
            {score}
          </div>
          {label && (
            <div className="text-xs text-white/60 mt-1">
              {label}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
