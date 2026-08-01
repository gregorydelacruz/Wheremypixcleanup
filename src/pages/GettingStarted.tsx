import React from 'react';
import Footer from '@/components/Footer';

const GettingStarted = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#090e28] via-[#232b61] to-[#2e184a]">
      <main className="flex-1 flex flex-col items-center pt-24 pb-24 px-4">
        <div className="max-w-5xl w-full mx-auto">
          {/* Main Card Container - styled like Social Proof */}
          <div className="bg-black/70 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-12">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Getting Started
              </h1>
              <p className="text-xl text-white/80">
                Learn the basics of using our service
              </p>
            </div>

            {/* Intro Paragraph */}
            <div className="mb-10">
              <p className="text-white/90 text-lg leading-relaxed">
                Where My Pix uses custom AI to analyze what's actually in your photos, then automatically{' '}
                <strong>renames them</strong>, <strong>sorts them into meaningful category folders</strong>, and delivers
                everything back to you in a <strong>single ZIP file</strong>. Instead of scrolling through{' '}
                <code className="bg-white/10 px-2 py-1 rounded text-pink-300">IMG_4021.JPG</code> forever, you get clean folders that match what's in your images.
              </p>
              <p className="text-white/80 mt-4">
                This section walks you through how to get started, what kinds of files you can use, and what to expect
                the first time you run it.
              </p>
            </div>

            {/* What Where My Pix Does Right Now */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                What Where My Pix Does Right Now
              </h2>
              <p className="text-white/90 mb-6">
                Today, Where My Pix focuses on <strong>simple, automated cleanup</strong> of your photo mess:
              </p>

              <ul className="space-y-4 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400 text-xl">•</span>
                  <div>
                    <strong className="text-white">Works with JPG and PNG files</strong><br />
                    <span className="text-white/80">
                      You can upload photos in <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">.jpg</code>,{' '}
                      <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">.jpeg</code>, and{' '}
                      <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">.png</code> formats.
                    </span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400 text-xl">•</span>
                  <div>
                    <strong className="text-white">Understands what's in your photos</strong><br />
                    <span className="text-white/80">
                      Our AI analyzes each image to detect the general content (for example: travel, documents, screenshots,
                      food, people, pets, etc.).
                    </span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400 text-xl">•</span>
                  <div>
                    <strong className="text-white">Auto-creates category folders</strong><br />
                    <span className="text-white/80">
                      Based on that analysis, it chooses categories and creates folders (for example: <em>Trips</em>,{' '}
                      <em>Family</em>, <em>Screenshots</em>, <em>Documents</em>, depending on how you've defined categories
                      in the system).
                    </span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400 text-xl">•</span>
                  <div>
                    <strong className="text-white">Renames files to something human-readable</strong><br />
                    <span className="text-white/80">
                      Instead of random camera names like <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">IMG_1033.JPG</code>, your files get more meaningful names
                      that better match their content and context.
                    </span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400 text-xl">•</span>
                  <div>
                    <strong className="text-white">Gives you a ZIP of your organized photos</strong><br />
                    <span className="text-white/80">After processing:</span>
                    <ul className="mt-2 ml-4 space-y-1 text-white/80">
                      <li>• It builds a folder structure with your categorized, renamed photos.</li>
                      <li>• It compresses everything into a ZIP file.</li>
                      <li>• That ZIP <strong>automatically downloads</strong> to your computer.</li>
                    </ul>
                  </div>
                </li>
              </ul>

              <p className="text-white/90 mt-6 text-lg">
                You upload a mess; you download a structured folder containing everything cleaned up.
              </p>
            </div>

            {/* What You Need Before You Start */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                What You Need Before You Start
              </h2>
              <p className="text-white/90 mb-4">
                To use Where My Pix effectively, you'll need:
              </p>
              <ul className="space-y-3 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400 text-xl">•</span>
                  <span>
                    A <strong>computer or laptop</strong> with a modern web browser (Chrome, Edge, Safari, or Firefox).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400 text-xl">•</span>
                  <span>
                    A set of <strong>photos saved as JPG or PNG</strong> in one or more folders.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400 text-xl">•</span>
                  <span>
                    A <strong>Where My Pix account</strong>, which you can create from the homepage if you don't have one yet.
                  </span>
                </li>
              </ul>
              <p className="text-white/70 italic mt-4">
                Tip: Start with one folder or a smaller batch of photos the first time you try it. Once you like the
                results, you can run larger collections.
              </p>
            </div>

            {/* How the Basic Workflow Works */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                How the Basic Workflow Works
              </h2>
              <p className="text-white/90 mb-4">
                Using Where My Pix is a straightforward three-step process:
              </p>
              <ol className="space-y-2 text-white/90 ml-6 list-decimal">
                <li><strong>Upload your photos</strong></li>
                <li><strong>Let the AI analyze and organize them</strong></li>
                <li><strong>Download your organized ZIP</strong></li>
              </ol>
              <p className="text-white/80 mt-4">Here's what happens in each step.</p>
            </div>

            {/* Step 1 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-white mb-3">
                1. Upload Your Photos
              </h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>
                    Go to <a href="https://www.wheremypix.com/" className="text-pink-400 hover:text-pink-300 underline" target="_blank" rel="noopener noreferrer">wheremypix.com</a> and sign in.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>
                    Click the button to <strong>start a new upload</strong> or <strong>organize photos</strong> (use the exact label from your UI).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <div>
                    Use the file picker to:
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Select one or more <strong>JPG/PNG files</strong>, or</li>
                      <li>• Select a folder (if your browser and OS support folder upload).</li>
                    </ul>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>
                    Confirm your selection. The photos are uploaded to Where My Pix for analysis and organization.
                  </span>
                </li>
              </ul>
              <p className="text-white/70 mt-4">
                Only JPG/PNG files are processed. Other file types in the same folder (like videos, RAW files, or PDFs)
                will be ignored or skipped.
              </p>
            </div>

            {/* Step 2 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-white mb-3">
                2. AI Analyzes and Organizes
              </h3>
              <p className="text-white/90 mb-4">Once your upload is complete, Where My Pix:</p>
              <ol className="space-y-4 ml-6 list-decimal text-white/90">
                <li>
                  <strong className="text-white">Analyzes each image</strong><br />
                  <span className="text-white/80">
                    The AI looks at the visual contents of each photo to infer categories. For example (your actual
                    categories may vary):
                  </span>
                  <ul className="ml-4 mt-2 space-y-1 text-white/80">
                    <li>• Travel / Trips</li>
                    <li>• Family / People</li>
                    <li>• Pets</li>
                    <li>• Screenshots</li>
                    <li>• Documents</li>
                    <li>• Food</li>
                    <li>• Outdoors / Nature</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Assigns each photo to a category</strong><br />
                  <span className="text-white/80">
                    Each photo is mapped to one of these categories (or a default/misc category if it doesn't clearly fit).
                  </span>
                </li>
                <li>
                  <strong className="text-white">Renames the files</strong><br />
                  <span className="text-white/80">
                    File names are updated to be more descriptive than <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">IMG_####.JPG</code> and consistent across the
                    batch, following the rules you've implemented internally.
                  </span>
                </li>
                <li>
                  <strong className="text-white">Builds a folder structure</strong><br />
                  <span className="text-white/80">
                    Where My Pix creates a folder layout with one folder per detected category. Inside each folder are the
                    photos that match that category, with their new names.
                  </span>
                </li>
              </ol>
            </div>

            {/* Step 3 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-white mb-3">
                3. Download Your Organized ZIP
              </h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <div>
                    Once processing is done, Where My Pix:
                    <ul className="ml-4 mt-1 space-y-1 text-white/80">
                      <li>• Packages the <strong>entire organized folder structure</strong> into a single <strong>ZIP file</strong>.</li>
                      <li>• Triggers an <strong>automatic download</strong> in your browser.</li>
                    </ul>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>
                    You'll see the ZIP file appear in your browser's download bar and your default
                    <strong> Downloads</strong> folder.
                  </span>
                </li>
              </ul>

              <p className="text-white/90 mt-6 mb-3">Inside that ZIP, you'll find:</p>
              <ul className="space-y-2 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Top-level <strong>category folders</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Each folder containing the <strong>renamed photos</strong> that match that category</span>
                </li>
              </ul>

              <p className="text-white/90 mt-6 mb-3">From there, you can:</p>
              <ul className="space-y-2 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Extract the ZIP to your preferred location (e.g., your <strong>Pictures</strong> folder, an external drive, or a backup directory).</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Use those folders directly as your new, cleaner library.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Optionally archive or delete the original messy folder once you're sure you're happy with the result.</span>
                </li>
              </ul>
            </div>

            {/* First-Time Setup */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                First-Time Setup: Step-by-Step
              </h2>
              <p className="text-white/90 mb-4">Here's a quick step-by-step you can show users:</p>
              <ol className="space-y-4 ml-6 list-decimal text-white/90">
                <li>
                  <strong className="text-white">Go to the site &amp; sign in</strong><br />
                  <span className="text-white/80">
                    Visit <a href="https://www.wheremypix.com/" className="text-pink-400 hover:text-pink-300 underline" target="_blank" rel="noopener noreferrer">wheremypix.com</a>.<br />
                    Click <strong>Sign Up</strong> or <strong>Log In</strong>.<br />
                    Create your account or sign in with your existing credentials.
                  </span>
                </li>
                <li>
                  <strong className="text-white">Start a new organization run</strong><br />
                  <span className="text-white/80">
                    From the main screen, click the button to <strong>start organizing</strong> or
                    <strong> upload photos</strong>.<br />
                    This opens the upload interface.
                  </span>
                </li>
                <li>
                  <strong className="text-white">Select your photos (JPG/PNG only)</strong><br />
                  <span className="text-white/80">
                    Use the file picker to choose a batch of photos.<br />
                    Make sure they're primarily <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">.jpg</code> / <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">.jpeg</code> / <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">.png</code> files.<br />
                    Confirm and start the upload.
                  </span>
                </li>
                <li>
                  <strong className="text-white">Wait while Where My Pix works</strong><br />
                  <span className="text-white/80">The app:</span>
                  <ul className="ml-4 mt-1 space-y-1 text-white/80">
                    <li>• Uploads your images</li>
                    <li>• Analyzes and categorizes them</li>
                    <li>• Renames and sorts them into folders</li>
                  </ul>
                  <span className="text-white/80">
                    Processing time depends on how many photos you upload and your connection speed, but you don't need to
                    do anything during this step.
                  </span>
                </li>
                <li>
                  <strong className="text-white">Download your ZIP</strong><br />
                  <span className="text-white/80">When processing is finished:</span>
                  <ul className="ml-4 mt-1 space-y-1 text-white/80">
                    <li>• A <strong>ZIP download</strong> will start automatically.</li>
                    <li>• Save or open the ZIP from your browser's downloads.</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Extract and review</strong><br />
                  <span className="text-white/80">
                    Open the ZIP file and extract it.<br />
                    Browse through the generated folders and renamed images.<br />
                    If you like the structure, you can adopt this as your new organized library, or migrate pieces of it
                    into your existing system.
                  </span>
                </li>
              </ol>
            </div>

            {/* Safety & Control */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Safety &amp; Control (Current Behavior)
              </h2>
              <ul className="space-y-3 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400 text-xl">•</span>
                  <span>
                    <strong className="text-white">You control what you upload</strong> – Only photos you upload are analyzed and organized.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400 text-xl">•</span>
                  <span>
                    <strong className="text-white">Files are returned to you as a ZIP</strong> – You get a self-contained, portable result that you can move or back up anywhere you like.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400 text-xl">•</span>
                  <span>
                    <strong className="text-white">Originals remain where they are</strong> – Since you're working from an upload + ZIP download flow, your original files on your computer stay untouched unless you decide to replace or delete them yourself.
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </div>
     </main>
      
      <Footer />
    </div>
  );
};

export default GettingStarted;
