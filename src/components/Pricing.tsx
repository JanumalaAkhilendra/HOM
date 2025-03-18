import React from 'react';
import { Check } from 'lucide-react';
import type { PricingTier } from '../types';

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    price: 29,
    features: ['5 Projects', 'Basic Analytics', 'Email Support', '1GB Storage']
  },
  {
    name: 'Professional',
    price: 99,
    features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', '10GB Storage'],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 299,
    features: ['Custom Solutions', 'Dedicated Support', 'SLA Agreement', 'Unlimited Storage']
  }
];

const Pricing: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-lg p-8 ${
                tier.recommended
                  ? 'bg-blue-600 text-white ring-4 ring-blue-600 shadow-lg'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              {tier.recommended && (
                <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                  Recommended
                </span>
              )}
              <h3 className="text-2xl font-bold">{tier.name}</h3>
              <p className="mt-4 text-4xl font-bold">${tier.price}</p>
              <p className={`${tier.recommended ? 'text-blue-100' : 'text-gray-500'} mb-6`}>
                per month
              </p>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold ${
                  tier.recommended
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;