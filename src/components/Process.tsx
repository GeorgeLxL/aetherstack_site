'use client';

import { Users, GitBranch, CheckCircle2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Users,
    title: 'Single Senior Team',
    description: 'One cohesive team of senior engineers',
  },
  {
    icon: GitBranch,
    title: 'End-to-End Ownership',
    description: 'Full ownership from design to deployment',
  },
  {
    icon: CheckCircle2,
    title: 'Built-in QA & Automation',
    description: 'Tested and automated from day one',
  },
  {
    icon: Rocket,
    title: 'Fast Iteration & Reliable Delivery',
    description: 'Rapid development with predictable outcomes',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How We Work</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            One team. Full ownership. Tested, automated, deployment-ready from day one.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 w-20 h-20 bg-gray-50 dark:bg-gray-800 border-4 border-gray-100 dark:border-gray-700 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                
                <div className="absolute top-10 md:right-0 transform translate-x-1/2 -translate-y-1/2 hidden md:block">
                  {index < steps.length - 1 && (
                    <svg className="w-8 h-8 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
