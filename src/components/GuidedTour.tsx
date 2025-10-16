import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface GuidedTourProps {
  isActive: boolean;
  onComplete: () => void;
}

interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    id: 'header',
    title: 'Welcome to Wrodium',
    content: 'See how evidence wins. This interactive demo showcases AI-powered content analysis with beautiful visualizations.',
    target: 'header',
    position: 'bottom'
  },
  {
    id: 'navigation',
    title: 'Smart Navigation',
    content: 'Navigate between sections with our intelligent sidebar. Each section highlights automatically as you scroll.',
    target: 'navigation',
    position: 'right'
  },
  {
    id: 'brand-review',
    title: 'Brand Intelligence',
    content: 'Analyze your online reputation with real-time metrics, backlink trends, and sentiment analysis.',
    target: 'brand-review',
    position: 'top'
  },
  {
    id: 'ai-visibility',
    title: 'AI Platform Insights',
    content: 'Discover how your content performs across ChatGPT, Claude, and other AI platforms with actionable insights.',
    target: 'ai-visibility',
    position: 'top'
  }
];

export const GuidedTour: React.FC<GuidedTourProps> = ({ isActive, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive && !localStorage.getItem('tour-completed')) {
      setIsVisible(true);
    }
  }, [isActive]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('tour-completed', 'true');
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  const currentTourStep = tourSteps[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSkip}
          />

          {/* Tour Step */}
          <motion.div
            className="fixed z-50 max-w-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-white">
                    Step {currentStep + 1} of {tourSteps.length}
                  </span>
                </div>
                <button
                  onClick={handleSkip}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-white/60" />
                </button>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2">
                {currentTourStep.title}
              </h3>
              <p className="text-sm text-white/80 mb-6 leading-relaxed">
                {currentTourStep.content}
              </p>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    currentStep === 0
                      ? 'text-white/40 cursor-not-allowed'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 inline mr-1" />
                  Previous
                </button>

                <div className="flex gap-1">
                  {tourSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep ? 'bg-cyan-400' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-500 text-white text-sm font-medium transition-colors"
                >
                  {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < tourSteps.length - 1 && (
                    <ChevronRight className="w-4 h-4 inline ml-1" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
