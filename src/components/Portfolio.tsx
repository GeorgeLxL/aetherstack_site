'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { WorkItem } from '@/lib/types';
import { Box } from 'lucide-react';

export default function Portfolio() {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkItems() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('work_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setWorkItems(data);
      }
      setLoading(false);
    }

    fetchWorkItems();
  }, []);

  const defaultWorkItems = [
    {
      id: '1',
      title: 'Smart Manufacturing Platform',
      description: 'IoT-enabled factory automation system',
      challenge: 'Legacy ERP with disconnected devices',
      solution: 'Integrated IoT + ERP + mobile dashboard',
      result: 'Reduced downtime by 30%',
      image_url: '',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Healthcare Monitoring System',
      description: 'Real-time patient monitoring solution',
      challenge: 'Manual data collection delays',
      solution: 'Cloud-native IoT + analytics platform',
      result: '50% faster response time',
      image_url: '',
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'E-Commerce Platform',
      description: 'Full-featured online store with inventory management',
      challenge: 'Slow checkout process',
      solution: 'React-based SPA with real-time inventory',
      result: '40% increase in conversions',
      image_url: '',
      created_at: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Smart Home Hub',
      description: 'Centralized IoT control for smart homes',
      challenge: 'Device fragmentation',
      solution: 'Unified API for 50+ device types',
      result: 'Seamless multi-device control',
      image_url: '',
      created_at: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Fleet Management System',
      description: 'Real-time vehicle tracking and optimization',
      challenge: 'Manual route planning',
      solution: 'GPS tracking with ML-based route optimization',
      result: '25% fuel savings',
      image_url: '',
      created_at: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'Financial Analytics Dashboard',
      description: 'Real-time financial data visualization',
      challenge: 'Data silos',
      solution: 'Unified data pipeline with interactive dashboards',
      result: 'Real-time insights',
      image_url: '',
      created_at: new Date().toISOString(),
    },
    {
      id: '7',
      title: 'Restaurant POS System',
      description: 'Cloud-based point of sale for restaurants',
      challenge: 'Slow service',
      solution: 'Mobile POS with kitchen display system',
      result: '30% faster service',
      image_url: '',
      created_at: new Date().toISOString(),
    },
    {
      id: '8',
      title: 'Warehouse Automation',
      description: 'Robotic warehouse management system',
      challenge: 'Manual inventory picking',
      solution: 'Automated picking with robot coordination',
      result: '60% faster picking',
      image_url: '',
      created_at: new Date().toISOString(),
    },
    {
      id: '9',
      title: 'Education Platform',
      description: 'Online learning management system',
      challenge: 'Low engagement',
      solution: 'Interactive courses with progress tracking',
      result: '45% higher completion rates',
      image_url: '',
      created_at: new Date().toISOString(),
    },
    {
      id: '10',
      title: 'Energy Monitoring System',
      description: 'Building energy consumption tracking',
      challenge: 'High energy costs',
      solution: 'IoT sensors with AI optimization',
      result: '20% energy savings',
      image_url: '',
      created_at: new Date().toISOString(),
    },
    {
      id: '11',
      title: 'Smart Retail POS',
      description: 'AI-powered point of sale system',
      challenge: 'Inventory tracking issues',
      solution: 'Computer vision + RFID for auto-checkout',
      result: 'Zero queue checkout',
      image_url: '',
      created_at: new Date().toISOString(),
    },
    {
      id: '12',
      title: 'Telemedicine Platform',
      description: 'HIPAA-compliant telehealth solution',
      challenge: 'Limited healthcare access',
      solution: 'Video consultations with secure messaging',
      result: 'Expanded care to rural areas',
      image_url: '',
      created_at: new Date().toISOString(),
    },
  ];

  const displayItems = workItems.length > 0 ? workItems : defaultWorkItems;

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Work</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real-world solutions we&apos;ve built for our clients
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-64" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="h-40 w-full object-cover" />
                ) : (
                  <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    <Box className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.description}</p>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-gray-900 dark:text-white">Challenge:</span> <span className="text-gray-600 dark:text-gray-300">{item.challenge}</span></p>
                    <p><span className="font-medium text-gray-900 dark:text-white">Solution:</span> <span className="text-gray-600 dark:text-gray-300">{item.solution}</span></p>
                    <p><span className="font-medium text-green-600 dark:text-green-400">{item.result}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
