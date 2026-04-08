'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase, uploadImage } from '@/lib/supabase';
import { ClientEvaluation } from '@/lib/types';
import { Plus, Pencil, Trash2, X, Star, Upload, Image as ImageIcon } from 'lucide-react';

export default function AdminEvaluations() {
  const [evaluations, setEvaluations] = useState<ClientEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    client_name: '',
    company: '',
    rating: 5,
    feedback: '',
    avatar_url: '',
  });

  useEffect(() => {
    fetchEvaluations();
  }, []);

  async function fetchEvaluations() {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase.from('client_evaluations').select('*').order('created_at', { ascending: false });
    if (data) setEvaluations(data);
    setLoading(false);
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    const url = await uploadImage(file, 'avatars', 'clients');
    if (url) {
      setFormData({ ...formData, avatar_url: url });
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    
    if (editingId) {
      await supabase.from('client_evaluations').update(formData).eq('id', editingId);
    } else {
      await supabase.from('client_evaluations').insert(formData);
    }
    
    setShowModal(false);
    setEditingId(null);
    setFormData({ client_name: '', company: '', rating: 5, feedback: '', avatar_url: '' });
    fetchEvaluations();
  }

  async function handleDelete(id: string) {
    if (!supabase) return;
    if (confirm('Delete this evaluation?')) {
      await supabase.from('client_evaluations').delete().eq('id', id);
      fetchEvaluations();
    }
  }

  function handleEdit(evalItem: ClientEvaluation) {
    setEditingId(evalItem.id);
    setFormData({
      client_name: evalItem.client_name,
      company: evalItem.company,
      rating: evalItem.rating,
      feedback: evalItem.feedback,
      avatar_url: evalItem.avatar_url || '',
    });
    setShowModal(true);
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
        <h1 className="text-2xl font-bold text-primary">Client Evaluations</h1>
        <button
          onClick={() => { setShowModal(true); setEditingId(null); setFormData({ client_name: '', company: '', rating: 5, feedback: '', avatar_url: '' }); }}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Add Evaluation
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-100 rounded-lg" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {evaluations.map((evalItem) => (
            <div key={evalItem.id} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < evalItem.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(evalItem)} className="p-2 text-gray-400 hover:text-blue-600">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(evalItem.id)} className="p-2 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-secondary text-sm mb-4 italic">"{evalItem.feedback}"</p>
              <div className="border-t border-gray-100 pt-3 flex items-center gap-3">
                {evalItem.avatar_url ? (
                  <img src={evalItem.avatar_url} alt={evalItem.client_name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-primary">{evalItem.client_name}</p>
                  <p className="text-sm text-secondary">{evalItem.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-6 bg-white rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">{editingId ? 'Edit' : 'Add'} Evaluation</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Client Avatar</label>
                <div className="flex items-center gap-4">
                  {formData.avatar_url ? (
                    <img src={formData.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4" />
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Client Name</label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={e => setFormData({...formData, client_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Rating</label>
                <select
                  value={formData.rating}
                  onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Feedback</label>
                <textarea
                  value={formData.feedback}
                  onChange={e => setFormData({...formData, feedback: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>
              <button type="submit" className="w-full py-2 bg-accent-blue text-white rounded-lg hover:bg-blue-700">
                {editingId ? 'Update' : 'Create'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
