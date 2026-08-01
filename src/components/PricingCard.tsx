
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Feature {
  name: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  priceInfo: string;
  features: Feature[];
  buttonText: string;
  isPopular?: boolean;
  stripePriceId?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelectPlan: (plan: PricingPlan) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelectPlan }) => {
  return (
    <div 
      className={cn(
        "pricing-card relative flex flex-col p-6 bg-card rounded-xl border shadow-sm",
        "transition-all duration-300 h-full",
        plan.isPopular && "popular-plan z-10"
      )}
    >
      {plan.isPopular && (
        <Badge 
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white border-none px-3 py-1"
        >
          Most Popular
        </Badge>
      )}

      <div className="mb-5 space-y-2">
        <h3 className="text-2xl font-semibold">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </div>

      <div className="mb-6">
        <span className="text-3xl font-bold">{plan.price}</span>
        <span className="text-sm text-muted-foreground ml-1">{plan.priceInfo}</span>
      </div>

      <ul className="space-y-3 mb-6 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            {feature.included ? (
              <Check className="h-5 w-5 text-green-500 shrink-0 mr-2" />
            ) : (
              <X className="h-5 w-5 text-red-500 shrink-0 mr-2" />
            )}
            <span className={cn(
              "text-sm",
              feature.included ? "text-foreground" : "text-muted-foreground"
            )}>
              {feature.name}
            </span>
          </li>
        ))}
      </ul>

      <Button 
        onClick={() => onSelectPlan(plan)}
        className={cn(
          "mt-auto w-full transition-all",
          plan.id === "vip" 
            ? "bg-green-600 hover:bg-green-700 text-white" 
            : plan.isPopular 
            ? "bg-primary hover:bg-primary/90" 
            : "bg-secondary hover:bg-secondary/80 text-foreground"
        )}
      >
        {plan.buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
