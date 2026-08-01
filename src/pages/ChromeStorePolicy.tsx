
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ChromeStorePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Chrome Web Store Privacy Policy - Where My Pix</title>
        <meta 
          name="description" 
          content="Privacy policy for the Where My Pix Chrome extension - how we protect your data and privacy."
        />
      </Helmet>

      

      <main className="flex-1 pt-28 pb-16 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-background rounded-lg shadow-sm p-6 md:p-8 border">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Privacy Policy for Extension "Where My Pix"</h1>
            <p className="text-muted-foreground mb-6"><strong>Effective Date:</strong> 03/23/2025</p>

            <p className="mb-6">
              <strong>"Where My Pix"</strong> ("we," "us," or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and protect your information in relation to our 
              Chrome extension, "Where My Pix," which is available on the Google Chrome Web Store.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Data Collection and Use</h2>
            <p className="mb-4">
              Our extension is designed with your privacy in mind. We do not collect or use your personal information 
              or web browsing activity except as required for a single, user-facing purpose that is clearly described 
              on our Chrome Web Store listing and in the user interface.
            </p>
            <p className="mb-6">
              Any user data that may be accessed or collected is used solely for the purpose of providing or improving 
              this specific functionality.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Prohibited Practices</h2>
            <p className="mb-2">We strictly prohibit:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Collection or use of web browsing activity outside of the necessary functionality.</li>
              <li>
                Transferring, selling, or using user data for:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Personalized advertisements</li>
                  <li>Determining credit-worthiness or for lending decisions</li>
                  <li>Any purpose unrelated to the extension's single, user-facing feature</li>
                  <li>Sharing data with data brokers, ad platforms, or resellers</li>
                </ul>
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Third-Party Data Transfers</h2>
            <p className="mb-2">We will only share user data with third parties under the following conditions:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>When necessary to provide or improve the core functionality of our extension</li>
              <li>When required to comply with applicable laws</li>
              <li>To protect against fraud, abuse, malware, spam, or phishing</li>
              <li>As part of a merger, acquisition, or asset sale, with prior explicit user consent</li>
            </ul>
            <p className="mb-6">
              We do not allow third-party access for advertising or analytics purposes unrelated to the extension's core functionality.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Human Access to Data</h2>
            <p className="mb-2">We do not allow humans to read your data unless:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>We receive explicit user consent to assist with a specific issue (e.g., lost account access)</li>
              <li>The data is aggregated and anonymized and used for internal operations (e.g., improving performance)</li>
              <li>Access is necessary for security investigations or to comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p className="mb-6">
              We use industry-standard security practices to safeguard your information and prevent unauthorized access or misuse.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Affirmative Compliance Statement</h2>
            <p className="mb-2">
              Our use of information received from Google APIs will adhere to the Chrome Web Store User Data Policy, 
              including the Limited Use requirements.
            </p>
            <p className="mb-6">
              For more information on these requirements, please visit the{" "}
              <a 
                href="https://developer.chrome.com/docs/webstore/user_data/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Chrome Web Store User Data Policy
              </a>.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="mb-2">If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                Email:{" "}
                <a 
                  href="mailto:support@wheremypix.com"
                  className="text-primary hover:underline"
                >
                  support@wheremypix.com
                </a>
              </li>
              <li>
                Website:{" "}
                <a 
                  href="https://www.wheremypix.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://www.wheremypix.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>

    
    </div>
  );
};

export default ChromeStorePolicy;
