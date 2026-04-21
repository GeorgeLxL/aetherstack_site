'use client';

import { Server, Wifi, Smartphone, Network } from 'lucide-react';

const services = [
  { icon: Server, title: 'Custom Web & ERP Systems', subtext: 'Scalable, secure platforms tailored to your business', gradient: 'from-blue-500 to-blue-600' },
  { icon: Wifi, title: 'IoT & Connected Devices', subtext: 'Fully integrated hardware-to-cloud solutions', gradient: 'from-green-500 to-green-600' },
  { icon: Smartphone, title: 'Mobile Applications', subtext: 'iOS, Android, or cross-platform apps built for performance', gradient: 'from-purple-500 to-purple-600' },
  { icon: Network, title: 'End-to-End System Architecture', subtext: 'Concept to production with QA, CI/CD, and DevOps', gradient: 'from-orange-500 to-orange-600' },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-visible">
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <div className="absolute top-10 -right-32 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-24 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">What We Do</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Complete development services from hardware to cloud to user-facing applications
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-[#111] dark:to-[#151515] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/30"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} mb-6 shadow-lg`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{service.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}