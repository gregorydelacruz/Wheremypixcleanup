import React from 'react';
import Footer from '@/components/Footer';
const UploadingPhotos = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#090e28] via-[#232b61] to-[#2e184a]">
      <main className="flex-1 flex flex-col items-center pt-24 pb-24 px-4">
        <div className="max-w-5xl w-full mx-auto">
          {/* Main Card Container - styled like Social Proof */}
          <div className="bg-black/70 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-12">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Uploading Photos
              </h1>
              <p className="text-xl text-white/80">
                How to upload and manage your photos
              </p>
            </div>

            {/* Intro Paragraph */}
            <div className="mb-10">
              <p className="text-white/90 text-lg leading-relaxed">
                Uploading photos is the first step in letting Where My Pix clean up your library. This section explains:
              </p>
              <ul className="mt-4 space-y-2 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>What kinds of files you can upload</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>How to start a new upload</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Recommended batch sizes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>What happens to your files during and after upload</span>
                </li>
              </ul>
            </div>

            {/* Supported File Types */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Supported File Types
              </h2>
              <p className="text-white/90 mb-4">
                Where My Pix is currently focused on common image formats:
              </p>
              <ul className="space-y-3 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400 text-xl">•</span>
                  <div>
                    <strong className="text-white">JPG / JPEG</strong> – Standard photos from phones and cameras
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400 text-xl">•</span>
                  <div>
                    <strong className="text-white">PNG</strong> – Screenshots, graphics, and other images
                  </div>
                </li>
              </ul>
              <p className="text-white/70 italic mt-4 bg-white/5 p-4 rounded-lg border-l-4 border-pink-400">
                Other file types (like RAW, HEIC, videos, or PDFs) are ignored or skipped during processing. For best results, upload folders that mostly contain JPG/PNG files.
              </p>
            </div>

            {/* Starting a New Upload */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Starting a New Upload
              </h2>
              <ol className="space-y-4 ml-6 list-decimal text-white/90">
                <li>
                  <strong className="text-white">Sign in to your account</strong><br />
                  <span className="text-white/80">
                    Go to <a href="https://www.wheremypix.com/" className="text-pink-400 hover:text-pink-300 underline" target="_blank" rel="noopener noreferrer">wheremypix.com</a> and log in.
                  </span>
                </li>
                <li>
                  <strong className="text-white">Open the uploader</strong><br />
                  <span className="text-white/80">
                    From the main screen or dashboard, click <strong>"Upload Photos"</strong>, <strong>"Organize Photos"</strong>, or your equivalent call-to-action.
                  </span>
                </li>
                <li>
                  <strong className="text-white">Choose your files or folder</strong><br />
                  <span className="text-white/80">Use the file picker to:</span>
                  <ul className="ml-4 mt-2 space-y-1 text-white/80">
                    <li>• Select <strong>individual JPG/PNG files</strong>, or</li>
                    <li>• Select a <strong>folder</strong> of photos (if your browser/OS supports folder upload).</li>
                  </ul>
                </li>
              </ol>
              <p className="text-white/70 italic mt-4 bg-white/5 p-4 rounded-lg border-l-4 border-pink-400">
                Tip: If your photos are spread across several folders, you can upload one folder at a time and run multiple sessions.
              </p>
            </div>

            {/* Recommended Batch Sizes */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Recommended Batch Sizes
              </h2>
              <p className="text-white/90 mb-4">
                To keep things smooth and predictable:
              </p>
              <ul className="space-y-3 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>
                    For first-time use, start with <strong>a few hundred photos</strong> (e.g., one trip or a single year).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <div>
                    If your connection is slower, consider:
                    <ul className="ml-4 mt-1 space-y-1 text-white/80">
                      <li>• <strong>Smaller batches</strong> (100–300 photos at a time), or</li>
                      <li>• Splitting massive folders into multiple runs.</li>
                    </ul>
                  </div>
                </li>
              </ul>
              <p className="text-white/90 mt-4">
                You can run Where My Pix as many times as you need—there's no requirement to do your entire library in one go.
              </p>
            </div>

            {/* During Upload */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                During Upload
              </h2>
              <p className="text-white/90 mb-4">
                Once you confirm your selection:
              </p>
              <ul className="space-y-3 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>
                    Photos are <strong>sent securely</strong> to Where My Pix.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>
                    A progress indicator or status message shows that your upload is in progress.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <div>
                    After upload completes, processing begins automatically:
                    <ul className="ml-4 mt-1 space-y-1 text-white/80">
                      <li>• Each image is analyzed</li>
                      <li>• Categories are chosen</li>
                      <li>• Filenames and folders are prepared for your ZIP</li>
                    </ul>
                  </div>
                </li>
              </ul>
              <p className="text-white/80 mt-4">
                You don't need to stay on the exact screen the whole time, but it's best to keep the browser tab open until processing finishes.
              </p>
              <p className="text-white/80 mt-3">
                <strong>Your original photos on your computer are never touched, deleted, or renamed.</strong> Where My Pix creates new, organized copies that you download, so you can try it without worrying about your existing files.
              </p>
            </div>

            {/* After Processing */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                After Processing: Your ZIP Download
              </h2>
              <p className="text-white/90 mb-4">
                When processing is complete:
              </p>
              <ul className="space-y-3 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <div>
                    Where My Pix creates a <strong>folder structure</strong> with:
                    <ul className="ml-4 mt-1 space-y-1 text-white/80">
                      <li>• One folder per category (e.g., Trips, Family, Screenshots, Documents, etc.)</li>
                      <li>• Your <strong>renamed photos</strong> placed in the right folders</li>
                    </ul>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>
                    That entire structure is <strong>compressed into a single ZIP file</strong>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>
                    Your browser will start downloading the ZIP <strong>automatically</strong>
                  </span>
                </li>
              </ul>
              <p className="text-white/80 mt-4">
                You'll find the ZIP in your browser's standard <strong>Downloads</strong> location.
              </p>
            </div>

            {/* Managing Your Organized Photos */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Managing Your Organized Photos
              </h2>
              <p className="text-white/90 mb-4">
                Once the ZIP has downloaded:
              </p>
              <ol className="space-y-4 ml-6 list-decimal text-white/90">
                <li>
                  <strong className="text-white">Extract the ZIP</strong><br />
                  <span className="text-white/80">
                    Double-click the file or use your OS's unzip tool.<br />
                    Choose where to extract it (for example, your <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm">Pictures</code> folder or an external drive).
                  </span>
                </li>
                <li>
                  <strong className="text-white">Review the folders</strong><br />
                  <span className="text-white/80">Open a few category folders and confirm:</span>
                  <ul className="ml-4 mt-2 space-y-1 text-white/80">
                    <li>• Filenames look clear and consistent</li>
                    <li>• Photos are grouped in a way that makes sense to you</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Decide what to do with the originals</strong><br />
                  <span className="text-white/80">
                    Your original photos are <strong>not touched, deleted, renamed, or changed in any way</strong> by Where My Pix. We create new files with better filenames and a cleaner folder structure that you download as a ZIP.<br />
                    That means there’s no need to back up your photos first just to stay safe—although keeping backups is always a good idea.
                  </span>
                </li>
              </ol>
              <p className="text-white/70 italic mt-4 bg-white/5 p-4 rounded-lg border-l-4 border-pink-400">
                For safety, many users still keep an untouched backup of their original photos on an external drive or cloud storage, but it isn’t required to use Where My Pix.
              </p>
            </div>

            {/* Running Multiple Uploads */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Running Multiple Uploads
              </h2>
              <p className="text-white/90 mb-4">
                You can repeat the upload process as many times as you need:
              </p>
              <ul className="space-y-3 text-white/90">
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>One upload for <strong>old phone backups</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Another for a <strong>camera SD card dump</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Another for a <strong>"Misc" screenshots folder</strong></span>
                </li>
              </ul>
              <p className="text-white/90 mt-4">
                Each run gives you a separate ZIP file with its own organized structure, so you can merge or store them however you like.
              </p>
            </div>

          </div>
        </div>
     </main>

      <Footer />
    </div>
  );
};

export default UploadingPhotos;
