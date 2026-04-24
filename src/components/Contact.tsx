'use client';

import { Mail } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#111] relative overflow-visible">
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <div className="absolute -top-20 -left-32 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to build your system?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Book a 30-minute technical consultation with our senior team. We specialize in building complete, production-ready solutions — from device firmware to cloud infrastructure to web and mobile applications.
            </p>
            <div className="text-lg text-gray-600 dark:text-gray-400 space-y-4">
              <a href="mailto:contact@aetherstack.top" className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
                <span>contact@aetherstack.top</span>
              </a>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}