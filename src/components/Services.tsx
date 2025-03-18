import React from 'react';
import { Code2, Rocket, Shield, Smartphone } from 'lucide-react';
import type { ServiceCard } from '../types';

const services: ServiceCard[] = [
  {
    title: 'Web Development',
    description: 'Custom web solutions built with modern technologies',
    icon: Code2
  },
  {
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications',
    icon: Smartphone
  },
  {
    title: 'Cyber Security',
    description: 'Protect your digital assets with advanced security',
    icon: Shield
  },
  {
    title: 'Performance',
    description: 'Optimize your applications for maximum speed',
    icon: Rocket
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <service.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;