'use client';

import { Server, Wifi, Smartphone, Network } from 'lucide-react';

const services = [
  {
    icon: Server,
    title: 'Custom Web & ERP Systems',
    subtext: 'Scalable, secure platforms tailored to your business',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: Wifi,
    title: 'IoT & Connected Devices',
    subtext: 'Fully integrated hardware-to-cloud solutions',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    subtext: 'iOS, Android, or cross-platform apps built for performance',
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    icon: Network,
    title: 'End-to-End System Architecture',
    subtext: 'Concept to production with QA, CI/CD, and DevOps',
    gradient: 'from-purple-500 to-purple-600',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What We Do</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Complete development services from hardware to cloud to user-facing applications
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} mb-6`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
