import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice | Dr. Riaño Orthodontics",
  description: "Learn how Dr. Riaño Orthodontics protects your privacy and handles your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 
          className="text-4xl md:text-5xl font-normal text-dark mb-8"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Privacy <span className="italic">Notice</span>
        </h1>
        
        <div className="prose prose-lg max-w-none text-dark/80 space-y-8">
          <p className="text-lg leading-relaxed">
            At Dr. Riaño Orthodontics, we are committed to protecting your privacy and ensuring the security 
            of your personal information. This Privacy Notice explains how we collect, use, disclose, and 
            safeguard your information when you visit our website or use our services.
          </p>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Fill out contact forms or request appointments</li>
              <li>Complete smile assessments or virtual care registrations</li>
              <li>Submit doctor referrals</li>
              <li>Sign up for our newsletter or communications</li>
              <li>Contact us via email, phone, or direct message</li>
            </ul>
            <p className="mt-4">
              This information may include your name, email address, phone number, address, 
              date of birth, insurance information, and health-related information necessary 
              for orthodontic treatment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide and manage your orthodontic care</li>
              <li>Schedule and confirm appointments</li>
              <li>Communicate with you about your treatment</li>
              <li>Process insurance claims and payments</li>
              <li>Send appointment reminders and practice updates</li>
              <li>Improve our website and services</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share 
              your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Healthcare providers involved in your treatment</li>
              <li>Insurance companies for claim processing</li>
              <li>Service providers who assist our practice (with confidentiality agreements)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. This 
              includes encryption, secure servers, and access controls.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt out of marketing communications</li>
              <li>File a complaint with regulatory authorities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Cookies and Tracking</h2>
            <p>
              Our website uses cookies and similar technologies to enhance your browsing experience, 
              analyze site traffic, and understand where our visitors come from. You can control 
              cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">HIPAA Compliance</h2>
            <p>
              As a healthcare provider, we comply with the Health Insurance Portability and 
              Accountability Act (HIPAA). Your protected health information (PHI) is handled 
              in accordance with HIPAA regulations and our Notice of Privacy Practices provided 
              at our offices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Notice or our privacy practices, please contact us:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong>Dr. Riaño Orthodontics</strong></p>
              <p>San Francisco: (415) 874-1677</p>
              <p>Sonoma: (707) 935-6878</p>
              <p>Email: info@docrianos.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Updates to This Notice</h2>
            <p>
              We may update this Privacy Notice from time to time. The updated version will be 
              indicated by an updated &ldquo;Last Updated&rdquo; date. We encourage you to review 
              this notice periodically.
            </p>
            <p className="mt-4 text-sm text-dark/60">
              Last Updated: February 2026
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
