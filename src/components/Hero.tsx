'use client';

import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-visible bg-white dark:bg-[#0a0a0a] pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:via-[#0a0a0a] dark:to-[#0a0a0a]" />
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-green-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-full text-sm text-blue-600 dark:text-blue-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Available for New Projects
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
            From Devices to Cloud to Apps — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">One Senior Team Builds It All</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Complete, production-ready web, mobile, and IoT systems — no gaps, no juniors, no outsourcing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#contact" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              Book a Technical Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#portfolio" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-gray-900 dark:text-white border-2 border-gray-300 dark:border-white/30 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300">
              See Our Work
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-500 dark:text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span>Senior Only Team</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span>End-to-End Ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span>Production-Ready Code</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 dark:border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-gray-400 dark:bg-white/40 rounded-full animate-pulse"/>
        </div>
      </div>
    </section>
  );
}