# BinRack SEO Optimizer Memory

## Project Overview
- React 19 + TypeScript + Vite SPA for custom garage shelving business
- Single marketing page with sections: Hero, Features, Gallery, Configurator (quote form), FAQ, Footer
- Local service business targeting garage organization market
- Brand color: gold (#ffb800), dark theme (#121212)

## Key SEO Findings (2026-03-20 Audit)
- **SPA with no SSR/prerendering** -- biggest structural SEO risk
- No meta description, OG tags, Twitter cards, favicon in initial audit
- No robots.txt or sitemap.xml
- FAQ section has 7 Q&A pairs -- perfect for FAQPage schema
- H1 was emotional hook with zero target keywords
- Gallery images had no lazy loading and thin alt text
- External texture loaded from transparenttextures.com (third-party dependency)
- Placeholder phone number and vague location "Serving the Local Area"
- Social media links all point to href="#"

## Target Keywords
- Primary: "custom garage shelving", "bin rack", "tote rack"
- Secondary: "27 gallon tote storage", "garage organization", "heavy duty garage shelves"
- Long-tail: "shelving for 27 gallon totes", "modular garage storage system"
- Missing from content: "storage totes", "garage storage", "garage organization"

## File Structure
- `index.html` -- main entry point (meta tags go here)
- `src/components/Hero.tsx` -- H1, hero image, stats
- `src/components/Features.tsx` -- 4 feature cards
- `src/components/Gallery.tsx` -- 8 installation photos with lightbox
- `src/components/FAQ.tsx` -- 7 Q&A accordion items
- `src/components/Configurator.tsx` -- quote request form
- `src/components/Footer.tsx` -- contact info, social links
- `public/photos/` -- 8 gallery images (mix of png, jpg, webp)
