# Dr. Riaño Orthodontics

A modern, responsive website for Dr. Riaño Orthodontics, featuring locations in San Francisco and Sonoma, California.

## Overview

This website provides comprehensive information about orthodontic services, including:

- **Service Information** - Details on braces, clear aligners, retainers, and advanced treatments
- **Patient Flows** - Interactive wizards for appointments, referrals, and virtual care
- **Educational Content** - Blog articles and resources for patients
- **Location Information** - Details for both San Francisco and Sonoma offices

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll:** [Lenis](https://lenis.studiofreight.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd docrianos-orthodontics
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── sections/           # Page section components
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Testimonials.tsx
│   └── ...
├── about/             # About page
├── blog/              # Blog pages
├── contact/           # Contact pages (SF & Sonoma)
├── referrals/         # Doctor referral flow
├── smile-assessment/  # Patient assessment wizard
├── virtual-care/      # Virtual care signup
├── page.tsx           # Homepage
├── layout.tsx         # Root layout
└── globals.css        # Global styles

components/
├── ui/               # shadcn/ui components
├── ContactFlow.tsx   # Multi-step contact form
├── ReferralFlow.tsx  # Doctor referral form
├── SmileAssessmentFlow.tsx
├── VirtualCareFlow.tsx
├── Navigation.tsx
└── ...

public/
└── images/           # Static images
```

## Key Features

### Interactive Patient Flows

The site includes four sophisticated multi-step forms:

1. **Contact Flow** - Appointment booking with intelligent branching
2. **Referral Flow** - Doctor-to-doctor patient referrals
3. **Smile Assessment** - Comprehensive patient intake (13 steps)
4. **Virtual Care** - Remote orthodontic care signup

### Dark Mode Support

Full dark mode implementation with system preference detection and manual toggle.

### Responsive Design

Mobile-first design that works seamlessly across all device sizes.

### Smooth Animations

- GSAP ScrollTrigger for scroll-based animations
- Framer Motion for component transitions
- Lenis for smooth scrolling

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Contact form endpoint (e.g., Resend, SendGrid, or CRM webhook)
CONTACT_API_URL=

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=
```

## Deployment

This site is optimized for deployment on [Vercel](https://vercel.com):

```bash
npm run build
```

## License

Private - Dr. Riaño Orthodontics

## Credits

- Site design and development for Dr. Riaño Orthodontics
- Headshots by [Victor Maldonado](https://vicphotoss.myportfolio.com/work)
- Illustrations by [Claudia Fuentes](https://www.claudiafuentes.art/)
