# Jules Studio Website - Design Analysis & Documentation

## Website Overview

| Property | Value |
|----------|-------|
| **Website URL** | https://www.julesstudio.co/ |
| **Original Platform** | Webflow |
| **Industry** | Design Studio / Portfolio |
| **Services** | Web Design, Branding, UX/UI |

---

## Visual Identity

### Color Palette

| Color Name | HEX Value | Usage |
|------------|-----------|-------|
| **Warm Beige (Main BG)** | `#E8E6DC` | Page background |
| **Off-White (Card BG)** | `#F5F5F0` | Card backgrounds, sections |
| **Dark Charcoal** | `#1A1A1A` | Dark sections, footer, primary text |
| **Coral/Red Accent** | `#D4533F` | Accent dots, underlines, icons |
| **Light Gray** | `#D4D4D4` | Borders, dividers |
| **Medium Gray** | `#666666` | Secondary text |
| **Dark Border** | `#333333` | Borders on dark backgrounds |

### Typography

| Element | Font Family | Weight | Size | Style |
|---------|-------------|--------|------|-------|
| **Hero Headline** | Playfair Display / Georgia | 400 | 64px | Serif |
| **Hero Italic** | Playfair Display / Georgia | 400 | 64px | Italic |
| **Section Headlines** | Playfair Display / Georgia | 400 | 48px | Serif |
| **Subsection** | Playfair Display / Georgia | 400 | 32px | Serif/Italic |
| **Body Text** | Inter / System | 400 | 16px | Sans-serif |
| **Labels/Pills** | Inter / System | 500 | 12px | Uppercase |
| **Navigation** | Inter / System | 500 | 14px | Sans-serif |

---

## Website Structure

