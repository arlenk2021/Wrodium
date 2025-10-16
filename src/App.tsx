import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BrandReview from './components/BrandReview';
import AIVisibility from './components/AIVisibility';
import PromptRestructuring from './components/PromptRestructuring';
import Update from './components/Update';
import CredsBar from './components/CredsBar';
import { Card } from './components/ui/card';
import { DemoEffects, DemoRibbon } from './components/DemoEffects';
import './App.css';

function App() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('brand-review');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Set up intersection observer for active section highlighting
    const sections = ['brand-review', 'ai-visibility', 'prompt-restructuring', 'update'];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);


  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background - positioned absolutely to prevent layout shift */}
      <div className="nebula-bg absolute inset-0" />
      <div className="starfield absolute inset-0" />

      {/* Content Overlay for Text Legibility */}
      <div className="content-overlay relative min-h-screen">

        {/* Demo Effects */}
        <DemoEffects isDemoMode={true} />
        <DemoRibbon isDemoMode={true} />

        {/* Creds Bar - fixed height to prevent layout shift */}
        <div className="h-8">
          <CredsBar />
        </div>

        {/* Header - fixed height to prevent layout shift */}
        <div className="h-16">
          <Header />
        </div>

        <div className="relative z-10 flex min-h-[calc(100vh-8rem)]">
          {/* Left Rail Navigation - fixed width to prevent layout shift */}
          <nav className="hidden sm:flex fixed left-0 top-20 h-full w-16 bg-black/20 backdrop-blur-md border-r border-white/10 flex-col items-center py-6 space-y-2 z-20" aria-label="Main navigation">
            <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          </nav>

          {/* Main Content - flexible layout with proper spacing */}
          <main className="flex-1 sm:pl-16 min-h-full" role="main">
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/5 via-transparent to-purple-900/5 pointer-events-none" />

            {/* Dashboard Grid - stable layout */}
            <div className="relative z-10 p-6">
              <motion.div
                className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card id="brand-review" className="glass-card hover:shadow-2xl hover:shadow-cyan-400/10 transition-all duration-300 min-h-[400px]">
                  <BrandReview />
                </Card>

                <Card id="ai-visibility" className="glass-card hover:shadow-2xl hover:shadow-cyan-400/10 transition-all duration-300 min-h-[400px]">
                  <AIVisibility />
                </Card>

                <Card id="prompt-restructuring" className="glass-card hover:shadow-2xl hover:shadow-cyan-400/10 transition-all duration-300 min-h-[400px]">
                  <PromptRestructuring />
                </Card>

                <Card id="update" className="glass-card hover:shadow-2xl hover:shadow-cyan-400/10 transition-all duration-300 min-h-[400px]">
                  <Update />
                </Card>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
