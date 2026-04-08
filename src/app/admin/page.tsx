'use client';

import Link from 'next/link';
import { Users, Briefcase, MessageSquare, ArrowRight, Mail } from 'lucide-react';

const stats = [
  {
    label: 'Team Members',
    href: '/admin/team',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    label: 'Work Items',
    href: '/admin/work',
    icon: Briefcase,
    color: 'bg-emerald-500',
  },
  {
    label: 'Client Evaluations',
    href: '/admin/evaluations',
    icon: MessageSquare,
    color: 'bg-orange-500',
  },
  {
    label: 'Contacts',
    href: '/admin/contacts',
    icon: Mail,
    color: 'bg-purple-500',
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
          >
            <div className={`p-4 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-primary">{stat.label}</p>
              <p className="text-sm text-secondary">Manage {stat.label.toLowerCase()}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
