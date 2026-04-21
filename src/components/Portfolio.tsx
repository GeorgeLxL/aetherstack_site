'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { WorkItem } from '@/lib/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const defaultWorkItems = [
  { id: '1', title: 'Smart Manufacturing Platform', description: 'IoT-enabled factory automation system', challenge: 'Legacy ERP with disconnected devices', solution: 'Integrated IoT + ERP + mobile dashboard', result: 'Reduced downtime by 30%', image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop', created_at: new Date().toISOString() },
  { id: '2', title: 'Healthcare Monitoring System', description: 'Real-time patient monitoring solution', challenge: 'Manual data collection delays', solution: 'Cloud-native IoT + analytics platform', result: '50% faster response time', image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop', created_at: new Date().toISOString() },
  { id: '3', title: 'E-Commerce Platform', description: 'Full-featured online store', challenge: 'Slow checkout process', solution: 'React-based SPA with real-time inventory', result: '40% increase in conversions', image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop', created_at: new Date().toISOString() },
  { id: '4', title: 'Smart Home Hub', description: 'Centralized IoT control for smart homes', challenge: 'Device fragmentation', solution: 'Unified API for 50+ device types', result: 'Seamless multi-device control', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop', created_at: new Date().toISOString() },
  { id: '5', title: 'Fleet Management System', description: 'Real-time vehicle tracking', challenge: 'Manual route planning', solution: 'GPS tracking with ML-based optimization', result: '25% fuel savings', image_url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop', created_at: new Date().toISOString() },
  { id: '6', title: 'Financial Analytics Dashboard', description: 'Real-time financial visualization', challenge: 'Data silos', solution: 'Unified data pipeline with dashboards', result: 'Real-time insights', image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop', created_at: new Date().toISOString() },
];

export default function Portfolio() {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkItems() {
      if (!supabase) { setLoading(false); return; }
      const { data, error } = await supabase.from('work_items').select('*').order('created_at', { ascending: false });
      if (!error && data) setWorkItems(data);
      setLoading(false);
    }
    fetchWorkItems();
  }, []);

  const displayItems = workItems.length > 0 ? workItems : defaultWorkItems;

  return (
    <section id="portfolio" className="py-24 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-visible">
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <div className="absolute -top-20 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-32 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Work</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Real-world solutions we&apos;ve built</p>
        </div>

        {loading ? (
          <div className="animate-pulse bg-gray-200 dark:bg-[#111] rounded-2xl h-96" />
        ) : (
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            speed={1500}
            navigation
            pagination={{ clickable: true }}
            className="pb-12 !pb-20"
          >
            {displayItems.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <div className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-[#111] dark:to-[#151515] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 dark:hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col">
                  <div className="h-40 w-full relative flex-shrink-0">
                    <img 
                      src={item.image_url || `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format`} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold text-blue-600 dark:text-blue-400">Challenge:</span> <span className="text-gray-600 dark:text-gray-400">{item.challenge}</span></p>
                      <p><span className="font-semibold text-green-600 dark:text-green-400">Solution:</span> <span className="text-gray-600 dark:text-gray-400">{item.solution}</span></p>
                      <p className="font-bold text-lg text-green-500">{item.result}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}