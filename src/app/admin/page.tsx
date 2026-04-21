'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Users, Briefcase, MessageSquare, ArrowRight, Mail } from 'lucide-react';
import { getCounts, supabase } from '@/lib/supabase';

const stats = [
  {
    label: 'Team Members',
    href: '/admin/team',
    icon: Users,
    color: 'bg-blue-500',
    key: 'members',
  },
  {
    label: 'Work Items',
    href: '/admin/work',
    icon: Briefcase,
    color: 'bg-emerald-500',
    key: 'workItems',
  },
  {
    label: 'Client Evaluations',
    href: '/admin/evaluations',
    icon: MessageSquare,
    color: 'bg-orange-500',
    key: 'evaluations',
  },
  {
    label: 'Today\'s Contacts',
    href: '/admin/contacts',
    icon: Mail,
    color: 'bg-purple-500',
    key: 'todayContacts',
  },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    members: 0,
    workItems: 0,
    evaluations: 0,
    todayContacts: 0,
  });

  useEffect(() => {
    fetchCounts();

    // Subscribe to real-time updates
    const subscription = supabase?.channel('dashboard_counts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_members' }, () => fetchCounts())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'work_items' }, () => fetchCounts())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'client_evaluations' }, () => fetchCounts())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, () => fetchCounts())
      .subscribe();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  async function fetchCounts() {
    const data = await getCounts();
    if (data) {
      setCounts(data);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary dark:text-white mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg transition-all"
          >
            <div className={`p-4 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-primary dark:text-white">{stat.label}</p>
              <p className="text-2xl font-bold text-primary dark:text-white">{counts[stat.key as keyof typeof counts]}</p>
              <p className="text-sm text-secondary dark:text-gray-400">Manage {stat.label.toLowerCase()}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
