/**
 * Type definitions for Dr. Riaño Orthodontics site data
 * Centralized type safety for all site content
 */

// ============================================================================
// GLOBAL CONFIGURATION TYPES
// ============================================================================

export interface SiteConfig {
  metadata: SiteMetadata;
  branding: SiteBranding;
  navigation: NavigationConfig;
  footer: FooterConfig;
  locations: LocationConfig;
  contact: ContactConfig;
  social: SocialConfig;
  seo: SeoConfig;
}

export interface SiteMetadata {
  siteName: string;
  siteNameFull: string;
  tagline: string;
  defaultTitle: string;
  defaultDescription: string;
  domain: string;
  locale: string;
}

export interface SiteBranding {
  colors: BrandColors;
  fonts: BrandFonts;
  logo: BrandLogo;
}

export interface BrandColors {
  primary: string;      // coral #d4533f
  secondary: string;    // dark #1a1a1a
  accent: string;       // cream #e8e6dc
  success: string;      // green #16a34a
  text: TextColors;
  background: BackgroundColors;
}

export interface TextColors {
  primary: string;
  secondary: string;
  muted: string;
  inverted: string;
}

export interface BackgroundColors {
  default: string;
  card: string;
  secondary: string;
  elevated: string;
}

export interface BrandFonts {
  serif: FontConfig;
  sans: FontConfig;
  accent: FontConfig;
}

export interface FontConfig {
  name: string;
  variable: string;
  weights: number[];
  styles: string[];
}

export interface BrandLogo {
  text: string;
  url: string;
  icon?: string;
  width: number;
  height: number;
}

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export interface NavigationConfig {
  main: NavLink[];
  mobile: NavLink[];
  cta?: CallToAction;
  languages: LanguageConfig;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  children?: NavLink[];
  badge?: string;
  variant?: 'default' | 'overlay' | 'highlight';
}

