<div align="center">

<a href="https://github.com/biswashrai04-sudo/ai-content-calendar">
  <img src="https://raw.githubusercontent.com/biswashrai04-sudo/ai-content-calendar/main/public/logo.png" alt="ContentAI Logo" width="100" height="100" style="max-width:100%;">
</a>

# ContentAI

**AI-Powered 30-Day Social Media Content Calendar Generator**

*Generate topics, hooks, captions, hashtags & CTAs instantly — powered by Claude AI*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev)
[![Claude AI](https://img.shields.io/badge/Claude_Sonnet-4-9B59B6.svg?logo=anthropic&logoColor=white)](https://anthropic.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000.svg?logo=vercel&logoColor=white)](https://vercel.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/biswashrai04-sudo/ai-content-calendar/pulls)

[🚀 Live Demo](https://ai-content-calendar-alpha.vercel.app) · [📖 Documentation](#) · [🐛 Report Bug](https://github.com/biswashrai04-sudo/ai-content-calendar/issues) · [✨ Request Feature](https://github.com/biswashrai04-sudo/ai-content-calendar/issues)

</div>

---

## What is ContentAI?

**ContentAI** is a zero-config, browser-based tool that generates a **complete 30-day social media content calendar** in seconds. Paste your brand name, pick your niche and platform, and get:

- **30 unique topic ideas** — one for each day
- **Attention-grabbing hooks** — optimized for scroll-stopping power
- **Full captions with emojis** — platform-native tone & formatting
- **Curated hashtag sets** — niche-relevant, reach-optimized
- **Strong CTAs** — drives engagement & conversions
- **One-click copy** — paste directly into your scheduler

> **Built by [vibetechbee](https://instagram.com/vibetechbee)** — self-taught AI builder turning curiosity into tools.

---

## Features

| Feature | Description |
|---------|-------------|
| **30-Day Calendar** | Full month of content in one generation |
| **Multi-Platform** | Instagram, LinkedIn, X/Twitter, Facebook |
| **Niche-Aware** | Tech, AI, Business, Gadgets, Real Estate + more |
| **Claude Sonnet 4** | Latest Anthropic model for highest quality |
| **Instant Copy** | Click any field → clipboard |
| **Zero Backend** | Runs entirely in browser via Anthropic API |
| **Vercel Ready** | Deploy in 60 seconds |

---

## Quickstart

### Prerequisites
- Node.js 18+
- Anthropic API key ([get one here](https://console.anthropic.com))

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/biswashrai04-sudo/ai-content-calendar.git
cd ai-content-calendar

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open http://localhost:5173
```

### Environment Variables

Create a `.env.local` file (optional — the app prompts for API key in-browser):

```bash
VITE_ANTHROPIC_API_KEY=your_anthropic_key_here
```

> **Security Note:** The API key is used client-side only for direct Anthropic calls. No proxy server. Never commits to git (enforced by `.gitignore`).

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 18 + Vite 5 |
| **Language** | JavaScript (ESM) |
| **Styling** | CSS Variables + Vanilla CSS |
| **AI Model** | Claude Sonnet 4 (Anthropic API) |
| **Build Tool** | Vite |
| **Deployment** | Vercel (static + edge functions) |
| **Package Manager** | npm |

---

## Project Structure

```text
ai-content-calendar/
├── public/                 # Static assets
├── src/
│   ├── App.jsx            # Main application component
│   ├── App.css            # Component styles
│   ├── index.css          # Global styles & CSS variables
│   └── main.jsx           # Entry point
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies & scripts
├── .gitignore             # Git ignore rules
├── LICENSE                # MIT License
└── README.md              # This file
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |

---

## Deployment (Vercel)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/biswashrai04-sudo/ai-content-calendar)

### Manual Deploy

```bash
# 1. Push to GitHub
git push origin main

# 2. Import in Vercel
# Go to https://vercel.com/new → Import this repo

# 3. Configure (auto-detected)
# Framework: Vite
# Build Command: npm run build
# Output Directory: dist

# 4. Add Environment Variable (optional)
# VITE_ANTHROPIC_API_KEY = your_key

# 5. Deploy → Live in ~60 seconds
```

---

## Configuration

### Adding New Niches

Edit `src/App.jsx` → `NICHES` array:

```javascript
const NICHES = [
  { id: 'tech', name: 'Tech', emoji: '💻' },
  { id: 'ai', name: 'AI for Productivity', emoji: '🤖' },
  // Add your niche here
  { id: 'your-niche', name: 'Your Niche', emoji: '✨' },
];
```

### Customizing Platforms

Edit `src/App.jsx` → `PLATFORMS` array:

```javascript
const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', emoji: '📸' },
  { id: 'linkedin', name: 'LinkedIn', emoji: '💼' },
  // Add your platform
];
```

### Prompt Engineering

The core prompt lives in `src/App.jsx` → `generateCalendar()`. Modify the system prompt to adjust tone, format, or output structure.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Run locally: `npm run dev`
4. Commit with conventional commits: `feat: add amazing feature`
5. Push and open a Pull Request

### Code Style

- ESM modules (`type: "module"` in package.json)
- Functional React components + hooks
- CSS Variables for theming
- No external UI libraries (vanilla CSS)

---

## Security

- **No backend** — API calls go directly to Anthropic from browser
- **No API key storage** — key never leaves your browser session
- **`.gitignore`** — blocks `.env*`, `node_modules`, `dist`, IDE files
- **Dependabot** — weekly updates for npm + GitHub Actions

Report vulnerabilities via [GitHub Security Advisories](https://github.com/biswashrai04-sudo/ai-content-calendar/security/advisories).

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

## Acknowledgments

- [Anthropic](https://anthropic.com) — Claude AI
- [Vite](https://vitejs.dev) — Next-gen frontend tooling
- [React](https://react.dev) — UI library
- [Vercel](https://vercel.com) — Zero-config deployment

---

<div align="center">

**Built with curiosity by [vibetechbee](https://instagram.com/vibetechbee) · Powered by Claude AI**

[⬆ Back to top](#contentai)

</div>