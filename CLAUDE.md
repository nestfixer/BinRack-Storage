# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Frontend dev server (port 3000)
npm run server       # Backend API server (port 3001, separate process)
npm run build        # Production build to /dist
npm run preview      # Preview production build
npm run lint         # TypeScript type checking (tsc --noEmit)
npm run clean        # Remove /dist folder
```

Development requires running both `npm run dev` and `npm run server` concurrently. The frontend proxies `/api` requests to `localhost:3001`.

Set `GEMINI_API_KEY` in `.env.local` (copy from `.env.example`).

## Architecture

**Marketing SPA** for BinRack custom garage shelving. Single-page React app with a minimal Express backend.

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS 4 + Motion (animations)
- **Backend**: `server.ts` — single Express endpoint `POST /api/quote`
- **Vite proxy**: `/api/*` → `http://localhost:3001` in dev

### Component Layout (rendered top-to-bottom in `App.tsx`)

`Navbar` → `Hero` → `Features` → `Gallery` → `Configurator` → `FAQ` → `Footer`

All components are in `src/components/`. `Configurator.tsx` is the most complex (quote form with validation, multi-field state, consent checkboxes, success screen).

### Styling

Tailwind CSS 4 (configured via `@tailwindcss/vite` plugin, no `tailwind.config.js`). Custom CSS variables and utilities are in `src/index.css`:
- Brand gold: `#ffb800`
- Dark surface: `#121212`
- Utility classes: `.glass`, `.glass-dark`, `.text-gradient`, `.text-gradient-light`
- Fonts: Inter (body), Plus Jakarta Sans (headings) — loaded via Google Fonts in `index.html`

### Backend API

`POST /api/quote` — accepts quote form data, validates `firstName` + `email`, logs to console. Ready for CRM/email integration but currently a stub.

### Image Generation

`app/applet/generate_images.ts` uses Google Gemini 2.5 Flash to generate product images. Gallery currently uses placeholder images from `src/services/imageService.ts`.
