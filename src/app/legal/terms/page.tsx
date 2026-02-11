import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Dr. Riaño Orthodontics",
  description: "Terms and conditions for using the Dr. Riaño Orthodontics website and services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-cream py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 
          className="text-4xl md:text-5xl font-normal text-dark mb-8"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Terms of <span className="italic">Use</span>
        </h1>
        
        <div className="prose prose-lg max-w-none text-dark/80 space-y-8">
          <p className="text-lg leading-relaxed">
            Welcome to the website of Dr. Riaño Orthodontics. By accessing or using our website, 
            you agree to be bound by these Terms of Use. Please read them carefully before using 
            our site or services.
          </p>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or using this website, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms of Use. If you do not agree to these 
              terms, please do not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Medical Disclaimer</h2>
            <p>
              The information provided on this website is for general educational purposes only 
              and is not intended as medical advice. It should not be used to diagnose or treat 
              any health problem or disease. Always seek the advice of your orthodontist or other 
              qualified healthcare provider with any questions you may have regarding a medical 
              condition or treatment.
            </p>
            <p className="mt-4">
              Never disregard professional medical advice or delay in seeking it because of 
              something you have read on this website. If you think you may have a medical 
              emergency, call your doctor or 911 immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, 
              images, videos, audio clips, digital downloads, and software, is the property of 
              Dr. Riaño Orthodontics or its content suppliers and is protected by United States 
              and international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-4">
              You may not reproduce, distribute, modify, create derivative works from, publicly 
              display, or commercially exploit any content from this website without our prior 
              written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Use of Website</h2>
            <p>
              You agree to use this website only for lawful purposes and in a manner that does 
              not infringe upon the rights of others or restrict their use and enjoyment of the 
              website. Prohibited activities include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Using the website in any way that could damage, disable, or impair our servers or networks</li>
              <li>Attempting to gain unauthorized access to any part of the website</li>
              <li>Using automated means to access or scrape the website without permission</li>
              <li>Transmitting any viruses, malware, or harmful code</li>
              <li>Interfering with other users&apos; access to the website</li>
              <li>Using the website to send unsolicited communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">User Submissions</h2>
            <p>
              By submitting any information, feedback, or content to us through this website, you:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Grant us a non-exclusive, royalty-free, perpetual license to use such submissions</li>
              <li>Warrant that you have the right to submit such information</li>
              <li>Agree that we may contact you regarding your submission</li>
              <li>Acknowledge that we are not obligated to keep submissions confidential</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Links to Third-Party Sites</h2>
            <p>
              This website may contain links to third-party websites for your convenience. We do 
              not endorse or control these websites and are not responsible for their content, 
              privacy policies, or practices. Accessing third-party sites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Disclaimer of Warranties</h2>
            <p>
              This website and its content are provided &ldquo;as is&rdquo; without any warranties 
              of any kind, either express or implied. We do not warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>The website will be uninterrupted, timely, secure, or error-free</li>
              <li>The results obtained from using the website will be accurate or reliable</li>
              <li>Any errors in the website will be corrected</li>
              <li>The website is free from viruses or other harmful components</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Dr. Riaño Orthodontics and its affiliates 
              shall not be liable for any direct, indirect, incidental, special, consequential, 
              or punitive damages arising from or related to your use of this website, even if 
              advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Dr. Riaño Orthodontics, its 
              officers, directors, employees, and agents from any claims, liabilities, damages, 
              losses, and expenses arising from your use of this website or violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Governing Law</h2>
            <p>
              These Terms of Use shall be governed by and construed in accordance with the laws 
              of the State of California, without regard to its conflict of law provisions. Any 
              legal action arising from these terms shall be brought exclusively in the state or 
              federal courts located in San Francisco County, California.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Use at any time. Changes will be 
              effective immediately upon posting to this page. Your continued use of the website 
              after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-dark mb-4">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong>Dr. Riaño Orthodontics</strong></p>
              <p>San Francisco: (415) 874-1677</p>
              <p>Sonoma: (707) 935-6878</p>
              <p>Email: info@docrianos.com</p>
            </div>
          </section>

          <p className="text-sm text-dark/60 mt-8">
            Last Updated: February 2026
          </p>
        </div>
      </div>
    </main>
  );
}
