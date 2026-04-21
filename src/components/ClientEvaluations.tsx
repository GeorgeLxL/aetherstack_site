'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ClientEvaluation } from '@/lib/types';
import { Star, Quote } from 'lucide-react';

const defaultEvaluations = [
  { id: '1', client_name: 'John Smith', company: 'TechCorp Inc.', rating: 5, feedback: 'Outstanding team that delivered a complex IoT platform on time. Their senior expertise really showed in the architecture quality.', avatar_url: '', created_at: new Date().toISOString() },
  { id: '2', client_name: 'Lisa Johnson', company: 'Manufacturing Co.', rating: 5, feedback: 'They transformed our legacy systems into a modern, cloud-native solution. Communication was excellent throughout.', avatar_url: '', created_at: new Date().toISOString() },
  { id: '3', client_name: 'David Lee', company: 'HealthTech Solutions', rating: 5, feedback: 'Senior team that truly understands end-to-end development. Our mobile app and backend were perfectly integrated.', avatar_url: '', created_at: new Date().toISOString() },
];

export default function ClientEvaluations() {
  const [evaluations, setEvaluations] = useState<ClientEvaluation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvaluations() {
      if (!supabase) { setLoading(false); return; }
      const { data, error } = await supabase.from('client_evaluations').select('*').order('created_at', { ascending: false });
      if (!error && data) setEvaluations(data);
      setLoading(false);
    }
    fetchEvaluations();
  }, []);

  const displayEvaluations = evaluations.length > 0 ? evaluations : defaultEvaluations;

  return (
    <section id="evaluations" className="py-24 bg-white dark:bg-[#0f0f0f] relative overflow-visible">
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <div className="absolute -top-20 -right-32 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-green-400/10 rounded-full blur-2xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Client Evaluations</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            What our clients say about working with us
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 dark:bg-[#111] rounded-2xl h-48" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayEvaluations.map((evalItem) => (
              <div
                key={evalItem.id}
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#111] dark:to-[#151515] p-6 rounded-2xl border border-gray-200 dark:border-white/5 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < evalItem.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-400/50 mb-3" />
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed italic">&quot;{evalItem.feedback}&quot;</p>
                <div className="border-t border-gray-200 dark:border-white/5 pt-4">
                  <p className="font-bold text-gray-900 dark:text-white">{evalItem.client_name}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{evalItem.company}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}