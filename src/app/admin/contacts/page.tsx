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
        <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg">
          Supabase is not configured.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-primary">Contact Inbox</h1>
        <span className="px-3 py-1 bg-gray-100 text-secondary rounded-full text-sm">
          {contacts.length} messages
        </span>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-lg" />)}
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-secondary">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-primary">{contact.name}</h3>
                    <span className="text-sm text-secondary">{new Date(contact.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-secondary mb-3">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-1 hover:text-accent-blue">
                      <Mail className="w-4 h-4" />
                      {contact.email}
                    </a>
                    {contact.company && (
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {contact.company}
                      </span>
                    )}
                  </div>
                  <p className="text-secondary whitespace-pre-wrap">{contact.message}</p>
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
