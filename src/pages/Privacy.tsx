import Navbar from '@/components/Navbar';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
     
      
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <Separator className="mb-8" />
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-3">
                Where My Pix collects the following types of information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, and billing information when you create an account.</li>
                <li><strong>Usage Data:</strong> Information about how you use our service, including the features you access and the time spent on our platform.</li>
                <li><strong>Photos and Metadata:</strong> The images you upload for organization, including any metadata associated with those images.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To allow you to participate in interactive features of our service when you choose to do so</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
              <p className="text-muted-foreground">
                The security of your data is important to us. We strive to use commercially acceptable means to protect your personal information. Your images and data are encrypted during transfer and at rest. We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Retention</h2>
              <p className="text-muted-foreground">
                Where My Pix will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Third-Party Services</h2>
              <p className="text-muted-foreground">
                Our service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            {/* NEW SECTION ADDED */}
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Logging in with Google</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Logging in with Google is required</strong> to use the service .
                </li>
                <li>
                  <strong>Logging in unlocks exclusive features</strong> that are not available to guests.
                </li>
                <li>
                  We will never send <strong>transactional emails</strong> (e.g., login confirmations, usage/limit alerts, service or security notices, billing/receipts) - maybe a future feature. 
                  <strong> Marketing emails</strong> (e.g., tips, product updates, upgrade offers) require your explicit opt-in and always include an unsubscribe option.
                </li>
                <li>
                  We <strong>do not, nor will ever, sell</strong> your personal information. If you opt in to marketing, we may occasionally send <strong>upgrade nudges</strong> or promotions.
                </li>
              </ul>
            </section>
            {/* END NEW SECTION */}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
