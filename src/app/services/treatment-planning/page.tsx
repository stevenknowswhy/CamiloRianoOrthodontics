import Link from "next/link";

export default function TreatmentPlanningPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-2xl w-full text-center py-20">
        <div className="mb-6 inline-block">
          <span className="pill-label">Coming Soon</span>
        </div>
        <h1 className="headline-section mb-6">Treatment Planning</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
          We are preparing detailed information about our personalized treatment planning process.
          In the meantime, please contact us to schedule a consultation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium"
          >
            Schedule Consultation
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
