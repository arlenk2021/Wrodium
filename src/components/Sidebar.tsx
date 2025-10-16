import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Search,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {

  const navItems = [
    {
      id: 'brand-review',
      label: 'Brand Review',
      icon: Globe
    },
    {
      id: 'ai-visibility',
      label: 'AI Visibility',
      icon: Search
    },
    {
      id: 'prompt-restructuring',
      label: 'Prompt Restructuring',
      icon: Sparkles
    },
    {
      id: 'update',
      label: 'Update',
      icon: ShieldCheck
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onSectionChange(sectionId);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, sectionId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToSection(sectionId);
    }
  };

  return (
    <motion.nav
      className="hidden sm:flex fixed left-0 top-16 h-full w-16 bg-black/20 backdrop-blur-md border-r border-white/10 flex-col items-center py-6 space-y-2 z-20"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      role="navigation"
      aria-label="Main navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <div key={item.id} className="relative group">
            <motion.button
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ion))] ${
                isActive
                  ? 'bg-cyan-400/20 border border-cyan-400/50 shadow-lg shadow-cyan-400/20'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              aria-label={`Navigate to ${item.label} section`}
              aria-current={isActive ? 'page' : undefined}
              tabIndex={0}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-cyan-400' : 'text-white/70 group-hover:text-white'
                }`}
              />
            </motion.button>

            {/* Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-black/80 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap border border-white/20">
                {item.label}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Active indicator */}
      <motion.div
        className="absolute left-0 w-1 bg-cyan-400 rounded-r-full"
        animate={{
          top: `${navItems.findIndex(item => item.id === activeSection) * 56 + 24}px`
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.nav>
  );
};

export default Sidebar;