export interface CallToAction {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface LanguageConfig {
  default: string;
  available: LanguageOption[];
}

export interface LanguageOption {
  code: string;
  label: string;
  href?: string;
}

// ============================================================================
// FOOTER TYPES
// ============================================================================

export interface FooterConfig {
  columns: FooterColumn[];
  bottom: FooterBottom;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterBottom {
  copyright: string;
  legalLinks: FooterLink[];
  certification?: string;
}

// ============================================================================
// LOCATION TYPES
// ============================================================================

export interface LocationConfig {
  default: string;
  offices: OfficeLocation[];
}

export interface OfficeLocation {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  contact: ContactInfo;
  address: Address;
  hours: HoursSchedule;
  mapUrl?: string;
  directionsUrl?: string;
  timezone?: string;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  email: string;
  sms?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  full: string;
}

export interface HoursSchedule {
  [key: string]: DayHours | string;
}

export interface DayHours {
  open?: string;
  close?: string;
  closed?: boolean;
  label?: string;
}

export interface ContactConfig {
  formEndpoint: string;
  intakeForms: {
    newPatient: string;
    recordsRelease: string;
    referral?: string;
  };
  emergencyContact?: {
    phone: string;
    availability: string;
  };
}

// ============================================================================
// SOCIAL TYPES
// ============================================================================

export interface SocialConfig {
  platforms: SocialPlatform[];
  reviewPlatforms?: ReviewPlatform[];
}

export interface SocialPlatform {
  name: string;
  url: string;
  icon: string;
  label: string;
}

export interface ReviewPlatform {
  name: string;
  url: string;
  rating?: number;
  reviewCount?: number;
}

// ============================================================================
// SEO TYPES
// ============================================================================

export interface SeoConfig {
  robots: SeoRobots;
  sitemap: boolean;
  structuredData: StructuredDataConfig;
}

export interface SeoRobots {
  index: boolean;
  follow: boolean;
  crawlDelay?: number;
}

export interface StructuredDataConfig {
  organization: boolean;
  localBusiness: boolean;
  dentist: boolean;
}

// ============================================================================
// PAGE TYPES
// ============================================================================

export interface PageData {
  route: string;
  metadata: PageMetadata;
  sections: PageSection[];
}

export interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

export type PageSection =
  | HeroSection
  | TextSection
  | ImageSection
  | ServicesSection
  | TestimonialsSection
  | FaqSection
  | CtaSection
  | GridSection
  | FeatureSection
  | ContactSection
  | BannerSection;

// Section type discriminator
export interface SectionBase {
  type: SectionType;
  id: string;
  className?: string;
  container?: boolean;
  padding?: PaddingOptions;
  background?: BackgroundOptions;
}

export type SectionType =
  | 'hero'
  | 'text'
  | 'image'
  | 'services'
  | 'testimonials'
  | 'faq'
  | 'cta'
  | 'grid'
  | 'feature'
  | 'contact'
  | 'banner';

export type PaddingOptions = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type BackgroundOptions = 'default' | 'primary' | 'secondary' | 'accent' | 'gradient' | 'image';

// ============================================================================
// SECTION SPECIFIC TYPES
// ============================================================================

export interface HeroSection extends SectionBase {
  type: 'hero';
  content: HeroContent;
  backgroundImage?: ImageAsset;
  overlay?: OverlayOptions;
  alignment?: 'left' | 'center' | 'right';
}

export interface HeroContent {
  badge?: string;
  headline: string;
  headlineAccent?: string;
  subheadline?: string;
  description?: string;
  ctas?: CtaButton[];
  scrollIndicator?: boolean;
}

export interface CtaButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
}

export interface OverlayOptions {
  enabled: boolean;
  opacity: number;
  color?: string;
  gradient?: boolean;
}

export interface TextSection extends SectionBase {
  type: 'text';
  content: TextContent;
  layout?: 'centered' | 'left' | 'split';
}

export interface TextContent {
  badge?: string;
  headline?: string;
  headlineAccent?: string;
  body: string;
  html?: boolean;
  ctas?: CtaButton[];
}

export interface ImageSection extends SectionBase {
  type: 'image';
  content: ImageContent;
}

export interface ImageContent {
  image: ImageAsset;
  caption?: string;
  aspectRatio?: '16:9' | '4:3' | '3:2' | '1:1' | '21:9';
  rounded?: boolean;
  shadow?: boolean;
}

export interface ServicesSection extends SectionBase {
  type: 'services';
  content: ServicesContent;
}

export interface ServicesContent {
  badge?: string;
  headline?: string;
  headlineAccent?: string;
  services: ServiceCard[];
  grid?: GridOptions;
}

export interface ServiceCard {
  title: string;
  slug: string;
  description: string;
  image: ImageAsset;
  category?: ServiceCategory;
  featured?: boolean;
  badge?: string;
}

export type ServiceCategory =
  | 'braces'
  | 'clear-aligners'
  | 'retainers'
  | 'advanced'
  | 'diagnostics'
  | 'other';

export interface TestimonialsSection extends SectionBase {
  type: 'testimonials';
  content: TestimonialsContent;
}

export interface TestimonialsContent {
  badge?: string;
  headline?: string;
  headlineAccent?: string;
  testimonials: TestimonialCard[];
  layout?: 'grid' | 'carousel' | 'masonry';
}

export interface TestimonialCard {
  id: string;
  quote: string;
  author: string;
  role?: string;
  image?: ImageAsset;
  rating?: number;
  location?: string;
  treatment?: string;
  verified?: boolean;
}

export interface FaqSection extends SectionBase {
  type: 'faq';
  content: FaqContent;
}

export interface FaqContent {
  badge?: string;
  headline?: string;
  headlineAccent?: string;
  categories?: FaqCategory[];
  FAQs: FaqItem[];
}

export interface FaqCategory {
  id: string;
  name: string;
  icon?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  html?: boolean;
  category?: string;
  related?: string[];
}

export interface CtaSection extends SectionBase {
  type: 'cta';
  content: CtaContent;
}

export interface CtaContent {
  headline: string;
  headlineAccent?: string;
  description?: string;
  ctas: CtaButton[];
  layout?: 'centered' | 'split' | 'full-width';
  image?: ImageAsset;
}

export interface GridSection extends SectionBase {
  type: 'grid';
  content: GridContent;
}

export interface GridContent {
  columns: number;
  items: GridItem[];
  gap?: 'sm' | 'md' | 'lg';
}

export interface GridItem {
  title?: string;
  description?: string;
  image?: ImageAsset;
  icon?: string;
  link?: string;
}

export interface FeatureSection extends SectionBase {
  type: 'feature';
  content: FeatureContent;
}

export interface FeatureContent {
  badge?: string;
  headline?: string;
  headlineAccent?: string;
  description?: string;
  features: FeatureItem[];
  layout?: 'horizontal' | 'vertical' | 'alternating';
  image?: ImageAsset;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: ImageAsset;
}

export interface ContactSection extends SectionBase {
  type: 'contact';
  content: ContactSectionContent;
}

export interface ContactSectionContent {
  headline?: string;
  headlineAccent?: string;
  description?: string;
  contactForm: boolean;
  showLocations?: boolean;
  showMap?: boolean;
}

export interface BannerSection extends SectionBase {
  type: 'banner';
  content: BannerContent;
}

export interface BannerContent {
  message: string;
  dismissible?: boolean;
  variant?: 'info' | 'success' | 'warning' | 'promo';
  link?: CtaButton;
}

// ============================================================================
// IMAGE TYPES
// ============================================================================

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

export interface GridOptions {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

// ============================================================================
// BLOG TYPES
// ============================================================================

export interface BlogPost {
  slug: string;
  title: string;
  titleAccent?: string;
  excerpt: string;
  category: string;
  image: ImageAsset;
  date: string;
  readTime: string;
  featured?: boolean;
  author?: BlogAuthor;
  content?: string;
  seo?: PageMetadata;
}

export interface BlogAuthor {
  name: string;
  role: string;
  image?: ImageAsset;
  bio?: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description?: string;
  count?: number;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  placeholder?: string;
  options?: FormOption[];
  validation?: FormValidation;
}

export type FormFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'file';

export interface FormOption {
  value: string;
  label: string;
}

export interface FormValidation {
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  customMessage?: string;
}
