'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Contact } from '@/lib/types';
import { Mail, Phone, Building, Trash2, Check, X } from 'lucide-react';

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();

    // Subscribe to real-time updates for contacts
    const subscription = supabase?.channel('contacts_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, () => {
        fetchContacts();
      })
      .subscribe();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  async function fetchContacts() {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (data) setContacts(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!supabase) return;
    if (confirm('Delete this message?')) {
      await supabase.from('contacts').delete().eq('id', id);
      fetchContacts();
    }
  }

  if (!supabase) {
    return (
      <div className="p-8">
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400 rounded-lg">
          Supabase is not configured.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-primary dark:text-white">Contact Inbox</h1>
        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-secondary dark:text-gray-400 rounded-full text-sm">
          {contacts.length} messages
        </span>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg" />)}
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Mail className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-secondary dark:text-gray-400">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-primary dark:text-white">{contact.name}</h3>
                    <span className="text-sm text-secondary dark:text-gray-400">{new Date(contact.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-secondary dark:text-gray-400 mb-3">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-1 hover:text-accent-blue">
                      <Mail className="w-4 h-4" />
                      {contact.email}
                    </a>
                    {contact.phone && (
                      <a href={`tel:${contact.phone}`} className="flex items-center gap-1 hover:text-accent-blue">
                        <Phone className="w-4 h-4" />
                        {contact.phone}
                      </a>
                    )}
                    {contact.company && (
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {contact.company}
                      </span>
                    )}
                  </div>
                  <p className="text-secondary dark:text-gray-400 whitespace-pre-wrap">{contact.message}</p>
                </div>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
