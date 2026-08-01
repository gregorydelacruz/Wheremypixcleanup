
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

const PricingSection = () => {
  const pricing = {
    monthly: 9.99,
    yearly: 99.99,
    usage: {
      free: 25,
      basic: 1000,
      premium: 10000
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Choose the plan that's right for you and start organizing your photos today.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="flex flex-col border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>For casual users who want to try our service.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-slate-600 dark:text-slate-400">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>{pricing.usage.free} photos per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Basic AI organization</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                  <span>Batch Processing</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          
          {/* Basic Plan */}
          <Card className="flex flex-col border-slate-200 dark:border-slate-800 bg-primary/5 border-primary/10 relative">
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-full">
              Popular
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Basic</CardTitle>
              <CardDescription>For anyone with a SmartPhone!.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${pricing.monthly.toFixed(2)}</span>
                <span className="text-slate-600 dark:text-slate-400">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>{pricing.usage.basic} photos per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Advanced AI organization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Priority email support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Batch Processing</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Duplicate detection</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="default">Subscribe Now</Button>
            </CardFooter>
          </Card>
          
          {/* Premium Plan */}
          <Card className="flex flex-col border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl">Premium</CardTitle>
              <CardDescription>For Influencers and Teams</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${(pricing.yearly / 12).toFixed(2)}</span>
                <span className="text-slate-600 dark:text-slate-400">/month</span>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  billed annually (${pricing.yearly.toFixed(2)}/year)
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>{pricing.usage.premium} photos per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Premium AI organization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>24/7 priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Bulk processing</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Subscribe Now</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-slate-400">
            Need a custom plan for your enterprise? <a href="/contact" className="text-primary underline underline-offset-2">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
