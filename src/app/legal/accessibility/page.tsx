import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Accessibility | Dr. Riaño Orthodontics",
  description: "Our commitment to making the Dr. Riaño Orthodontics website accessible to all users.",
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-cream py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 
          className="text-4xl md:text-5xl font-normal text-dark mb-8"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Digital <span className="italic">Accessibility</span>
        </h1>
        
        <div className="prose prose-lg max-w-none text-dark/80 space-y-8">
          <p className="text-lg leading-relaxed">
            Dr. Riaño Orthodontics is committed to ensuring digital accessibility for people with 
            disabilities. We continually improve the user experience for everyone and apply the 
            relevant accessibility standards to achieve this goal.
          </p>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Our Commitment</h2>
            <p>
              We believe that everyone deserves access to quality healthcare information. Our 
              commitment to accessibility ensures that individuals with disabilities can access 
              and use our website effectively, including those who:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Use screen readers or other assistive technologies</li>
              <li>Navigate using keyboard only</li>
              <li>Require captions for video content</li>
              <li>Need content in alternative formats</li>
              <li>Use voice recognition software</li>
              <li>Have low vision or color blindness</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Accessibility Standards</h2>
            <p>
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA 
              standards. These guidelines explain how to make web content more accessible for people 
              with disabilities and more user-friendly for everyone.
            </p>
            <p className="mt-4">
              Our accessibility efforts include adherence to the following principles:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Perceivable:</strong> Information and user interface components must be presentable to users in ways they can perceive</li>
              <li><strong>Operable:</strong> User interface components and navigation must be operable</li>
              <li><strong>Understandable:</strong> Information and the operation of the user interface must be understandable</li>
              <li><strong>Robust:</strong> Content must be robust enough to work with various assistive technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Accessibility Features</h2>
            <p>
              Our website includes the following accessibility features:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Semantic HTML:</strong> Proper heading structure and landmark regions for easy navigation</li>
              <li><strong>Alternative Text:</strong> Descriptive alt text for all informative images</li>
              <li><strong>Keyboard Navigation:</strong> Full website functionality accessible via keyboard</li>
              <li><strong>Focus Indicators:</strong> Visible focus states for all interactive elements</li>
              <li><strong>Color Contrast:</strong> Sufficient color contrast ratios for text readability</li>
              <li><strong>Resizable Text:</strong> Text can be resized up to 200% without loss of functionality</li>
              <li><strong>Form Labels:</strong> Clear labels and error messages for all form fields</li>
              <li><strong>Consistent Navigation:</strong> Predictable navigation patterns throughout the site</li>
              <li><strong>Skip Links:</strong> Ability to skip to main content</li>
              <li><strong>ARIA Labels:</strong> Where appropriate, to enhance screen reader experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Compatible Technologies</h2>
            <p>
              Our website is designed to be compatible with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Current and recent versions of major browsers (Chrome, Firefox, Safari, Edge)</li>
              <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
              <li>Screen magnification software</li>
              <li>Voice recognition software</li>
              <li>Switch access devices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Ongoing Efforts</h2>
            <p>
              Accessibility is an ongoing process. We regularly:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Review our website for accessibility issues</li>
              <li>Test with assistive technologies</li>
              <li>Train our team on accessibility best practices</li>
              <li>Incorporate accessibility into our design and development processes</li>
              <li>Listen to feedback from users with disabilities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Known Limitations</h2>
            <p>
              While we strive for full accessibility, some limitations may exist:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Third-party content or embedded media may not fully meet accessibility standards</li>
              <li>Some legacy PDF documents may not be fully accessible</li>
              <li>External links to third-party websites are not under our control</li>
            </ul>
            <p className="mt-4">
              We are actively working to address these limitations and provide accessible alternatives 
              where possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Feedback and Assistance</h2>
            <p>
              We welcome your feedback on the accessibility of our website. If you encounter any 
              accessibility barriers or need assistance accessing any content, please contact us:
            </p>
            <div className="mt-6 p-6 bg-white/50 rounded-xl border border-dark/10">
              <p className="font-medium text-dark mb-2">Dr. Riaño Orthodontics</p>
              <p>Phone: (415) 874-1677 (San Francisco)</p>
              <p>Phone: (707) 935-6878 (Sonoma)</p>
              <p>Email: info@docrianos.com</p>
              <p className="mt-4 text-sm">
                We aim to respond to accessibility feedback within 2 business days.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Alternative Formats</h2>
            <p>
              If you need content from our website in an alternative format (such as large print, 
              Braille, or audio), please contact us and we will make every effort to accommodate 
              your request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Third-Party Content</h2>
            <p>
              Our website may link to or display content from third-party providers. While we 
              cannot control the accessibility of third-party content, we encourage our partners 
              to maintain accessible digital experiences and consider accessibility when selecting 
              third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Legal Compliance</h2>
            <p>
              We are committed to complying with applicable accessibility laws and regulations, 
              including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Americans with Disabilities Act (ADA)</li>
              <li>Section 508 of the Rehabilitation Act</li>
              <li>California Unruh Civil Rights Act</li>
              <li>Web Content Accessibility Guidelines (WCAG) 2.1</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Updates to This Statement</h2>
            <p>
              We may update this Digital Accessibility statement periodically to reflect improvements 
              to our website and services. We encourage you to review this page regularly.
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
