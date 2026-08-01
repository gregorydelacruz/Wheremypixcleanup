
import { PricingPlan } from "@/components/PricingCard";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out our features",
    price: "$0",
    priceInfo: "/month",
    features: [
      { name: "Process up to 25 images per month", included: true },
      { name: "Basic image categorization", included: true },
      { name: "Download processed images", included: true },
      { name: "Batch processing", included: false },
      { name: "Email support", included: false },
    ],
    buttonText: "Free - Really!",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For anyone with a SmartPhone!",
    price: "$9",
    priceInfo: "/month",
    features: [
      { name: "Process up to 10,000 images per month", included: true },
      { name: "Advanced image categorization", included: true },
      { name: "Download processed images", included: true },
      { name: "Email support", included: true },
      { name: "Batch processing", included: true },
    ],
    buttonText: "Subscribe Now",
    isPopular: true,
    stripePriceId: "price_1OKajd2eZvKYlo2Cl7t5wMNu"
  },
  {
    id: "vip",
    name: "VIP",
    description: "For Influencers and Teams",
    price: "$29",
    priceInfo: "/month",
    features: [
      { name: "Process up to 100,000 images per month", included: true },
      { name: "Advanced image categorization", included: true },
      { name: "Download processed images", included: true },
      { name: "Priority support", included: true },
      { name: "Batch processing", included: true },
    ],
    buttonText: "Subscribe Today",
  }
];
