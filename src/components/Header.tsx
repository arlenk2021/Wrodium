import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Sun, Moon, Zap, Command, Sparkles, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { CommandPalette } from './CommandPalette';
import { GuidedTour } from './GuidedTour';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isDark, setIsDark] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);


  return (
    <motion.header
      className="sticky top-0 bg-black/20 backdrop-blur-md border-b border-white/10 z-30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Left: Wrodium wordmark */}
        <motion.div
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-md flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-[hsl(var(--nebula-1))] to-[hsl(var(--nebula-2))] bg-clip-text text-transparent">
            Wrodium
          </h1>
        </motion.div>

        {/* Center: Compact command input */}
        <div className="flex-1 max-w-sm mx-6">
          <motion.div
            className="relative"
            whileFocus={{ scale: 1.02 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/50" />
            <input
              type="text"
              placeholder="Search or command..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ion))] transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Right: Utility area */}
        <div className="flex items-center space-x-3">
          {/* Demo Mode Toggle */}
          <motion.button
            className={`px-3 py-1.5 rounded-lg border text-sm flex items-center gap-2 transition-all duration-300 ${
              isDemoMode
                ? 'bg-purple-400/20 border-purple-400/30 text-purple-300 hover:bg-purple-400/30'
                : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
            }`}
            onClick={() => setIsDemoMode(!isDemoMode)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">{isDemoMode ? 'Demo ON' : 'Demo'}</span>
          </motion.button>

          <motion.button
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm flex items-center gap-2 transition-all duration-300"
            onClick={() => setIsCommandPaletteOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Command className="w-3 h-3" />
            <span className="hidden sm:inline">⌘K</span>
          </motion.button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 rounded-lg bg-white/5 border-white/10 hover:bg-white/10 text-white p-0 focus-visible:ring-2 focus-visible:ring-[hsl(var(--ion))]"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-yellow-400" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-400" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card">
              <DropdownMenuItem onClick={() => {
                setIsDark(false);
                document.documentElement.classList.remove('dark');
              }}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setIsDark(true);
                document.documentElement.classList.add('dark');
              }}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <motion.button
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[hsl(var(--ion))]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTourActive(true)}
            aria-label="Start guided tour"
          >
            <HelpCircle className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Guided Tour */}
      <GuidedTour
        isActive={isTourActive}
        onComplete={() => setIsTourActive(false)}
      />
    </motion.header>
  );
};

export default Header;
