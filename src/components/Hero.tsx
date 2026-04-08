'use client';

import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-gray-50 to-gray-100 pt-16">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
            From Devices to Cloud to Apps — <span className="text-accent-blue">One Senior Team Builds It All</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto">
            Complete, production-ready web, mobile, and IoT systems — no gaps, no juniors, no outsourcing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              Book a Technical Call
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#portfolio" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary border-2 border-gray-200 font-semibold rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
              See Our Work
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-secondary">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent-green" />
              <span>Senior Only Team</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent-green" />
              <span>End-to-End Ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent-green" />
              <span>Production-Ready Code</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-gray-400 rounded-full animate-pulse"/>
        </div>
      </div>
    </section>
  );
}
