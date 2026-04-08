'use client';

import { Mail } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-white mb-4">
              Ready to build your system?
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-300 mb-8 leading-relaxed">
              Book a 30-minute technical consultation with our senior team. We specialize in building complete, production-ready solutions — from device firmware to cloud infrastructure to web and mobile applications. Whether you need a new product built from scratch or want to modernize an existing system, our team has the expertise to deliver.
            </p>
            <div className="text-lg text-gray-300 dark:text-gray-300 space-y-4">
              <a href="mailto:contact@aetherstack.com" className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>contact@aetherstack.com</span>
              </a>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Send us a message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
