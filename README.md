# Wrodium Demo Dashboard/ For UI/UX Improvement

A modern, space-themed React dashboard for Wrodium's SEO and AI-powered content optimization platform. **No backend required** - everything runs client-side with mock data.

## Features

- **Interactive Demo Mode** - Visual effects and guided tour for showcasing features
- **Command Palette** - ⌘K/Ctrl+K for quick navigation and actions
- **Semantic Navigation** - ARIA-labeled sections with keyboard accessibility
- **Brand Review** - Reputation analysis with backlink trends and sentiment data
- **AI Visibility** - Search intent analysis and AI platform response simulation
- **Prompt Restructuring** - Query optimization and content outline generation
- **Update Panel** - Page performance scoring and improvement recommendations

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom space theme
- **Framer Motion** for smooth animations and interactions
- **Lucide React** for consistent iconography
- **shadcn/ui** components for UI primitives

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome 88+, Firefox 87+, Safari 14+, Edge 88+)

### Installation & Launch

1. **Clone or download the project**
   ```bash
   git clone <your-repo-url>
   cd wrodium-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)
   - The dashboard will load with a beautiful space-themed interface

## 🎮 Using the Dashboard

### Navigation
- **Sidebar Icons** - Click any icon to scroll to that section
- **Command Palette** - Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) for quick navigation
- **Keyboard Navigation** - Use `Tab` to navigate, `Enter`/`Space` to activate

### Interactive Features

#### **Command Palette** (⌘K / Ctrl+K)
- Search and navigate to any section instantly
- Copy prompts, export data, and perform actions
- Type to filter available commands

#### **Demo Mode Toggle**
- Click the purple "Demo" button in the header
- Enables visual effects and animations
- Shows "Interactive Demo" ribbon when active

#### **Guided Tour**
- Click the help icon (?) in the header
- 4-step interactive tour introducing key features
- Remembers completion in localStorage

### Dashboard Sections

#### **Brand Review** 🏢
- **Reputation Score** - Overall brand health metric
- **Backlink Analysis** - Total links, authority distribution, 30-day trends
- **Recent Mentions** - 6 recent mentions with sentiment indicators
- **Strengths & Weaknesses** - Categorized insights with color-coded badges

#### **AI Visibility** 🤖
- **Search Intent Chips** - Volume and difficulty metrics for key queries
- **LLM Response Cards** - Copyable prompts for ChatGPT, Claude, Perplexity, Gemini
- **Consumer Prompts** - Suggested prompts that copy to clipboard with toast feedback

#### **Prompt Restructuring** ✍️
- **Query Analysis** - Original query with AI-predicted rewrites
- **Context Scaffold** - Entities, constraints, and structured outline
- **Export Options** - Download outlines as Markdown or JSON

#### **Update Panel** 📊
- **Page Performance** - Circle score indicator with real-time metrics
- **Schema Validation** - Type, status, and issue tracking
- **Freshness Monitoring** - Real-time checks with source monitoring
- **Re-score Button** - Updates timestamp with success animation

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Troubleshooting

### Common Issues

**"This site can't be reached" or Connection Refused**
- The development server might not be running
- Check if port 5173 is available
- Try: `lsof -i :5173` to see what's using the port
- Restart the server: `npm run dev`

**504 "Outdated Optimize Dep" Errors**
- Clear Vite's cache: `rm -rf node_modules/.vite`
- Restart the development server
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

**Build Errors**
- Check TypeScript errors: `npm run build`
- Fix any import/export issues
- Ensure all dependencies are installed: `npm install`

**Animation Issues**
- Check if `prefers-reduced-motion` is respected
- Verify CSS animations are working in DevTools

### Development Tips

**Hot Module Replacement (HMR)**
- Changes to components auto-reload in the browser
- CSS changes apply instantly
- Console errors show in real-time

**Debugging**
- Use React DevTools browser extension
- Check console for errors and warnings
- Use `console.log` for debugging (remove in production)

## 🏗️ Architecture & Performance

### Client-Only Architecture
- **No Backend Required** - All data is mocked in `src/data/mock.ts`
- **Static Generation** - Pre-built for fast loading
- **CDN Ready** - Can be deployed to any static hosting

### Performance Optimizations
- **Code Splitting** - Automatic route-based splitting
- **Tree Shaking** - Unused code elimination
- **Asset Optimization** - Images and fonts optimized
- **Lazy Loading** - Components load on demand

### Accessibility (WCAG AA)
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - Proper ARIA labels and semantic HTML
- **Color Contrast** - AA compliant contrast ratios
- **Focus Management** - Visible focus indicators
- **Motion Respect** - Honors `prefers-reduced-motion`

### Browser Compatibility
- **Modern Standards** - CSS Grid, Flexbox, Custom Properties
- **Progressive Enhancement** - Graceful degradation for older browsers
- **Mobile Optimized** - Touch-friendly interactions

## Project Structure

```
wrodium-dashboard/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components (shadcn/ui)
│   │   ├── App.tsx      # Main application component
│   │   ├── Header.tsx   # Top navigation with command palette
│   │   ├── Sidebar.tsx  # Left navigation rail with icons
│   │   ├── BrandReview.tsx # Brand analysis dashboard
│   │   ├── AIVisibility.tsx # AI platform insights
│   │   ├── PromptRestructuring.tsx # Query optimization
│   │   ├── Update.tsx   # Page update recommendations
│   │   ├── CommandPalette.tsx # ⌘K command interface
│   │   ├── GuidedTour.tsx # Interactive onboarding
│   │   └── DemoEffects.tsx # Visual enhancement effects
│   ├── data/
│   │   └── mock.ts      # All hardcoded demo data (ISO timestamps)
│   ├── styles/
│   │   └── globals.css  # Global styles, animations, CSS variables
│   ├── assets/          # Images and icons
│   ├── lib/             # Utility functions
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
└── README.md           # This file
```

## 🚀 Deployment

### Static Hosting (Recommended)
Deploy to any static hosting service:

**Vercel** (Recommended)
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm run build
# Upload dist/ folder to Netlify
```

**GitHub Pages**
```bash
npm run build
# Upload dist/ folder to GitHub Pages
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Environment Variables
No environment variables required - fully static application.

## Design Features

- **Space Theme**: Animated starfield with purple-cyan nebula gradient
- **Glass Cards**: Translucent cards with backdrop blur effects
- **Responsive Design**: 1-column mobile, 2-column tablet, 4-column desktop
- **Accessibility**: WCAG AA contrast, keyboard navigation, screen reader support
- **Performance**: Optimized animations that respect `prefers-reduced-motion`
- **Interactive Elements**: Hover effects, tooltips, modals, and smooth transitions

## 📋 Production Readiness Checklist

- ✅ **No network calls** - All data is client-side
- ✅ **ISO timestamps** - All dates are ISO strings
- ✅ **Reduced motion** - Respects user preferences
- ✅ **Keyboard navigation** - Full accessibility
- ✅ **TypeScript clean** - No build errors
- ✅ **ESLint clean** - Code quality checks pass
- ✅ **WCAG AA compliance** - Accessibility standards met
- ✅ **Performance optimized** - Fast loading and smooth animations

## No Backend Required

This is a frontend-only application. All data is hardcoded in `src/data/mock.ts` for demonstration purposes.

## Browser Support

- Modern browsers with CSS Grid and backdrop-filter support
- Chrome 88+, Firefox 87+, Safari 14+, Edge 88+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for demonstration purposes only.
