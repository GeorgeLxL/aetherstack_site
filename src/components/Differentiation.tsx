'use client';

import { X, Minus } from 'lucide-react';

const differentiators = [
  { icon: X, title: 'No junior developers', description: 'Every engineer is senior-level with proven experience', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10' },
  { icon: Minus, title: 'No outsourcing', description: 'In-house team you can meet and work with directly', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
  { icon: X, title: 'No half-finished systems', description: 'Production-ready code with full documentation', color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-500/10' },
  { icon: X, title: 'No "we\'ll figure it out later"', description: 'Solid architecture designed for scale from day one', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10' },
];

export default function Differentiation() {
  return (
    <section className="py-24 bg-white dark:bg-[#0a0a0a] relative overflow-visible">
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-32 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">What You Won&apos;t Get With Us</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            We believe in quality, transparency, and lasting solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#111] dark:to-[#151515] p-6 rounded-2xl border border-gray-200 dark:border-white/5 hover:shadow-xl hover:border-red-300 dark:hover:border-red-500/30 transition-all duration-300">
              <div className={`inline-flex p-3 rounded-full mb-4 ${item.bg} ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}