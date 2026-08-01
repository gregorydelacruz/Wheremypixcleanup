import { toast } from 'sonner';
import { PRICING_PLANS } from '@/lib/constants';
import PricingCard, { PricingPlan } from '@/components/PricingCard';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

// import Navbar from '@/components/Navbar'; // Still commented out as in your original

const Pricing = () => {
  const handleSelectPlan = async (plan: PricingPlan) => {
    if (plan.id === 'free') {
      toast.success('You have successfully subscribed to the Free plan');
      return;
    }
    
    if (plan.id === 'vip') {
      const successUrl = `${window.location.origin}/success?plan=${plan.id}`;
      const cancelUrlPricing = `${window.location.origin}/pricing`;
      const cancelUrlUpload = `${window.location.origin}/upload`;
      const cancelUrlSignup = `${window.location.origin}/signup`;
      const cancelUrlUsage = `${window.location.origin}/usage`;
      const cancelUrlLogin = `${window.location.origin}/login`;

      window.location.href = 'https://buy.stripe.com/fZecPM4SU4Hp55mbIM';
      return;
    }
    
    if (plan.id === 'pro') {
      const successUrl = `${window.location.origin}/success?plan=${plan.id}`;
      const cancelUrlPricing = `${window.location.origin}/pricing`;
      const cancelUrlUpload = `${window.location.origin}/upload`;
      const cancelUrlSignup = `${window.location.origin}/signup`;
      const cancelUrlUsage = `${window.location.origin}/usage`;
      const cancelUrlLogin = `${window.location.origin}/login`;

      window.location.href = 'https://buy.stripe.com/8wM174856ddV0P66or';
      return;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <SEO
        title="Pricing — Where My Pix Photo Organizer Plans"
        description="Simple, transparent pricing for Where My Pix. Compare Free, Pro, and VIP plans for AI photo organizing."
        keywords={["photo organizer pricing", "where my pix plans", "pro vip subscription"]}
        canonicalUrl="https://stripe-price-magic-58.lovable.app/pricing"
      />
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF] to-[#0056b3]" />
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 pt-28 pb-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-6 animate-fade-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Always know what you'll pay. No hidden fees or surprise charges.
            </p>
          </div>

          <div
            className="grid md:grid-cols-3 gap-8 animate-fade-up relative items-stretch"
            style={{ animationDelay: '200ms' }}
          >
            {PRICING_PLANS.map((plan, index) => (
              <div
                key={plan.id}
                className="flex flex-col transform hover:-translate-y-2 transition-all duration-300 z-10"
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <PricingCard plan={plan} onSelectPlan={handleSelectPlan} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Pricing;
