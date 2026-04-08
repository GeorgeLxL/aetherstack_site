'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase, uploadImage } from '@/lib/supabase';
import { WorkItem } from '@/lib/types';
import { Plus, Pencil, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';

export default function AdminWork() {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    challenge: '',
    solution: '',
    result: '',
    image_url: '',
  });

  useEffect(() => {
    fetchWorkItems();
  }, []);

  async function fetchWorkItems() {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase.from('work_items').select('*').order('created_at', { ascending: false });
    if (data) setWorkItems(data);
    setLoading(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    const url = await uploadImage(file, 'images', 'work');
    if (url) {
      setFormData({ ...formData, image_url: url });
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    
    if (editingId) {
      await supabase.from('work_items').update(formData).eq('id', editingId);
    } else {
      await supabase.from('work_items').insert(formData);
    }
    
    setShowModal(false);
    setEditingId(null);
    setFormData({ title: '', description: '', challenge: '', solution: '', result: '', image_url: '' });
    fetchWorkItems();
  }

  async function handleDelete(id: string) {
    if (!supabase) return;
    if (confirm('Delete this work item?')) {
      await supabase.from('work_items').delete().eq('id', id);
      fetchWorkItems();
    }
  }

  function handleEdit(item: WorkItem) {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description,
      challenge: item.challenge,
      solution: item.solution,
      result: item.result,
      image_url: item.image_url || '',
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
        <h1 className="text-2xl font-bold text-primary">Work Items</h1>
        <button
          onClick={() => { setShowModal(true); setEditingId(null); setFormData({ title: '', description: '', challenge: '', solution: '', result: '', image_url: '' }); }}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Add Work Item
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-lg" />)}
        </div>
      ) : (
        <div className="grid gap-4">
          {workItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex gap-4">
                {item.image_url && (
                  <img src={item.image_url} alt={item.title} className="w-32 h-32 rounded-lg object-cover" />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                      <p className="text-secondary text-sm mb-3">{item.description}</p>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div><span className="font-medium text-primary">Challenge:</span> <span className="text-secondary">{item.challenge}</span></div>
                        <div><span className="font-medium text-primary">Solution:</span> <span className="text-secondary">{item.solution}</span></div>
                        <div><span className="font-medium text-accent-green">Result:</span> <span className="text-secondary">{item.result}</span></div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-blue-600">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg p-6 bg-white rounded-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">{editingId ? 'Edit' : 'Add'} Work Item</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Image</label>
                <div className="flex items-center gap-4">
                  {formData.image_url ? (
                    <img src={formData.image_url} alt="Preview" className="w-24 h-24 rounded-lg object-cover" />
                  ) : (
                    <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
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
                <label className="block text-sm font-medium text-primary mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Challenge</label>
                <textarea
                  value={formData.challenge}
                  onChange={e => setFormData({...formData, challenge: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Solution</label>
                <textarea
                  value={formData.solution}
                  onChange={e => setFormData({...formData, solution: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Result</label>
                <input
                  type="text"
                  value={formData.result}
                  onChange={e => setFormData({...formData, result: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