### Section Breakdown (12 Total Sections)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. NAVIGATION (Sticky)                                       │
│    - Logo | Home • Work | Book a Free Call | EN | ES        │
├─────────────────────────────────────────────────────────────┤
│ 2. HERO SECTION                                              │
│    - Mission label | Headline | Service tags | Portrait     │
├─────────────────────────────────────────────────────────────┤
│ 3. WHY CHOOSE JULES STUDIO                                   │
│    - Label | Headline | 3 Feature Cards with Illustrations  │
├─────────────────────────────────────────────────────────────┤
│ 4. SELECTED WORK (Portfolio)                                 │
│    - Headline | Filter tags | Bento grid of projects        │
├─────────────────────────────────────────────────────────────┤
│ 5. CLIENT LOGOS                                              │
│    - Text | Logo row (AI, Adriano, Conservation, etc.)      │
├─────────────────────────────────────────────────────────────┤
│ 6. HOW I CAN HELP YOU                                        │
│    - Headline | Service list | Brand guide image            │
├─────────────────────────────────────────────────────────────┤
│ 7. TESTIMONIALS                                              │
│    - Label | Quote carousel | Avatar | Navigation           │
├─────────────────────────────────────────────────────────────┤
│ 8. WHO WE LOVE TO WORK WITH (Dark Section)                   │
│    - Label | Client types with coral dot separators         │
├─────────────────────────────────────────────────────────────┤
│ 9. WHAT WE BRING TO THE TABLE (Skills)                       │
│    - Image | Headline | Skills list with coral bullets      │
├─────────────────────────────────────────────────────────────┤
│ 10. MEET THE FOUNDER (Dark Section)                          │
│    - Label | Headline | Bio | Portrait                      │
├─────────────────────────────────────────────────────────────┤
│ 11. FAQS                                                     │
│    - Headline | Accordion with 4 questions                  │
├─────────────────────────────────────────────────────────────┤
│ 12. DESIGN AUDIT CTA                                         │
│    - Subheadline | Headline | Benefit cards | CTA button    │
├─────────────────────────────────────────────────────────────┤
│ 13. FOOTER (Dark)                                            │
│    - CTA headline | Work links | Connect links | Credits    │
└─────────────────────────────────────────────────────────────┘
```

---

## Section Details

### 1. Navigation Bar

**Layout:** Fixed, full-width, sticky
**Height:** ~64px
**Background:** Transparent → Blurred white on scroll

**Elements:**
- **Logo (Left):** "jules • studio" - Sans-serif, medium weight
- **Nav Links (Center):** Home (active with dot), Work
- **CTA Button:** "Book a Free Call" - Black bg, white text, pill shape
- **Language Toggle (Right):** "EN | ES" - Underline on active

**Interactions:**
- Sticky on scroll
- Background opacity/blur transition
- Hover states on links

---

### 2. Hero Section

**Layout:** Two-column (55%/45%)
**Background:** Cream with subtle pinkish gradient on left
**Container:** Large rounded card (24px radius)

**Left Column:**
- Pill label: "OUR MISSION"
- Headline: "Designing for *results*." (* = italic)
- Service tags: "WEB | Branding | ux/ui"
- Description paragraph

**Right Column:**
- Professional portrait (woman, black blazer)
- Rounded corners on left edge

**Animations:**
- Staggered fade-in on load
- Text slides up
- Image fades in from right

---

### 3. Why Choose Jules Studio

**Layout:** Centered, 3-column grid
**Background:** Off-white card

**Content:**
- Pill label: "WHY CHOOSE JULES STUDIO"
- Headline: "Results driven, budget smart"
- 3 feature cards:
  1. "Bang for your buck" + illustration
  2. "Unique Design" + illustration
  3. "Converting Clicks" + illustration

**Card Style:**
- Border: 1px solid #D4D4D4
- Border-radius: 16px
- Centered content
- Hover: scale(1.02)

---

### 4. Selected Work (Portfolio)

**Layout:** Bento-style asymmetric grid
**Background:** Off-white card

**Content:**
- Headline: "Selected work..."
- Category pills: "Web design", "Branding", "Socials"
- 4 project cards:
  1. Horizon Interiors (large, dark overlay)
  2. Adriano (phone mockup)
  3. Conservation Montgomery (laptop)
  4. Urban Wheels (outdoor cycling)

**Card Features:**
- Rounded corners (16px)
- Project name overlay (serif, white)
- Category tags
- Hover: scale image, darken overlay

---

### 5. Client Logos

**Layout:** Centered text + horizontal row
**Background:** Off-white card

**Logos:**
- AI (abstract)
- ADRIANO (with tagline)
- Conservation Montgomery (with fern)
- METROPOLITAN TOURING
- AVNA

**Style:**
- Grayscale
- 60% opacity
- Hover: 100% opacity

---

### 6. How I Can Help You

**Layout:** Two-column (text/image)
**Background:** Off-white card

**Left:**
- Headline: "How I *can help you...*" (* = italic)
- 3 services with dividers:
  - Website Design, Development, & Maintenance
  - Elevating your Digital Presence
  - Branding Packages

**Right:**
- Brand style guide image
- Shows typography, colors, logos

---

### 7. Testimonials

**Layout:** Centered carousel
**Background:** Off-white card

**Content:**
- Pill label: "TESTIMONIALS"
- Large quote (serif, italic)
- Attribution (name, title, company)
- Circular avatar
- Navigation arrows
- Slide indicator ("1/3")

**Testimonials:**
1. Helen Wood - Conservation Montgomery
2. Sara Mastro - Perceptronics Solutions

---

### 8. Who We Love To Work With

**Layout:** Full-width dark section
**Background:** #1A1A1A
**Border-radius:** 24px

**Content:**
- Pill label: "WHO WE LOVE TO WORK WITH"
- Client types in two rows:
  - Row 1: Non-Profits • Small Businesses • Startups • Event Planners
  - Row 2: Ecommerce Businesses • Agencies • Personal Brands

**Style:**
- Serif font, large
- Coral dots (•) as separators
- White/cream text

---

### 9. What We Bring To The Table

**Layout:** Two-column (image/text)
**Background:** Off-white card

**Left:**
- Image: Person writing in notebook

**Right:**
- Headline: "What we bring to the table..."
- Web Design skills (italic)
- Brand Design skills (italic)
- Coral dot bullets

---

### 10. Meet The Founder

**Layout:** Two-column (text/image)
**Background:** Dark (#1A1A1A)
**Border-radius:** 24px

**Left:**
- Pill label: "MEET THE FOUNDER"
- Headline: "Inspired by creation, dedicated to harnessing the power of design."
- Bio paragraph

**Right:**
- Professional portrait
- Full height

---

### 11. FAQs

**Layout:** Centered, max-width 800px
**Background:** Off-white card

**Content:**
- Headline: "*FAQs*" (* = italic, large)
- 4 accordion items:
  1. What tools / platforms do you use?
  2. Do you accept payment plans?
  3. What is your price range?
  4. I need design and development, do you do both?

**Accordion Style:**
- Question + plus icon (coral)
- Bottom border
- Smooth expand/collapse

---

### 12. Design Audit CTA

**Layout:** Centered
**Background:** Off-white card

**Content:**
- Subheadline: "Not sure where to start?"
- Headline: "Start with a *free* design audit" (* = italic, coral underline)
- Pill label: "WHAT YOU RECEIVE"
- 2 benefit cards (01, 02)
- CTA button: "Get Started"

---

### 13. Footer

**Layout:** Dark, multi-column
**Background:** #1A1A1A
**Border-radius:** 24px (top only)

**Left:**
- Headline: "Ready to bring your *ideas to life?*" (* = italic)
- CTA button: "Book a Free Call"

**Right:**
- Work column: Adriano, Horizon Interiors, Urban Wheels, Conservation Montgomery
- Connect column: Email, Linkedin, Instagram

**Bottom:**
- Credits: site design, headshots, illustrations

---

## Animation Patterns

### Scroll Animations
| Animation | Trigger | Duration | Easing |
|-----------|---------|----------|--------|
| Fade in + slide up | Scroll into view | 0.6s | ease-out |
| Stagger children | Parent in view | 0.1s delay | ease-out |
| Parallax images | Scroll | Continuous | linear |

### Hover Effects
| Element | Effect | Duration |
|---------|--------|----------|
| Cards | scale(1.02) | 0.3s |
| Portfolio images | scale(1.05) | 0.4s |
| Buttons | scale(1.05) | 0.2s |
| Links | opacity(0.7) | 0.2s |

### Interaction Animations
| Component | Animation | Duration |
|-----------|-----------|----------|
| Accordion | Height expand/collapse | 0.3s |
| Carousel | Slide + fade | 0.4s |
| Plus icon | Rotate to X | 0.3s |

---

## Tech Stack Analysis

### Original Implementation
| Technology | Confidence | Evidence |
|------------|------------|----------|
| **Webflow** | High | Listed on Awwwards Webflow websites |
| **Custom CSS** | High | Unique styling patterns |
| **JavaScript** | High | Carousel, accordion functionality |

### Recommended Recreation Stack
| Technology | Purpose |
|------------|---------|
| **Next.js 14+** | React framework, App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **shadcn/ui** | UI components |
| **Lucide React** | Icons |

---

## Responsive Behavior

### Breakpoints
| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile | < 768px | Single column, stacked nav |
| Tablet | 768-1024px | Two columns |
| Desktop | > 1024px | Full layout |

### Mobile Adaptations
- Navigation → Hamburger menu
- Hero → Stacked (text above image)
- Portfolio → Single column
- Cards → Full width
- Reduced font sizes

---

## Asset Requirements

### Images Needed
| Asset | Type | Location |
|-------|------|----------|
| Hero portrait | Photo | /images/hero-portrait.jpg |
| Founder portrait | Photo | /images/founder-portrait.jpg |
| Notebook image | Photo | /images/notebook-image.jpg |
| Brand guide | Photo | /images/brand-guide.jpg |
| Project images | Photos | /images/projects/*.jpg |
| Client logos | SVG | /images/logos/*.svg |

### Illustrations Needed
| Asset | Description |
|-------|-------------|
| bang-for-buck.svg | Money/coins with stars |
| unique-design.svg | Computer with design tools |
| converting-clicks.svg | Charts/analytics |

---

## Key Design Principles

1. **Minimalist Elegance** - Generous whitespace, clean lines
2. **Typography Contrast** - Serif headlines, sans-serif body
3. **Warm Color Palette** - Beige/cream backgrounds, not pure white
4. **Rounded Corners** - 16-24px radius on all cards
5. **Consistent Spacing** - 1.5rem gaps between sections
6. **Subtle Animations** - Smooth, not flashy
7. **High-Quality Imagery** - Professional photos throughout

---

## Quality Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 90 |
| Lighthouse Best Practices | > 90 |
| Lighthouse SEO | > 90 |
| Animation FPS | 60fps |
| Time to Interactive | < 3s |

---

## Additional Notes

- Website supports bilingual content (EN/ES)
- All sections have rounded card containers
- Dark sections use inverted color scheme
- Coral accent used sparingly for emphasis
- Illustrations are line-art style
- Portfolio has hover overlay effects
- Testimonials are in a carousel

---

*Analysis completed on 2026-02-10*
*Original website: https://www.julesstudio.co/*
