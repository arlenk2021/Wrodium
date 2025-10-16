import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Globe,
  Search,
  Sparkles,
  ShieldCheck,
  Copy,
  Download,
  Command,
  Keyboard
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-brand-review',
      label: 'Scroll to Brand Review',
      description: 'Jump to brand analysis section',
      icon: <Globe className="w-4 h-4" />,
      action: () => {
        document.getElementById('brand-review')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      category: 'Navigation'
    },
    {
      id: 'nav-ai-visibility',
      label: 'Scroll to AI Visibility',
      description: 'Jump to AI platform analysis section',
      icon: <Search className="w-4 h-4" />,
      action: () => {
        document.getElementById('ai-visibility')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      category: 'Navigation'
    },
    {
      id: 'nav-prompt-restructuring',
      label: 'Scroll to Prompt Restructuring',
      description: 'Jump to query optimization section',
      icon: <Sparkles className="w-4 h-4" />,
      action: () => {
        document.getElementById('prompt-restructuring')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      category: 'Navigation'
    },
    {
      id: 'nav-update',
      label: 'Scroll to Update',
      description: 'Jump to page analysis section',
      icon: <ShieldCheck className="w-4 h-4" />,
      action: () => {
        document.getElementById('update')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      category: 'Navigation'
    },

    // Actions
    {
      id: 'copy-chatgpt-prompt',
      label: 'Copy ChatGPT Prompt',
      description: 'Copy the fact-checking prompt for ChatGPT',
      icon: <Copy className="w-4 h-4" />,
      action: async () => {
        const prompt = "You are an editor. Given a draft about Wrodium, propose 5 fact-checking steps with sources.";
        await navigator.clipboard.writeText(prompt);
        onClose();
      },
      category: 'Actions'
    },
    {
      id: 'copy-claude-prompt',
      label: 'Copy Claude Prompt',
      description: 'Copy the RAG pipeline risk mitigation prompt for Claude',
      icon: <Copy className="w-4 h-4" />,
      action: async () => {
        const prompt = "Given a RAG pipeline spec, write risk mitigations for hallucinations and source freshness.";
        await navigator.clipboard.writeText(prompt);
        onClose();
      },
      category: 'Actions'
    },
    {
      id: 'export-markdown',
      label: 'Export Outline to Markdown',
      description: 'Download the prompt restructuring outline as Markdown',
      icon: <Download className="w-4 h-4" />,
      action: () => {
        const markdown = `# Prompt Restructuring Outline

## User Query
Best way to build a RAG pipeline for news accuracy

## Predicted Rewrites
- How to design a RAG system that reduces hallucinations for news
- RAG pipeline architecture for fact-checking with sources
- Implementing freshness-aware RAG for breaking news

## Context Scaffold

### Entities
- Wrodium
- RAG
- vector database
- retrieval
- schema.org

### Constraints
- Fresh sources under 48 hours
- Citations must include author and date
- Use deterministic reranking

### Outline Structure
1. Goals and non-goals
2. Content ingestion and normalization
3. Indexing strategy and embeddings
4. Query planning and reformulation
5. Attribution and citation policy
6. Evaluation and monitoring
`;

        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'prompt-outline.md';
        a.click();
        URL.revokeObjectURL(url);
        onClose();
      },
      category: 'Export'
    },
    {
      id: 'export-json',
      label: 'Export Outline to JSON',
      description: 'Download the prompt restructuring outline as JSON',
      icon: <Download className="w-4 h-4" />,
      action: () => {
        const json = {
          userQuery: "Best way to build a RAG pipeline for news accuracy",
          predictedRewrites: [
            "How to design a RAG system that reduces hallucinations for news",
            "RAG pipeline architecture for fact-checking with sources",
            "Implementing freshness-aware RAG for breaking news"
          ],
          contextScaffold: {
            entities: ["Wrodium", "RAG", "vector database", "retrieval", "schema.org"],
            constraints: [
              "Fresh sources under 48 hours",
              "Citations must include author and date",
              "Use deterministic reranking"
            ],
            outline: [
              "Goals and non-goals",
              "Content ingestion and normalization",
              "Indexing strategy and embeddings",
              "Query planning and reformulation",
              "Attribution and citation policy",
              "Evaluation and monitoring"
            ]
          }
        };

        const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'prompt-outline.json';
        a.click();
        URL.revokeObjectURL(url);
        onClose();
      },
      category: 'Export'
    }
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 glass-card">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="flex items-center gap-2 text-white">
            <Command className="w-5 h-5" />
            Command Palette
          </DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ion))] transition-all duration-300"
              autoFocus
            />
          </div>
        </DialogHeader>

        <div className="max-h-[400px] overflow-y-auto">
          <AnimatePresence>
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, index) => (
                <motion.div
                  key={cmd.id}
                  className={`p-3 cursor-pointer transition-colors ${
                    index === selectedIndex
                      ? 'bg-cyan-400/10 border-l-2 border-cyan-400'
                      : 'hover:bg-white/5'
                  }`}
                  onClick={() => cmd.action()}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-cyan-400">
                      {cmd.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{cmd.label}</div>
                      <div className="text-xs text-white/60">{cmd.description}</div>
                    </div>
                    <div className="text-xs text-white/40 uppercase tracking-wide">
                      {cmd.category}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="p-8 text-center text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Command className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <div className="text-sm">No commands found</div>
                <div className="text-xs text-white/40 mt-1">Try a different search term</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Keyboard className="w-3 h-3" />
              <span>↑↓ to navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">↵</kbd>
              <span>to select</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">esc</kbd>
            <span>to close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
