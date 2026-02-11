# Data-Driven Next.js Architecture

## Overview

This project uses a **centralized data-driven architecture** for content management. All site content—navigation, pages, sections, images, and metadata—is stored in a single configuration file that acts as the "source of truth."

## Quick Start

1. **Edit content** in `src/data/site-data.ts`
2. **Type-safe** with TypeScript definitions in `src/data/types.ts`
3. **Render pages** using `SectionMapper` component
4. **Reorder sections** by moving items in the `sections` array

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         site-data.ts                                │
│                    (Single Source of Truth)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐│
│  │   Global    │  │  Navigation │  │   Pages     │  │   Blog      ││
│  │   Config    │  │   & Footer  │  │  (Routes)   │  │   Posts     ││
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘│
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      SectionMapper.tsx                               │
│                    (Component Router)                                │
│  Maps section.type → React Component                                  │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Section Components                               │
│  Hero │ Services │ Testimonials │ FAQ │ CTA │ Contact │ ...          │
└─────────────────────────────────────────────────────────────────────┘
```

## File Structure

```
src/
├── data/
│   ├── site-data.ts      # All site content & configuration
│   └── types.ts           # TypeScript type definitions
├── components/
│   ├── SectionMapper.tsx  # Dynamic section renderer
│   ├── Navigation.tsx     # Imports nav from site-data
│   ├── Footer.tsx         # Imports footer from site-data
│   └── ...
├── app/
│   ├── sections/          # Reusable section components
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   └── ...
│   ├── page.tsx           # Home page
│   ├── about/page.tsx     # About page
│   └── ...
```

## How It Works

### 1. Centralized Data (`site-data.ts`)

The `siteConfig` object contains:
- **Global config**: metadata, branding, navigation, locations
- **Page data**: route-specific content with sections array

```typescript
export const siteConfig: SiteConfig = {
  metadata: { /* ... */ },
  navigation: { /* ... */ },
  locations: { /* ... */ },
  // ...
};

export const pageData: Record<string, PageData> = {
  '/': {
    route: '/',
    metadata: { /* ... */ },
    sections: [
      { type: 'hero', content: { /* ... */ } },
      { type: 'services', content: { /* ... */ } },
      // Add/remove/reorder sections here
    ],
  },
};
```

### 2. Component Mapper Pattern

The `SectionMapper` iterates through sections and renders the matching component:

```typescript
const SectionMap = {
  hero: Hero,
  services: Services,
  testimonials: Testimonials,
  // ...
};

export function SectionMapper({ sections }: { sections: PageSection[] }) {
  return sections.map((section) => {
    const Component = SectionMap[section.type];
    return <Component key={section.id} {...section} />;
  });
}
```

### 3. Page Implementation

Pages import data and pass to SectionMapper:

```typescript
import { getPageData } from '@/data/site-data';
import { SectionMapper } from '@/components/SectionMapper';

export default function HomePage() {
  const pageData = getPageData('/');
  return <SectionMapper sections={pageData.sections} />;
}
```

## Section Types

| Type | Component | Description |
|------|-----------|-------------|
| `hero` | Hero | Full-screen hero with background image |
| `text` | TextPlaceholder | Text content with optional CTAs |
| `image` | ImagePlaceholder | Single image with caption |
| `services` | Services | Service cards grid |
| `testimonials` | Testimonials | Patient testimonials carousel/grid |
| `faq` | FAQ | Accordion-style FAQ section |
| `cta` | CtaPlaceholder | Call-to-action section |
| `grid` | GridPlaceholder | Generic grid of items |
| `feature` | FeaturePlaceholder | Feature list with icons |
| `contact` | ContactFooter | Contact form and locations |
| `banner` | BannerPlaceholder | Dismissible announcement banner |

## Adding New Content

### Add a New Section to Existing Page

Edit `src/data/site-data.ts`:

```typescript
'/': {
  sections: [
    // ... existing sections
    {
      type: 'cta',
      id: 'newsletter-signup',
      padding: 'lg',
      content: {
        headline: 'Stay Updated',
        headlineAccent: 'Newsletter',
        description: 'Get orthodontic tips and updates.',
        ctas: [
          { label: 'Sign Up', href: '/newsletter', variant: 'primary' }
        ],
        layout: 'centered',
      },
    },
  ],
}
```

### Add a New Page

```typescript
export const pageData: Record<string, PageData> = {
  // ... existing pages
  '/new-page': {
    route: '/new-page',
    metadata: {
      title: 'New Page Title',
      description: 'Page description',
    },
    sections: [
      {
        type: 'hero',
        id: 'new-page-hero',
        content: { /* ... */ },
      },
    ],
  },
};
```

### Create a New Section Type

1. Add type to `types.ts`:

```typescript
export type SectionType =
  | 'hero'
  | 'text'
  // ...
  | 'video'; // Add new type
