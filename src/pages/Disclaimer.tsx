import { Separator } from '@/components/ui/separator';

const Disclaimer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Login & Data Use Disclaimer</h1>
          <p className="text-sm text-muted-foreground">Last updated: Sep 14, 2025</p>
          <Separator className="my-8" />

          <div className="space-y-8">
            {/* 1 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">1. What logging in with Google means</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>When you <strong>“Login with Google”</strong>, we receive your <strong>name</strong> and <strong>email address</strong> to create and authenticate your account.</li>
                <li>We <strong>do not</strong> have access to any other Google information: your contacts, files, calendar, or other Google data .</li>
                <li>Your email is used for essential account notices (see §3). Marketing is implied and consented<strong>when logging in with Google
				</strong>.</li>
              </ul>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Free plan, limits, and upgrades</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>The service is <strong>free for up to 25 images per month</strong>.</li>
                <li>Upgrades are optional:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Pro — $9/mo</strong>: up to <strong>10,000</strong> images/month</li>
                    <li><strong>Enterprise (VIP) — $29/mo</strong>: up to <strong>100,000</strong> images/month</li>
                  </ul>
                </li>
                <li>Plan features and pricing may change; the current details are shown on the pricing page.</li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">3. When we email you</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Transactional emails</strong> (no extra consent): login confirmations, usage/limit alerts, security or service notices, billing/receipts. (not currently in use)</li>
                <li><strong>Marketing emails</strong> (opt-in only): tips, feature news, and upgrade offers. You can <strong>unsubscribe anytime</strong> using the link in those emails.</li>
                <li>We <strong>never sell</strong> your email address to third parties.</li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Your photos &amp; our AI</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>You own your photos.</strong> By uploading, you grant Where My Pix a limited license to process them (analyze, rename, categorize, and ZIP) solely to provide the service.</li>
                <li>AI results are best-effort and may be imperfect; review before relying on them.</li>
                <li>Where My Pix is <strong>not a backup service</strong>. Keep your own originals; don’t upload the only copy of important files.</li>
                <li><strong>Prohibited content:</strong> illegal content; material that violates others’ rights; or highly sensitive data unsuitable for a consumer photo-organizing tool. We may suspend accounts that violate these rules.</li>
              </ul>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Security, privacy &amp; third-party processors</h2>
              <p className="text-muted-foreground">
                We use industry-standard security; data is encrypted in transit and at rest and retained only as needed to operate the service, resolve issues, and meet legal obligations.
                For full details (including data rights), see our{' '}
                <a className="underline" href="https://www.wheremypix.com/privacy" target="_blank" rel="noreferrer">
                  Privacy Policy
                </a>.
                We may use service providers (e.g., cloud hosting, email) who are required to protect your data and use it only to provide services to us.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Fair use and abuse prevention</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>We apply rate limits, automated abuse detection, and other safeguards to protect reliability.</li>
                <li>Free accounts are limited to one per person. Attempts to bypass limits or abuse the service may result in suspension.</li>
              </ul>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Age requirements</h2>
              <p className="text-muted-foreground">
                Where My Pix is not directed to children under <strong>13</strong> (or under <strong>16</strong> in the EU/UK). Do not use the service if you do not meet the applicable minimum age.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Service availability &amp; changes</h2>
              <p className="text-muted-foreground">
                We aim for high availability, but the service is provided <strong>“as is”</strong> and <strong>“as available.”</strong>
                We may change or discontinue features, limits, or plans at any time. Material changes to this page will update the “Last updated” date.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Warranty &amp; liability</h2>
              <p className="text-muted-foreground">
                To the fullest extent permitted by law, Where My Pix and its suppliers disclaim all warranties (express or implied) about the service and AI outputs, including
                accuracy, fitness for a particular purpose, and non-infringement. We are not liable for lost data, lost profits, or indirect, incidental, or consequential damages.
                In any case, our total liability relating to the service will not exceed the greater of (a) the amount you paid us in the 12 months before the event or (b) $1.99.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
              <p className="text-muted-foreground">
                Questions about this Disclaimer or your data? Email us at <a className="underline" href="mailto:support@wheremypix.com">support@wheremypix.com</a>.
                For privacy details, visit{' '}
                <a className="underline" href="https://www.wheremypix.com/privacy" target="_blank" rel="noreferrer">
                  https://www.wheremypix.com/privacy
                </a>.
              </p>
            </section>
          </div>

          <Separator className="mt-8 mb-6" />
          <p className="text-xs text-muted-foreground">
            Plain-English summary: logging in shares your name + email to create your account and track plan limits (25 free images/month). We never sell your data. Marketing is opt-in only.
          </p>
        </div>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">&copy; {new Date().getFullYear()} Where My Pix</span>
            <div className="flex gap-4">
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</a>
              <a href="https://www.wheremypix.com/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Disclaimer;
