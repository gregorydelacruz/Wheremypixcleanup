import React from 'react';
import Footer from '@/components/Footer';
const Troubleshooting = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#090e28] via-[#232b61] to-[#2e184a]">
      <main className="flex-1 flex flex-col items-center pt-24 pb-24 px-4">
        <div className="max-w-5xl w-full mx-auto">
          {/* Main Card Container */}
          <div className="bg-black/70 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-12">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Troubleshooting
              </h1>
              <p className="text-xl text-white/80">
                Solutions for common issues
              </p>
            </div>

            {/* Intro */}
            <div className="mb-10">
              <p className="text-white/90 text-lg leading-relaxed">
                Even when everything is working, uploads and large photo collections can be a little finicky. This guide
                covers the most common issues people run into with Where My Pix and how to fix them.
              </p>
            </div>

            {/* 1. Upload stuck or slow */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-3">
                1. My upload is stuck or very slow
              </h2>
              <h3 className="text-lg font-semibold text-white mb-2">What you might see</h3>
              <ul className="space-y-1 text-white/90 mb-4">
                <li>• The progress bar doesn&apos;t move for a long time</li>
                <li>• The page says &quot;Uploading…&quot; but nothing seems to happen</li>
                <li>• Your browser shows a &quot;network error&quot; or similar message</li>
              </ul>
              <h3 className="text-lg font-semibold text-white mb-2">Likely causes</h3>
              <ul className="space-y-1 text-white/90 mb-4">
                <li>• A very large batch (thousands of photos at once)</li>
                <li>• Slow or unstable internet connection</li>
                <li>• Your computer went to sleep or the browser tab was closed</li>
              </ul>
              <h3 className="text-lg font-semibold text-white mb-2">What to try</h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Reduce the batch size</strong> – Start with a few hundred photos (100–300) instead of your entire library.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Keep the tab active</strong> – Leave the Where My Pix tab open and avoid letting your computer sleep.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Check your connection</strong> – Move closer to the router or use a wired connection if possible.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Retry the upload</strong> – Refresh the page, start a new session, and try a smaller group of photos.</span>
                </li>
              </ul>
            </div>

            {/* 2. Missing photos */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-3">
                2. Some photos did not appear in the ZIP
              </h2>
              <h3 className="text-lg font-semibold text-white mb-2">What you might see</h3>
              <p className="text-white/90 mb-4">
                The ZIP downloads successfully, but a few images you expected are missing.
              </p>
              <h3 className="text-lg font-semibold text-white mb-2">Likely causes</h3>
              <ul className="space-y-1 text-white/90 mb-4">
                <li>• Those files weren&apos;t JPG/JPEG or PNG</li>
                <li>• Files were corrupted or unreadable</li>
                <li>• They were in a subfolder you didn&apos;t actually select during upload</li>
              </ul>
              <h3 className="text-lg font-semibold text-white mb-2">What to try</h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Confirm file types</strong> – Make sure the missing files are <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">.jpg</code>, <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">.jpeg</code>, or <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">.png</code>.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Check your selection</strong> – Confirm you selected all subfolders you expected.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Try a small test run</strong> – Create a folder with just the missing photos and run them alone.</span>
                </li>
              </ul>
            </div>

            {/* 3. Categories look wrong */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-3">
                3. Categories or folder names don&apos;t look right
              </h2>
              <h3 className="text-lg font-semibold text-white mb-2">What you might see</h3>
              <ul className="space-y-1 text-white/90 mb-4">
                <li>• A few photos are in a category that doesn&apos;t feel accurate.</li>
                <li>• Some folders have names you wouldn&apos;t personally choose.</li>
              </ul>
              <h3 className="text-lg font-semibold text-white mb-2">What&apos;s happening</h3>
              <p className="text-white/90 mb-4">
                The AI makes a best guess based on what it sees in each image. Most of the time it&apos;s right, but edge cases can end up in the &quot;wrong&quot; bucket.
              </p>
              <h3 className="text-lg font-semibold text-white mb-2">What to try</h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Manually move a few files</strong> – After extraction, move any out‑of‑place photos to a better folder.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Use smaller, more focused batches</strong> – Group similar types of photos together when you upload.</span>
                </li>
              </ul>
            </div>

            {/* 4. Filenames strange */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-3">
                4. Filenames look strange or not what I expected
              </h2>
              <p className="text-white/90 mb-4">
                Where My Pix creates new files with better filenames based on your photos&apos; content and internal rules.
                Original camera names like <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">IMG_4021.JPG</code> on your computer are not changed.
              </p>
              <h3 className="text-lg font-semibold text-white mb-2">What to try</h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Spot‑check a few images</strong> – Compare the filename with what&apos;s actually in the image.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Rerun a small set</strong> – If a batch looks off, reupload a handful of those photos in a separate run.</span>
                </li>
              </ul>
            </div>

            {/* 5. Originals changed concern */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-3">
                5. I&apos;m worried my original photos were changed
              </h2>
              <p className="text-white/90 mb-4">
                <strong>Good news: they weren&apos;t.</strong>
              </p>
              <ul className="space-y-2 text-white/90 mb-4">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Your original photos on your computer are <strong>never touched, deleted, renamed, or edited</strong> by Where My Pix.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>We work from the copies you upload, generate <strong>new files with cleaner filenames and folders</strong>, and give those to you in a ZIP to download.</span>
                </li>
              </ul>
              <p className="text-white/80 mb-3">
                You do <strong>not</strong> need to back up your photos first just to stay safe—although keeping backups of your memories is always a good idea.
              </p>
              <p className="text-white/80">
                You can keep your original messy folder exactly where it is, use the organized ZIP as a separate improved copy, and only replace your old structure if and when you&apos;re ready.
              </p>
            </div>

            {/* 6. ZIP won't open */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-3">
                6. The ZIP file won&apos;t open
              </h2>
              <h3 className="text-lg font-semibold text-white mb-2">What you might see</h3>
              <ul className="space-y-1 text-white/90 mb-4">
                <li>• Double‑clicking the ZIP does nothing</li>
                <li>• Your operating system says the file is corrupted or incomplete</li>
              </ul>
              <h3 className="text-lg font-semibold text-white mb-2">Likely causes</h3>
              <ul className="space-y-1 text-white/90 mb-4">
                <li>• The download was interrupted before it finished</li>
                <li>• Not enough free disk space</li>
                <li>• A temporary glitch in your unzip tool</li>
              </ul>
              <h3 className="text-lg font-semibold text-white mb-2">What to try</h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Redownload the ZIP</strong> – Delete the partial file and download it again.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Check free disk space</strong> – Make sure you have room for both the ZIP and the extracted contents.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Try a different unzip tool</strong> – Tools like 7‑Zip, WinRAR, or The Unarchiver can handle large ZIPs more reliably.</span>
                </li>
              </ul>
            </div>

            {/* 7. No obvious changes */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-3">
                7. I don&apos;t see obvious changes after extraction
              </h2>
              <p className="text-white/90 mb-4">
                If everything extracted into a folder that already had other photos, our organized output may be mixed in with older content.
              </p>
              <h3 className="text-lg font-semibold text-white mb-2">What to check</h3>
              <ul className="space-y-2 text-white/90 mb-4">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Folder structure</strong> – Look for multiple category folders instead of one big dump.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span><strong>Filenames</strong> – Inside those folders, names should be more human‑readable than raw camera names.</span>
                </li>
              </ul>
              <p className="text-white/80">
                Try extracting the ZIP into a <strong>fresh, empty folder</strong> so you can see exactly what Where My Pix produced.
              </p>
            </div>

            {/* When to contact support */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                When to contact support
              </h2>
              <p className="text-white/90 mb-4">
                If you&apos;ve tried the steps above and something still feels off—especially if:
              </p>
              <ul className="space-y-2 text-white/90 mb-4">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Uploads are failing repeatedly</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>ZIP files won&apos;t download or open after multiple attempts</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>You see behavior that doesn&apos;t match what&apos;s described here</span>
                </li>
              </ul>
              <p className="text-white/80">
                Reach out through the support options in the app and include roughly how many photos you uploaded,
                which browser and operating system you&apos;re using, and a short description of what you expected vs. what happened.
              </p>
            </div>

          </div>
        </div>
     </main>

      <Footer />
    </div>
  );
};

export default Troubleshooting;
