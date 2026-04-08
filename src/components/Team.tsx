'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TeamMember } from '@/lib/types';
import { User, Wrench, Cloud, Smartphone } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'tech-lead': User,
  'web-erp': Wrench,
  'iot': Cloud,
  'mobile': Smartphone,
  User,
  Wrench,
  Cloud,
  Smartphone,
};

const defaultTeamMembers = [
  {
    id: '1',
    name: 'Hiroshi Tanaka',
    role: 'Tech Lead',
    skills: ['System Design', 'Architecture', 'DevOps', 'Cloud'],
    icon: 'tech-lead',
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Sato Takeru',
    role: 'Senior Full-Stack & ERP',
    skills: ['Web', 'ERP Systems', 'Database Design', 'API'],
    icon: 'web-erp',
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Brian Cui',
    role: 'Senior IoT Engineer',
    skills: ['Embedded', 'Cloud Integration', 'Hardware', 'IoT Protocols'],
    icon: 'iot',
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Thong Ng',
    role: 'Senior Frontend & Mobile Developer',
    skills: ['iOS', 'Android', 'Cross-platform', 'UI/UX'],
    icon: 'mobile',
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Chongzhi Wei',
    role: 'Senior Backend & ML Engineer ',
    skills: ['Express', 'Django', 'FastAPI', 'Machine Learning'],
    icon: 'mobile',
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
];

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamMembers() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (!error && data) {
        setTeamMembers(data);
      }
      setLoading(false);
    }

    fetchTeamMembers();
  }, []);

  const displayMembers = teamMembers.length > 0 ? teamMembers : defaultTeamMembers;

  return (
    <section id="team" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Senior engineers with deep expertise across all technology domains
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-48" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {displayMembers.map((member) => {
              const IconComponent = iconMap[member.icon || 'User'] || User;
              return (
                <div
                  key={member.id}
                  className="group bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-center"
                >
                  {member.avatar_url ? (
                    <img src={member.avatar_url} alt={member.name} className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-14 h-14 text-white" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-3">{member.role}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
