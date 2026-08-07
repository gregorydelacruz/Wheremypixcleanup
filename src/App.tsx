import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SocialShareProvider } from "@/contexts/SocialShareContext";
import AuthProvider from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";
import ProtectedAdminRoute from "@/auth/ProtectedAdminRoute";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AfterLoginSync from "@/components/auth/AfterLoginSync";

// Pages
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import Demos from "./pages/Demos";
import Demos2 from "./pages/Demos2";
import Contact from "./pages/Contact";
import GettingStarted from "./pages/GettingStarted";
import Troubleshooting from "./pages/Troubleshooting";
import UploadingPhotos from "./pages/UploadingPhotos";
import Features from "./pages/Features";
import Examples from "./pages/Examples";
import About from "./pages/About";
import Admin from "./pages/Admin";
import FAQ from "./pages/FAQ";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import Upload from "./pages/Upload";
import Help from "./pages/Help";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Usage from "./pages/Usage";
import ChromeExtension from "./pages/ChromeExtension";
import ChromeStorePolicy from "./pages/ChromeStorePolicy";
import VipSignup from "./pages/VipSignup";

// Initialize QueryClient for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light" storageKey="where-my-pix-theme">
          <SocialShareProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AuthProvider>
                  <AfterLoginSync />
                  <ScrollToTop />
                  <div className="flex flex-col min-h-screen overflow-x-hidden">
                    <Navbar />

                    <main className="flex-grow overflow-auto">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/pricing" element={<Pricing />} />

                        <Route
                          path="/upload"
                          element={
                            <ProtectedRoute>
                              <Upload />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/usage"
                          element={
                            <ProtectedRoute>
                              <Usage />
                            </ProtectedRoute>
                          }
                        />

                        {/* Admin (guarded by email allow-list in ProtectedAdminRoute) */}
                        <Route element={<ProtectedAdminRoute />}>
                          <Route path="/admin" element={<Admin />} />
                        </Route>

                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/disclaimer" element={<Disclaimer />} />
                        <Route path="/demos2" element={<Demos2 />} />
                        <Route path="/gettingstarted" element={<GettingStarted />} />
                        <Route path="/troubleshooting" element={<Troubleshooting />} />
                        <Route path="/uploadingphotos" element={<UploadingPhotos />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/demos" element={<Demos />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/success" element={<Success />} />
                        <Route path="/examples" element={<Examples />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/vip-signup" element={<VipSignup />} />
                        <Route path="/chrome-extension" element={<ChromeExtension />} />
                        <Route path="/chrome-store-policy" element={<ChromeStorePolicy />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <ScrollToTopButton />
                  </div>
                </AuthProvider>
              </BrowserRouter>
            </TooltipProvider>
          </SocialShareProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
