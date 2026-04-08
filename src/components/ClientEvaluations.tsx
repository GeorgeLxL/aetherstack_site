'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ClientEvaluation } from '@/lib/types';
import { Star, Quote, User } from 'lucide-react';

export default function ClientEvaluations() {
  const [evaluations, setEvaluations] = useState<ClientEvaluation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvaluations() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('client_evaluations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setEvaluations(data);
      }
      setLoading(false);
    }

    fetchEvaluations();
  }, []);

  const defaultEvaluations = [
    {
      id: '1',
      client_name: 'John Smith',
      company: 'TechCorp Inc.',
      rating: 5,
      feedback: 'Outstanding team that delivered a complex IoT platform on time. Their senior expertise really showed in the architecture quality.',
      avatar_url: '',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      client_name: 'Lisa Johnson',
      company: 'Manufacturing Co.',
      rating: 5,
      feedback: 'They transformed our legacy systems into a modern, cloud-native solution. Communication was excellent throughout.',
      avatar_url: '',
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      client_name: 'David Lee',
      company: 'HealthTech Solutions',
      rating: 5,
      feedback: 'Senior team that truly understands end-to-end development. Our mobile app and backend were perfectly integrated.',
      avatar_url: '',
      created_at: new Date().toISOString(),
    },
  ];

  const displayEvaluations = evaluations.length > 0 ? evaluations : defaultEvaluations;

  return (
    <section id="evaluations" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Client Evaluations</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            What our clients say about working with us
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-48" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayEvaluations.map((evalItem) => (
              <div
                key={evalItem.id}
                className="bg-surface p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < evalItem.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-gray-200 mb-3" />
                <p className="text-secondary mb-4 leading-relaxed">&quot;{evalItem.feedback}&quot;</p>
                <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                  {evalItem.avatar_url ? (
                    <>
                    <img src={evalItem.avatar_url} alt={evalItem.client_name} className="w-14 h-14 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-primary">{evalItem.client_name}</p>
                      <p className="text-sm text-secondary">{evalItem.company}</p>
                    </div>
                    </>
                  ) : (
                    <>
                      <div className='text-center w-full'>
                        <p className="font-semibold text-primary">{evalItem.client_name}</p>
                        <p className="text-sm text-secondary">{evalItem.company}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
