import Link from "next/link";
import Image from "next/image";

interface ComingSoonPageProps {
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  ctaText?: string;
  additionalInfo?: string;
}

/**
 * Reusable "Coming Soon" page component for placeholder content.
 * Reduces duplication across 19+ placeholder pages.
 */
export function ComingSoonPage({
  title,
  description,
  image,
  ctaText = "Schedule Consultation",
  additionalInfo,
}: ComingSoonPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-2xl w-full text-center py-20">
        {/* Optional image */}
        {image && (
          <div className="mb-8 flex justify-center">
            <Image
              src={image.src}
              alt={image.alt}
              width={120}
              height={120}
              className="rounded-2xl"
            />
          </div>
        )}

        {/* "Coming Soon" badge */}
        <div className="mb-6 inline-block">
          <span className="pill-label">Coming Soon</span>
        </div>

        {/* Page title */}
        <h1 className="headline-section mb-6">{title}</h1>

        {/* Description */}
        <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
          {description}
        </p>

        {/* Optional additional info */}
        {additionalInfo && (
          <p className="text-muted-foreground/70 mb-8 max-w-lg mx-auto text-sm">
            {additionalInfo}
          </p>
        )}

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium"
          >
            {ctaText}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-border hover:bg-secondary transition-colors font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * HOC for creating a page from ComingSoonPage component.
 * Usage: export default function MyPage() { return <CreateComingSoonPage title="..." />; }
 */
export function CreateComingSoonPage(props: Omit<ComingSoonPageProps, 'children'>) {
  return <ComingSoonPage {...props} />;
}
