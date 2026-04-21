'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TeamMember } from '@/lib/types';
import { ChevronDown } from 'lucide-react';

const defaultTeamMembers = [
  { id: '1', name: 'Hiroshi Tanaka', role: 'Tech Lead', skills: ['System Design', 'Architecture', 'DevOps', 'Cloud'], avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', created_at: new Date().toISOString() },
  { id: '2', name: 'Sato Takeru', role: 'Senior Full-Stack & ERP', skills: ['Web', 'ERP Systems', 'Database Design', 'API'], avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face', created_at: new Date().toISOString() },
  { id: '3', name: 'Brian Cui', role: 'Senior IoT Engineer', skills: ['Embedded', 'Cloud Integration', 'Hardware', 'IoT Protocols'], avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', created_at: new Date().toISOString() },
  { id: '4', name: 'Thong Ng', role: 'Senior Frontend & Mobile Developer', skills: ['iOS', 'Android', 'Cross-platform', 'UI/UX'], avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', created_at: new Date().toISOString() },
  { id: '5', name: 'Chongzhi Wei', role: 'Senior Backend & ML Engineer', skills: ['Express', 'Django', 'FastAPI', 'Machine Learning'], avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face', created_at: new Date().toISOString() },
  { id: '6', name: 'Yuki Tanaka', role: 'Senior DevOps Engineer', skills: ['Kubernetes', 'AWS', 'CI/CD', 'Terraform'], avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', created_at: new Date().toISOString() },
  { id: '7', name: 'Akiko Sato', role: 'Senior UX Designer', skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'], avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', created_at: new Date().toISOString() },
  { id: '8', name: 'Kenji Ito', role: 'Senior Mobile Developer', skills: ['Swift', 'Kotlin', 'React Native', 'Flutter'], avatar_url: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face', created_at: new Date().toISOString() },
];

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

const colors = [
  'from-blue-600 to-blue-700',
  'from-green-600 to-green-700',
  'from-purple-600 to-purple-700',
  'from-orange-600 to-orange-700',
  'from-pink-600 to-pink-700',
  'from-cyan-600 to-cyan-700',
  'from-indigo-600 to-indigo-700',
  'from-teal-600 to-teal-700',
];

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [visibleCount] = useState(4);

  useEffect(() => {
    async function fetchTeamMembers() {
      if (!supabase) { setLoading(false); return; }
      const { data, error } = await supabase.from('team_members').select('*').order('created_at', { ascending: true });
      if (!error && data) setTeamMembers(data);
      setLoading(false);
    }
    fetchTeamMembers();
  }, []);

  const displayMembers = teamMembers.length > 0 ? teamMembers : defaultTeamMembers;
  const visibleMembers = showAll ? displayMembers : displayMembers.slice(0, visibleCount);
  const hasMore = displayMembers.length > visibleCount;

  return (
    <section id="team" className="py-24 bg-white dark:bg-[#0a0a0a] relative overflow-visible">
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Senior engineers with deep expertise across all technology domains
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 dark:bg-[#111] rounded-2xl h-64" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#111] dark:to-[#151515] border border-gray-200 dark:border-white/5 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:border-blue-500/20 transition-all duration-300 text-center"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    {member.avatar_url ? (
                      <img
                        src={member.avatar_url}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full shadow-lg"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${colors[index % colors.length]} rounded-full flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl font-bold text-white">{getInitials(member.name)}</span>
                      </div>
                    )}
                    {member.country ? (
                      <img
                        src={`https://circle-flags.cdn.skk.moe/flags/${member.country.toLowerCase()}.svg`}
                        alt=""
                        className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-white dark:border-[#111] dark:bg-[#111] shadow-sm"
                      />
                    ) : (
                      <div className={`absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br ${colors[index % colors.length]} rounded-full border-2 border-white dark:border-[#111]`} />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-3">{member.role}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.skills?.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  {showAll ? 'Show Less' : 'Show More'}
                  <ChevronDown className={`w-5 h-5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}