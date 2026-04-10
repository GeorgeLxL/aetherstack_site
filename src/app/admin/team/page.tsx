'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase, uploadImage } from '@/lib/supabase';
import { TeamMember } from '@/lib/types';
import { Plus, Pencil, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';

export default function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    skills: '',
    icon: 'User',
    avatar_url: '',
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase.from('team_members').select('*').order('created_at', { ascending: true });
    if (data) setMembers(data);
    setLoading(false);
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    const url = await uploadImage(file, 'avatars', 'team');
    if (url) {
      setFormData({ ...formData, avatar_url: url });
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    
    if (editingId) {
      await supabase.from('team_members').update({
        name: formData.name,
        role: formData.role,
        skills: skillsArray,
        icon: formData.icon,
        avatar_url: formData.avatar_url,
      }).eq('id', editingId);
    } else {
      await supabase.from('team_members').insert({
        name: formData.name,
        role: formData.role,
        skills: skillsArray,
        icon: formData.icon,
        avatar_url: formData.avatar_url,
      });
    }
    
    setShowModal(false);
    setEditingId(null);
    setFormData({ name: '', role: '', skills: '', icon: 'User', avatar_url: '' });
    fetchMembers();
  }

  async function handleDelete(id: string) {
    if (!supabase) return;
    if (confirm('Delete this team member?')) {
      await supabase.from('team_members').delete().eq('id', id);
      fetchMembers();
    }
  }

  function handleEdit(member: TeamMember) {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      skills: member.skills?.join(', ') || '',
      icon: member.icon || 'User',
      avatar_url: member.avatar_url || '',
    });
    setShowModal(true);
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
        <h1 className="text-2xl font-bold text-primary dark:text-white">Team Members</h1>
        <button
          onClick={() => { setShowModal(true); setEditingId(null); setFormData({ name: '', role: '', skills: '', icon: 'User', avatar_url: '' }); }}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1,2,3,4].map(i => <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg" />)}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary dark:text-white">Avatar</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary dark:text-white">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary dark:text-white">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary dark:text-white">Skills</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-primary dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    {member.avatar_url ? (
                      <img src={member.avatar_url} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-primary dark:text-white font-medium">{member.name}</td>
                  <td className="px-6 py-4 text-secondary dark:text-gray-400">{member.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {member.skills?.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full dark:text-gray-300">{skill}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(member)} className="p-2 text-gray-400 hover:text-blue-600">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(member.id)} className="p-2 text-gray-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary dark:text-white">{editingId ? 'Edit' : 'Add'} Team Member</h2>
              <button onClick={() => setShowModal(false)} className="dark:text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary dark:text-white mb-1">Avatar</label>
                <div className="flex items-center gap-4">
                  {formData.avatar_url ? (
                    <img src={formData.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
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
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4" />
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary dark:text-white mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary dark:text-white mb-1">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary dark:text-white mb-1">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={e => setFormData({...formData, skills: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="React, Node.js, TypeScript"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary dark:text-white mb-1">Icon</label>
                <select
                  value={formData.icon}
                  onChange={e => setFormData({...formData, icon: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="User">User</option>
                  <option value="Wrench">Wrench</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Smartphone">Smartphone</option>
                </select>
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
