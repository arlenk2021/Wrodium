import React from 'react';
import { motion } from 'framer-motion';

interface TrendProps {
  data: number[];
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
}

export const Trend: React.FC<TrendProps> = ({
  data,
  width = 120,
  height = 40,
  strokeColor = "#22d3ee",
  strokeWidth = 2,
  className = ""
}) => {
  if (!data || data.length === 0) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-white/40 text-sm">No data</div>
      </div>
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Create SVG path points
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - strokeWidth);
    const y = height - strokeWidth - ((value - min) / range) * (height - strokeWidth * 2);
    return `${x},${y}`;
  }).join(' ');

  const pathData = `M ${points}`;

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Gradient for area fill */}
        <defs>
          <linearGradient id={`gradient-${Math.random().toString(36).substr(2, 9)}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
            <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path
          d={`${pathData} L ${width - strokeWidth},${height - strokeWidth} L ${strokeWidth},${height - strokeWidth} Z`}
          fill={`url(#gradient-${Math.random().toString(36).substr(2, 9)})`}
        />

        {/* Line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* Start and end dots */}
        <circle
          cx={strokeWidth}
          cy={height - strokeWidth - ((data[0] - min) / range) * (height - strokeWidth * 2)}
          r="2"
          fill={strokeColor}
        />
        <circle
          cx={width - strokeWidth}
          cy={height - strokeWidth - ((data[data.length - 1] - min) / range) * (height - strokeWidth * 2)}
          r="2"
          fill={strokeColor}
        />
      </svg>
    </motion.div>
  );
};
