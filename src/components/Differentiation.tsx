'use client';

import { X, Minus } from 'lucide-react';

const differentiators = [
  {
    icon: X,
    title: 'No junior developers',
    description: 'Every engineer is senior-level with proven experience',
    color: 'text-red-500',
  },
  {
    icon: Minus,
    title: 'No outsourcing',
    description: 'In-house team you can meet and work with directly',
    color: 'text-orange-500',
  },
  {
    icon: X,
    title: 'No half-finished systems',
    description: 'Production-ready code with full documentation',
    color: 'text-yellow-600',
  },
  {
    icon: X,
    title: 'No "we\'ll figure it out later"',
    description: 'Solid architecture designed for scale from day one',
    color: 'text-amber-600',
  },
];

export default function Differentiation() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What You Won&apos;t Get With Us</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We believe in quality, transparency, and lasting solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-full bg-gray-100 dark:bg-gray-700 mb-4 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
