'use client';

import { Users, GitBranch, CheckCircle2, Rocket } from 'lucide-react';

const steps = [
  { icon: Users, title: 'Single Senior Team', description: 'One cohesive team of senior engineers' },
  { icon: GitBranch, title: 'End-to-End Ownership', description: 'Full ownership from design to deployment' },
  { icon: CheckCircle2, title: 'Built-in QA & Automation', description: 'Tested and automated from day one' },
  { icon: Rocket, title: 'Fast Iteration & Reliable Delivery', description: 'Rapid development with predictable outcomes' },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-gray-50 dark:bg-[#0f0f0f] relative overflow-visible">
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <div className="absolute top-10 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-32 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">How We Work</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            One team. Full ownership. Tested, automated, deployment-ready from day one.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-500/30 to-transparent" />
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}