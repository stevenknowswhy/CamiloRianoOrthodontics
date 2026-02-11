# JULES STUDIO WEBSITE - COMPREHENSIVE RECREATION PROMPT
## For Claude Code AI Agent

---

## PROJECT OVERVIEW
Recreate the Jules Studio website (https://www.julesstudio.co/) as a pixel-perfect, fully functional Next.js application with all animations, interactions, and responsive behavior.

**Original Website:** https://www.julesstudio.co/
**Tech Stack (Original):** Webflow
**Target Tech Stack:** Next.js 14+ (App Router), React, TypeScript, Tailwind CSS, Framer Motion

---

## DESIGN SYSTEM

### Color Palette
```css
/* Primary Colors */
--background-main: #E8E6DC;        /* Warm beige/cream page background */
--background-card: #F5F5F0;        /* Off-white card backgrounds */
--background-dark: #1A1A1A;        /* Dark sections/footer */
--text-primary: #1A1A1A;           /* Main text color */
--text-secondary: #666666;         /* Secondary/body text */
--text-light: #F5F5F0;             /* Text on dark backgrounds */
--accent-coral: #D4533F;           /* Coral/red accent for dots, underlines, icons */
--border-light: #D4D4D4;           /* Light borders */
--border-dark: #333333;            /* Borders on dark backgrounds */
```

### Typography
```css
/* Font Families */
--font-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;  /* Headlines */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;  /* Body */

/* Font Sizes */
--text-hero: 4rem / 64px;           /* Hero headline */
--text-section: 3rem / 48px;        /* Section headlines */
--text-subsection: 2rem / 32px;     /* Subsection headlines */
--text-body: 1rem / 16px;           /* Body text */
--text-small: 0.875rem / 14px;      /* Small text, labels */
--text-label: 0.75rem / 12px;       /* Pill labels */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
```

### Spacing & Layout
```css
/* Container */
--container-max: 1200px;
--container-padding: 1.5rem;        /* Mobile: 24px */
--container-padding-lg: 4rem;       /* Desktop: 64px */

/* Section Spacing */
--section-gap: 1.5rem;              /* Gap between sections */
--section-padding: 4rem;            /* Internal section padding */

/* Border Radius */
--radius-card: 24px;                /* Large cards/sections */
--radius-button: 9999px;            /* Pill buttons */
--radius-input: 12px;               /* Inputs, smaller cards */
```

---

## GLOBAL COMPONENTS

### 1. Navigation Bar (Sticky)
```
Layout: Fixed top, full width, centered content
Structure:
- Logo (left): "jules • studio" in sans-serif, font-medium
- Nav Links (center): "Home" (with active dot), "Work"
- CTA Button: "Book a Free Call" - black bg, white text, pill shape
- Language Toggle (right): "EN | ES" with active state underline

Behavior:
- Sticky on scroll
- Background becomes slightly opaque/blurred when scrolled
- Active link has small dot indicator (•) before text
```

### 2. Pill Labels
```
Used throughout for section labels
Style: Border 1px solid border-light, padding 8px 16px, border-radius 9999px
Font: 12px uppercase, letter-spacing 0.1em, font-medium
Variants: Light (on cream), Dark (on dark bg with border-dark)
```

### 3. Cards
```
Default Card Style:
- Background: background-card
- Border-radius: 24px
- Padding: 2rem
- Border: 1px solid border-light (optional)
```

### 4. Buttons
```
Primary (Black): bg-black, text-white, rounded-full, px-6 py-3
Secondary (Outline): border border-black, text-black, rounded-full, px-6 py-3
Light (White): bg-white/90, text-black, rounded-full, px-6 py-3
```

---

## SECTIONS BREAKDOWN

### SECTION 1: HERO
```
Layout: Two-column grid (55% text / 45% image) on desktop, stacked on mobile
Background: Cream gradient (subtle pinkish glow on left side)
Container: Large rounded card (24px radius) with overflow hidden

Left Column (Text):
- Pill Label: "OUR MISSION" (uppercase, small)
- Headline: "Designing for" (regular serif) + "results" (italic serif) + "."
- Service Tags: "WEB | Branding | ux/ui" separated by vertical lines
- Description: Body text explaining the studio

Right Column (Image):
- Professional headshot of woman in black blazer
- Image has rounded corners on left side (24px)
- Subtle shadow/depth

Animations:
- Fade in + slide up on page load (staggered: label → headline → tags → description)
- Image fades in from right
Duration: 0.6s ease-out
```

### SECTION 2: WHY CHOOSE JULES STUDIO
```
Layout: Centered content, 3-column grid for cards
Background: Off-white card background

Content:
- Pill Label: "WHY CHOOSE JULES STUDIO"
- Headline: "Results driven, budget smart" (serif)
- Three feature cards in a row:

Card 1: "Bang for your buck"
- Illustration: Line art of money/coins with stars
- Description: "High-quality design that looks expensive can be surprisingly affordable."

Card 2: "Unique Design"
- Illustration: Line art of computer with design tools
- Description: "Your business deserves more than a template..."

Card 3: "Converting Clicks"
- Illustration: Line art of charts/analytics
- Description: "Your digital tools should lead to success..."

Card Style:
- Border: 1px solid border-light
- Border-radius: 16px
- Padding: 2rem
- Text-align: center
- Hover: subtle scale(1.02) + shadow

Animations:
- Scroll-triggered fade-in-up
- Cards stagger in (0.1s delay between each)
```

### SECTION 3: SELECTED WORK (PORTFOLIO)
```
Layout: Mixed grid layout (asymmetric)
Background: Off-white card background

Content:
- Headline: "Selected work..." (serif, centered)
- Filter/Category tags: "Web design", "Branding", "Socials" (pill buttons)
- Project cards in bento-style grid:

Project Card Structure:
- Large image with rounded corners (16px)
- Project name overlay (serif, white text with text-shadow)
- Category tags (small pills)
- Hover: Image scales slightly, overlay darkens

Grid Layout:
- Row 1: Large card (60%) + Medium card (40%)
- Row 2: Two equal cards (50% each)
- Images have different aspect ratios for visual interest

Projects:
1. Horizon Interiors (large, dark overlay)
2. Adriano (phone mockup on wood)
3. Conservation Montgomery (laptop in grass)
4. Urban Wheels (cycling, outdoor)

Animations:
- Scroll-triggered fade-in
- Cards have parallax effect on scroll (subtle)
- Hover: scale(1.03), transition 0.4s ease
```

### SECTION 4: CLIENT LOGOS
```
Layout: Centered text + horizontal logo row
Background: Off-white card background

Content:
- Text: "We have worked with a wide range of clients and organizations, including:"
- Logo row (grayscale, evenly spaced):
  * AI (abstract logo)
  * ADRIANO (with "COMFORT ALL DAY" tagline)
  * Conservation Montgomery (with fern icon)
  * METROPOLITAN TOURING
  * AVNA

Logo Style:
- Grayscale filter
- Opacity: 0.6
- Hover: opacity 1, slight scale

Animations:
- Fade in on scroll
- Optional: infinite scroll animation for logos
```

### SECTION 5: HOW I CAN HELP YOU
```
Layout: Two-column (text left, image right)
Background: Off-white card background

Left Column:
- Headline: "How I" (regular) + "can help you..." (italic serif)
- Service list with dividers:
  * "Website Design, Development, & Maintenance"
    - Subtext: "E-commerce sites, marketing sites, and so much more"
  * "Elevating your Digital Presence"
    - Subtext: "Web + Socials to keep your brand consistent and polished"
  * "Branding Packages"
    - Subtext: "Clean, modern, consistent branding to enhance your organization's visuals"
- Each service has bottom border (divider)

Right Column:
- Brand style guide image showing:
  * Typography samples
  * Color palette
  * Logo variations
  * "Guía de Estilo" (style guide in Spanish)

Animations:
- Text slides in from left
- Image slides in from right
- Staggered service items
```

### SECTION 6: TESTIMONIALS
```
Layout: Centered carousel
Background: Off-white card background

Content:
- Pill Label: "TESTIMONIALS"
- Large quote text (serif, italic)
- Attribution: Name, Title, Company
- Circular avatar image below quote
- Navigation: Left/right arrows (circular, outlined)
- Indicator: "1/3" showing current slide

Carousel Behavior:
- Auto-play optional
- Smooth slide transition
- Arrows on sides

Testimonials:
1. Helen Wood, Conservation Montgomery Board Member
2. Sara Mastro, VP at Perceptronics Solutions, Inc.

Animations:
- Fade/slide transition between testimonials
- Quote text fades in
```

### SECTION 7: WHO WE LOVE TO WORK WITH
```
Layout: Full-width dark section
Background: Dark (#1A1A1A)
Border-radius: 24px

Content:
- Pill Label: "WHO WE LOVE TO WORK WITH" (dark variant)
- Client types in two rows, separated by coral dots:
  Row 1: "Non-Profits • Small Businesses • Startups • Event Planners"
  Row 2: "Ecommerce Businesses • Agencies • Personal Brands"

Text Style:
- Serif font
- Large size (2rem)
- White/cream color
- Coral/red dots (•) as separators

Animations:
- Fade in on scroll
- Text could have subtle typing or fade-in effect
```

### SECTION 8: WHAT WE BRING TO THE TABLE (SKILLS)
```
Layout: Two-column (image left, text right)
Background: Off-white card background

Left Column:
- Image of person writing in notebook, laptop nearby
- Rounded corners (24px)

Right Column:
- Headline: "What we bring to the table..." (serif)
- Two categories with coral dot bullets:

  Web Design (italic):
  • Design Systems
  • Website Design
  • Landing Pages
  • User Experience Design

  Brand Design (italic):
  • Visual Design
  • Logos & Visual Identity
  • Social Media Graphics
  • Presentation Decks
  • Colors & Typography

Animations:
- Scroll-triggered fade-in
- Skills list staggered appearance
```

### SECTION 9: MEET THE FOUNDER
```
Layout: Two-column (text left, image right)
Background: Dark (#1A1A1A)
Border-radius: 24px

Left Column:
- Pill Label: "MEET THE FOUNDER" (dark variant)
- Headline: "Inspired by creation, dedicated to harnessing the power of design."
- Bio paragraph about Julia, creator and Head of Design

Right Column:
- Professional headshot (same as hero)
- Full height of section
- Rounded corners on left side

Text Style:
- Headline: Serif, white
- Body: Sans-serif, light gray

Animations:
- Fade in on scroll
- Image could have parallax effect
```

### SECTION 10: FAQS
```
Layout: Centered, max-width 800px
Background: Off-white card background

Content:
- Headline: "FAQs" (serif, italic, large)
- Accordion items (4 questions):

  1. "What tools / platforms do you use?"
     - Answer about Figma, Shopify, WordPress, Webflow
  
  2. "Do you accept payment plans?"
     - Answer about payment plans being available
  
  3. "What is your price range?"
     - Answer about basic package starting at $600
  
  4. "I need design and development, do you do both?"
     - Answer about working with developers

Accordion Style:
- Question: Sans-serif, medium weight
- Plus icon on right (coral color)
- Bottom border on each item
- Expand/collapse animation
- Answer text: smaller, gray

Animations:
- Smooth height transition (0.3s ease)
- Plus icon rotates to X when open
- Content fades in
```

### SECTION 11: CTA - FREE DESIGN AUDIT
```
Layout: Centered content
Background: Off-white card background

Content:
- Subheadline: "Not sure where to start?"
- Headline: "Start with a" + "free" (italic, coral underline) + "design audit"
- Pill Label: "WHAT YOU RECEIVE"
- Two benefit cards:

  Card 1: "01"
  - "Comprehensive and detailed analysis of your landing page or brand."
  
  Card 2: "02"
  - "15-minute chat to discuss weaknesses and potential solutions."

- CTA Button: "Get Started" (black, pill)

Card Style:
- Border: 1px solid border-light
- Border-radius: 16px
- Padding: 1.5rem
- Number "01/02" centered above

Animations:
- Fade in on scroll
- Cards stagger in
```

### SECTION 12: FOOTER
```
Layout: Dark background, multi-column
Background: Dark (#1A1A1A)
Border-radius: 24px on top

Content:
Left Side:
- Headline: "Ready to bring your" + "ideas to life?" (italic)
- CTA Button: "Book a Free Call" (white bg, black text)

Right Side - Two columns:
Column 1 - "Work":
- Adriano
- Horizon Interiors
- Urban Wheels
- Conservation Montgomery

Column 2 - "Connect":
- Email
- Linkedin
- Instagram

Bottom Bar:
- "site design and development by jules studio."
- "Headshots by Victor maldonado"
- "Illustrations by claudia fuentes"
- All links underlined

Link Style:
- Sans-serif
- Gray color
- Underline on hover

Animations:
- Fade in on scroll
```

---

## ANIMATIONS & INTERACTIONS

### Global Scroll Animations
```javascript
// All sections fade in + slide up on scroll
const scrollAnimation = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
}

// Stagger children elements
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}
```

### Hover Effects
```javascript
// Cards
const cardHover = {
  scale: 1.02,
  transition: { duration: 0.3 }
}

// Portfolio images
const imageHover = {
  scale: 1.05,
  transition: { duration: 0.4 }
}

// Buttons
const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 }
}

// Links
const linkHover = {
  opacity: 0.7,
  transition: { duration: 0.2 }
}
```

### Accordion Animation
```javascript
const accordionAnimation = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: "easeInOut" }
}
```

### Carousel Animation
```javascript
const slideAnimation = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.4 }
}
```

---

## RESPONSIVE BREAKPOINTS

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small desktops */
--breakpoint-xl: 1280px;  /* Large desktops */

/* Key Responsive Changes */

/* Mobile (< 768px) */
- Single column layouts
- Stacked navigation (hamburger menu)
- Reduced font sizes (hero: 2.5rem)
- Full-width cards
- Hidden or simplified decorative elements

/* Tablet (768px - 1024px) */
- Two columns where applicable
- Side-by-side layouts
- Medium font sizes

/* Desktop (> 1024px) */
- Full multi-column layouts
- All animations enabled
- Maximum container width: 1200px
```

---

## FILE STRUCTURE

```
app/
├── page.tsx                    # Main homepage
├── layout.tsx                  # Root layout with fonts
├── globals.css                 # Global styles + CSS variables
├── sections/
│   ├── Hero.tsx
│   ├── WhyChoose.tsx
│   ├── SelectedWork.tsx
│   ├── ClientLogos.tsx
│   ├── HowICanHelp.tsx
│   ├── Testimonials.tsx
│   ├── WhoWeServe.tsx
│   ├── Skills.tsx
│   ├── MeetFounder.tsx
│   ├── FAQ.tsx
│   ├── DesignAuditCTA.tsx
│   └── Footer.tsx
├── components/
│   ├── Navigation.tsx
│   ├── PillLabel.tsx
│   ├── ServiceCard.tsx
│   ├── ProjectCard.tsx
│   ├── TestimonialCard.tsx
│   ├── Accordion.tsx
│   └── AnimatedSection.tsx
├── hooks/
│   └── useScrollAnimation.ts
└── lib/
    └── utils.ts

components/ui/                   # shadcn/ui components
├── button.tsx
├── accordion.tsx
├── carousel.tsx
└── ...

public/
├── images/
│   ├── hero-portrait.jpg
│   ├── founder-portrait.jpg
│   ├── notebook-image.jpg
│   ├── brand-guide.jpg
│   ├── projects/
│   │   ├── horizon-interiors.jpg
│   │   ├── adriano.jpg
│   │   ├── conservation-montgomery.jpg
│   │   └── urban-wheels.jpg
│   └── logos/
│       ├── ai.svg
│       ├── adriano.svg
│       ├── conservation-montgomery.svg
│       ├── metropolitan-touring.svg
│       └── avna.svg
└── illustrations/
    ├── bang-for-buck.svg
    ├── unique-design.svg
    └── converting-clicks.svg
```

---

## IMPLEMENTATION CHECKLIST

### Phase 1: Setup
- [ ] Initialize Next.js project with shadcn/ui
- [ ] Install dependencies: framer-motion, lucide-react
- [ ] Configure Tailwind with custom colors/fonts
- [ ] Set up Google Fonts (Playfair Display, Inter)
- [ ] Create global CSS variables

### Phase 2: Global Components
- [ ] Navigation (sticky, responsive)
- [ ] Pill Label component
- [ ] AnimatedSection wrapper
- [ ] Footer

### Phase 3: Sections (in order)
- [ ] Hero Section
- [ ] Why Choose Section
- [ ] Selected Work Section
- [ ] Client Logos Section
- [ ] How I Can Help Section
- [ ] Testimonials Section
- [ ] Who We Serve Section
- [ ] Skills Section
- [ ] Meet Founder Section
- [ ] FAQ Section
- [ ] Design Audit CTA Section

### Phase 4: Animations & Polish
- [ ] Implement scroll animations (Framer Motion)
- [ ] Add hover effects
- [ ] Test responsive behavior
- [ ] Optimize images
- [ ] Add loading states

### Phase 5: Testing & Deployment
- [ ] Test all interactions
- [ ] Verify responsive design
- [ ] Check accessibility
- [ ] Build and deploy

---

## KEY IMPLEMENTATION NOTES

1. **Typography:** Use `next/font` to load Playfair Display and Inter for optimal performance

2. **Animations:** Use Framer Motion's `whileInView` for scroll-triggered animations

3. **Images:** Use `next/image` with proper sizing and lazy loading

4. **Accordion:** Use shadcn/ui Accordion component with custom styling

5. **Carousel:** Use shadcn/ui Carousel or implement custom with Framer Motion

6. **Responsive:** Mobile-first approach, test on all breakpoints

7. **Performance:** 
   - Lazy load below-fold sections
   - Optimize images (WebP format)
   - Use `will-change` on animated elements

8. **Accessibility:**
   - Proper heading hierarchy
   - Alt text for images
   - Keyboard navigation
   - Focus states

---

## EXAMPLE CODE PATTERNS

### Animated Section Wrapper
```tsx
"use client";
import { motion } from "framer-motion";

export function AnimatedSection({ children, className }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
```

### Pill Label Component
```tsx
interface PillLabelProps {
  children: React.ReactNode;
  variant?: "light" | "dark";
}

export function PillLabel({ children, variant = "light" }: PillLabelProps) {
  return (
    <span className={cn(
      "inline-block px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider border",
      variant === "light" 
        ? "border-[#D4D4D4] text-[#1A1A1A]" 
        : "border-[#333333] text-[#F5F5F0]"
    )}>
      {children}
    </span>
  );
}
```

### Section Card Container
```tsx
export function SectionCard({ children, className, dark = false }) {
  return (
    <div className={cn(
      "rounded-3xl p-8 md:p-12 lg:p-16",
      dark ? "bg-[#1A1A1A]" : "bg-[#F5F5F0]",
      className
    )}>
      {children}
    </div>
  );
}
```

---

## QUALITY CHECKLIST

Before considering the project complete, verify:

- [ ] All 12 sections are implemented
- [ ] Navigation is sticky and functional
- [ ] All animations work smoothly (60fps)
- [ ] Hover effects on all interactive elements
- [ ] Responsive on mobile, tablet, desktop
- [ ] FAQ accordion expands/collapses
- [ ] Testimonial carousel navigates
- [ ] All images load correctly
- [ ] Typography matches original (serif headlines)
- [ ] Colors match the design system
- [ ] Spacing and layout are pixel-perfect
- [ ] No console errors
- [ ] Lighthouse score > 90

---

## ADDITIONAL RESOURCES

**Reference Screenshots:** (See attached images)
- Homepage full screenshot
- Individual section screenshots
- Mobile view screenshots (if available)

**Original Website:** https://www.julesstudio.co/

**Tech Stack Documentation:**
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- shadcn/ui: https://ui.shadcn.com/

---

END OF PROMPT
