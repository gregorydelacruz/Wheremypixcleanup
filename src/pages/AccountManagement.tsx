import React from 'react';
import Footer from '@/components/Footer';
const AccountManagement = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#090e28] via-[#232b61] to-[#2e184a]">
      <main className="flex-1 flex flex-col items-center pt-24 pb-24 px-4">
        <div className="max-w-5xl w-full mx-auto">
          {/* Main Card Container */}
          <div className="bg-black/70 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-12">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Account Management
              </h1>
              <p className="text-xl text-white/80">
                Manage your account and settings
              </p>
            </div>

            {/* Intro */}
            <div className="mb-10">
              <p className="text-white/90 text-lg leading-relaxed">
                Where My Pix keeps account management simple. Right now, the main things you can do are:
              </p>
              <ul className="mt-4 space-y-2 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Log in with Google</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Log out</strong> when you&apos;re done</span>
                </li>
              </ul>
              <p className="text-white/70 italic mt-4 bg-white/5 p-4 rounded-lg border-l-4 border-pink-400">
                Traditional account settings (password changes, email updates, profile editing, etc.) are not exposed in
                the app yet. Authentication is handled through your Google account.
              </p>
            </div>

            {/* Login with Google */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Logging in with Google
              </h2>
              <p className="text-white/90 mb-4">
                You sign in to Where My Pix using your Google account. This keeps things fast and secure—no extra
                passwords to remember.
              </p>
              <ol className="space-y-4 ml-6 list-decimal text-white/90">
                <li>
                  <strong className="text-white">Go to the homepage</strong><br />
                  <span className="text-white/80">
                    Visit{' '}
                    <a
                      href="https://www.wheremypix.com/"
                      className="text-pink-400 hover:text-pink-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      wheremypix.com
                    </a>
                    .
                  </span>
                </li>
                <li>
                  <strong className="text-white">Click &quot;Continue with Google&quot; (or similar)</strong><br />
                  <span className="text-white/80">
                    On the sign‑in screen, choose the Google option. You may see a button labeled
                    <strong> &quot;Sign in with Google&quot;</strong> or <strong>&quot;Continue with Google&quot;</strong>.
                  </span>
                </li>
                <li>
                  <strong className="text-white">Choose your Google account</strong><br />
                  <span className="text-white/80">
                    A Google window will open. Select the account you want to use with Where My Pix, or sign in to Google
                    if you aren&apos;t already.
                  </span>
                </li>
                <li>
                  <strong className="text-white">Grant access</strong><br />
                  <span className="text-white/80">
                    Review the permissions and click <strong>Allow</strong>. This lets Where My Pix confirm who you are
                    through Google.
                  </span>
                </li>
                <li>
                  <strong className="text-white">You&apos;re in</strong><br />
                  <span className="text-white/80">
                    After Google redirects you back, you&apos;ll be logged in and ready to start uploading and organizing
                    your photos.
                  </span>
                </li>
              </ol>
              <p className="text-white/80 mt-4">
                Your Google credentials are never stored by Where My Pix—we just receive a secure confirmation from Google
                that you&apos;re you.
              </p>
            </div>

            {/* Logging out */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Logging out
              </h2>
              <p className="text-white/90 mb-4">
                When you&apos;re finished organizing photos—especially on a shared or public computer—it&apos;s a good idea
                to log out of Where My Pix.
              </p>
              <ol className="space-y-4 ml-6 list-decimal text-white/90">
                <li>
                  <strong className="text-white">Open the account menu</strong><br />
                  <span className="text-white/80">
                    In the app header, look for your avatar, initials, or an account icon (depending on your final UI).
                    Click it to open the menu.
                  </span>
                </li>
                <li>
                  <strong className="text-white">Select &quot;Log out&quot; / &quot;Sign out&quot;</strong><br />
                  <span className="text-white/80">
                    Click the logout option. You&apos;ll be signed out of Where My Pix in that browser.
                  </span>
                </li>
              </ol>
              <p className="text-white/80 mt-4">
                The next time you visit, you can log back in with the same Google account and pick up right where you left
                off.
              </p>
            </div>

            {/* What you can't change (yet) */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                What you can&apos;t manage (yet)
              </h2>
              <p className="text-white/90 mb-3">
                To keep things simple, Where My Pix doesn&apos;t currently expose a full settings dashboard. That means:
              </p>
              <ul className="space-y-2 text-white/90 mb-4">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>You can&apos;t change your email address from within the app.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>You don&apos;t set or reset a separate password—Google handles authentication for you.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Profile fields like name, avatar, and language are not editable inside Where My Pix yet.</span>
                </li>
              </ul>
              <p className="text-white/80">
                If you ever stop using Where My Pix, simply log out and, if you like, revoke access from your Google
                account&apos;s security settings. You&apos;ll always keep full control of your Google login.
              </p>
            </div>

          </div>
        </div>
     </main>
      
      <Footer />
    </div>
  );
};

export default AccountManagement;