```

2. Add section interface:

```typescript
export interface VideoSection extends SectionBase {
  type: 'video';
  content: {
    url: string;
    autoplay?: boolean;
    controls?: boolean;
  };
}
```

3. Create component in `src/app/sections/Video.tsx`:

```typescript
export function Video({ content, className }: VideoSection) {
  return (
    <section className={className}>
      <video src={content.url} autoPlay={content.autoplay} />
    </section>
  );
}
```

4. Add to `SectionMapper.tsx`:

```typescript
const SectionMap = {
  // ...
  video: Video,
};
```

## Reordering Page Layout

Simply move section objects in the array:

```typescript
// BEFORE: Hero → Services → CTA
sections: [
  { type: 'hero', ... },
  { type: 'services', ... },
  { type: 'cta', ... },
]

// AFTER: Hero → CTA → Services (CTA appears before services)
sections: [
  { type: 'hero', ... },
  { type: 'cta', ... },
  { type: 'services', ... },
]
```

## Using Data in Components

### Import Site Config

```typescript
import { siteConfig } from '@/data/site-data';

function Navigation() {
  const { main } = siteConfig.navigation;
  return (
    <nav>
      {main.map(link => <Link href={link.href}>{link.label}</Link>)}
    </nav>
  );
}
```

### Get Location Data

```typescript
import { getLocation } from '@/data/site-data';

function ContactCard({ locationId }: { locationId: string }) {
  const location = getLocation(locationId);
  if (!location) return null;

  return (
    <div>
      <h3>{location.name}</h3>
      <p>{location.contact.phoneDisplay}</p>
    </div>
  );
}
```

### Get Page Metadata

```typescript
import { getPageData } from '@/data/site-data';

export async function generateMetadata() {
  const pageData = getPageData('/about');
  return {
    title: pageData?.metadata.title,
    description: pageData?.metadata.description,
  };
}
```

## Best Practices

1. **Keep content in `site-data.ts`** - Don't hardcopy text in components
2. **Use descriptive IDs** - Helps with scroll linking and analytics
3. **Leverage padding/background** - Use built-in styling options
4. **Type safety** - Always use types from `types.ts`
5. **Image optimization** - Include width/height for Next.js Image component
6. **CTA consistency** - Use the `CtaButton` type for all call-to-actions

## Migration Guide

### Converting Existing Pages to Data-Driven

1. **Identify sections** in current page
2. **Create section objects** in `site-data.ts`
3. **Replace page content** with `<SectionMapper sections={pageData.sections} />`

Example conversion:

```typescript
// BEFORE (hardcoded)
export default function AboutPage() {
  return (
    <>
      <Hero title="About Us" />
      <Features items={features} />
      <Testimonials reviews={reviews} />
    </>
  );
}

// AFTER (data-driven)
export default function AboutPage() {
  const pageData = getPageData('/about');
  return <SectionMapper sections={pageData.sections} />;
}
```

## Benefits

| Feature | Benefit |
|---------|---------|
| **Single source of truth** | Edit content in one place |
| **Type safety** | Catch errors at compile time |
| **Easy reordering** | Move sections in the array |
| **Content management** | Non-developers can edit JSON/TS |
| **Consistent styling** | Reusable section patterns |
| **SEO optimization** | Centralized metadata |
| **Easy maintenance** | Clear separation of concerns |

## Advanced Usage

### Conditional Sections

```typescript
sections: [
  {
    type: 'banner',
    id: 'promo',
    content: { /* ... */ },
    // Component checks for enabled flag
  },
]
```

### Dynamic Content from API

```typescript
export async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch('/api/blog');
  return res.json();
}

// Then merge with static data in page
```

### A/B Testing

```typescript
const heroVariants = {
  a: heroDataA,
  b: heroDataB,
};

sections: [
  {
    type: 'hero',
    id: 'hero',
    content: Math.random() > 0.5 ? heroVariants.a : heroVariants.b,
  },
]
```

## Related Files

- `src/data/site-data.ts` - Site configuration
- `src/data/types.ts` - TypeScript definitions
- `src/components/SectionMapper.tsx` - Component router
- `src/app/template/page.tsx` - Example page implementation

## Support

For questions or issues:
1. Check this documentation
2. Review type definitions in `types.ts`
3. Examine existing pages for patterns
