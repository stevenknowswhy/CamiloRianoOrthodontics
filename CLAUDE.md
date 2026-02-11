# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dr. Riaño Orthodontics website - A Next.js 16 website with two office locations (San Francisco and Sonoma). Features include multi-step patient intake forms, dark mode support, and email integration via Resend.

**Brand Name:** "Dr. Riaño Orthodontics" (preferred) over "Camilo Riaño Orthodontics"

## Development Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Building
npm run build        # Production build
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── api/                 # API routes (form submissions)
│   │   ├── contact/        # General contact → Resend email
│   │   ├── assessment/     # Smile assessment → Resend email
│   │   ├── referral/       # Doctor referrals → Resend email
│   │   └── virtual-care/  # Virtual care signup → Resend email
│   ├── sections/           # Reusable page sections (Hero, Services, etc.)
│   ├── contact/            # Contact pages (SF & Sonoma variants)
│   ├── blog/               # Blog listing and individual posts
│   ├── layout.tsx          # Root layout with fonts, theme provider
│   └── globals.css         # Tailwind + custom design system
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── ContactFlow.tsx      # Multi-step contact wizard (branching logic)
│   ├── ReferralFlow.tsx     # Doctor referral form
│   ├── SmileAssessmentFlow.tsx  # 13-step patient assessment
│   ├── VirtualCareFlow.tsx  # Virtual care signup
│   ├── ContactModule.tsx    # Floating chat-style contact button
│   ├── Navigation.tsx        # Header with location dropdown
│   ├── FullScreenMenu.tsx   # Mobile menu with all navigation links
│   ├── ThemeProvider.tsx     # Dark mode context + localStorage
│   └── SmoothScroll.tsx      # Lenis smooth scroll wrapper
└── lib/
    ├── resend.ts            # Resend client + email templates
    ├── api.ts              # Form submission utilities
    └── utils.ts            # cn() helper for Tailwind
```

## Architecture

### Form Submission Flow

All forms use a consistent pattern:
1. Client component calls function from `@/lib/api` (e.g., `submitContactForm`)
2. API function POSTs to corresponding `/api/*` route
3. API route validates, then calls `sendContactEmail()` from `@/lib/resend`
4. Resend sends formatted HTML email to practice inbox(es)

**Email Routing:**
- San Francisco inquiries → `info@docrianos.com`
- Sonoma inquiries → `infosonoma@docrianos.com`
- "Both" or no location → both emails

### Multi-Step Form Architecture

The flow components (ContactFlow, SmileAssessmentFlow, etc.) share a pattern:
- Step state managed with `useState<number>` for current step
- Each step is a conditional render block with AnimatePresence transitions
- Framer Motion handles enter/exit animations
- Branching logic based on user selections (e.g., appointments vs billing)

### Theme System

- Custom CSS variables defined in `globals.css` under `@theme inline`
- Light/dark themes in CSS custom properties
- ThemeProvider wraps app, adds `.dark` class to `<html>`
- Brand colors: coral (`#d4533f`), dark (`#1a1a1a`), cream (`#e8e6dc`)

### Navigation Variants

Navigation switches between "default" and "overlay" variants:
- Overlay: Used on contact/assessment pages with hero backgrounds
- Default: Standard navigation
- Determined by pathname in Navigation component

## Key Dependencies

- **Next.js 16** - App Router, React Server Components
- **React 19** - Latest React with improved hooks
- **Tailwind CSS 4** - Utility-first styling with `@theme` inline
- **shadcn/ui** - Pre-built accessible components (Radix UI based)
- **Framer Motion** - Component animations, page transitions
- **GSAP** - ScrollTrigger for scroll-based animations
- **Lenis** - Smooth scroll behavior (wraps entire app)
- **Resend** - Transactional email API
- **Lucide React** - Icon library

## Environment Variables

Required in `.env.local`:
```env
RESEND_API_KEY=                    # Resend API key for emails
FROM_EMAIL=noreply@docrianos.com   # Sender email
TO_EMAIL_SF=info@docrianos.com    # SF practice email
TO_EMAIL_SONOMA=infosonoma@docrianos.com  # Sonoma practice email
```

## Font Configuration

Three Google Fonts loaded in layout.tsx:
- **Playfair Display** (`--font-playfair`) - Serif headings
- **Inter** (`--font-inter`) - Sans-serif body text
- **Cormorant Garamond** (`--font-cormorant`) - Accent serif

Apply via CSS: `font-family: var(--font-serif)`

## Known Issues & TODOs

See `COMPLETION_CHECKLIST.md` for comprehensive status. Key items:
- Missing service detail pages (routes exist in nav, no pages)
- Privacy policy page required before production
- SEO files missing (robots.txt, sitemap.xml)
- Analytics not installed

## Image Assets

Images are stored in `/public/images/`:

```
/public/images/
├── approach/              # Stacking cards (approach-1.png to approach-4.png)
├── blog/                 # Blog post feature images
├── services/             # Service treatment images
│   ├── brius-lingual-braces.png
│   ├── ceramic-braces.png
│   ├── clear-braces.png
│   ├── lingual-braces.png
│   ├── retainers.png
│   └── traditional-braces.png
├── why-choose/           # Feature icons for "Why Choose Us" section
├── FamilyPark.png         # Hero background (family in park)
├── hero-dental.png       # Alternative hero image
├── SmileAssessment.png    # Smile assessment page background
├── SonomaCheeseFactory.png # Sonoma office page background
└── WhatWeBring.png       # "What We Bring" section image
```

## Placeholder Pages

The following pages exist as "Coming Soon" placeholders (linked from nav but content pending):

**Orthodontics:** `/orthodontics/{children,teens,adults}`
**Services:** `/services/{traditional-braces,clear-braces,ceramic-braces,lingual-braces,brius-lingual-braces,clear-aligners,invisalign,orthofx,retainers,vivera-retainers,orthognathic-surgery,tad,acceledent,diagnostics,treatment-planning,expert-care,results}```

## Important Notes

- All API routes are server-side only (secure for API keys)
- Location hours are hardcoded in `Navigation.tsx` - not currently displayed on site
- The `ContactModule` is a floating FAB that opens a minimal contact form
- Dark mode persists in localStorage and respects system preference on first visit
- Lenis smooth scroll wraps entire app in `SmoothScroll` component
