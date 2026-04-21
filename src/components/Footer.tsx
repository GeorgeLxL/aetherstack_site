'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 bg-gray-900 dark:bg-[#050505] text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">AetherStack</h3>
            <p className="text-gray-400 max-w-sm">
              Complete, production-ready web, mobile, and IoT systems — no gaps, no juniors, no outsourcing.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-gray-400">
              <li><Link href="#services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="#process" className="hover:text-white transition-colors">Process</Link></li>
              <li><Link href="#portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="#team" className="hover:text-white transition-colors">Team</Link></li>
              <li><Link href="#evaluations" className="hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 dark:border-white/5 mt-8 pt-8 text-center text-gray-400 dark:text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} AetherStack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}