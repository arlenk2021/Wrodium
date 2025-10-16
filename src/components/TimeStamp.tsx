import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimeStampProps {
  isoString: string;
  label?: string;
  showRelative?: boolean;
  className?: string;
}

export const TimeStamp: React.FC<TimeStampProps> = ({
  isoString,
  label,
  showRelative = true,
  className = ""
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
  };

  return (
    <motion.div
      className={`flex items-center gap-2 text-xs text-white/60 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Clock className="w-3 h-3" />
      <div className="flex flex-col">
        {label && <span className="text-white/40">{label}</span>}
        <span>
          {showRelative ? getRelativeTime(isoString) : formatDate(isoString)}
        </span>
        <span className="text-white/30 text-[10px]">
          {new Date(isoString).toLocaleDateString('en-US', {
            timeZoneName: 'short'
          }).split(', ')[1]}
        </span>
      </div>
    </motion.div>
  );
};
