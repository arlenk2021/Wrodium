import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoEffectsProps {
  isDemoMode: boolean;
}

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
}

export const DemoEffects: React.FC<DemoEffectsProps> = ({ isDemoMode }) => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    if (isDemoMode) {
      const newParticles: ConfettiParticle[] = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: -10,
          rotation: Math.random() * 360,
          color: ['#22d3ee', '#a855f7', '#fbbf24', '#ef4444', '#10b981'][Math.floor(Math.random() * 5)],
          delay: Math.random() * 2
        });
      }
      setParticles(newParticles);

      // Reset particles after animation
      const timer = setTimeout(() => {
        setParticles([]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isDemoMode]);

  return (
    <AnimatePresence>
      {isDemoMode && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{
            y: -20,
            x: 0,
            rotate: 0,
            scale: 0,
            opacity: 1
          }}
          animate={{
            y: window.innerHeight + 100,
            x: (Math.random() - 0.5) * 200,
            rotate: particle.rotation + 360,
            scale: [0, 1, 1, 0],
            opacity: [1, 1, 1, 0]
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            ease: "easeOut",
            scale: {
              times: [0, 0.2, 0.8, 1],
              duration: 3
            }
          }}
        >
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: particle.color }}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

interface DemoRibbonProps {
  isDemoMode: boolean;
}

export const DemoRibbon: React.FC<DemoRibbonProps> = ({ isDemoMode }) => {
  if (!isDemoMode) return null;

  return (
    <motion.div
      className="fixed top-4 right-4 z-40"
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
        Interactive Demo
      </div>
    </motion.div>
  );
};
