'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase, uploadImage } from '@/lib/supabase';
import { TeamMember } from '@/lib/types';
import { Plus, Pencil, Trash2, X, Upload, Image as ImageIcon, Search } from 'lucide-react';

const countries = [
  { "code": "US", "name": "United States" },
  { "code": "CA", "name": "Canada" },
  { "code": "RU", "name": "Russia" },
  { "code": "KZ", "name": "Kazakhstan" },
  { "code": "EG", "name": "Egypt" },
  { "code": "ZA", "name": "South Africa" },
  { "code": "GR", "name": "Greece" },
  { "code": "NL", "name": "Netherlands" },
  { "code": "BE", "name": "Belgium" },
  { "code": "FR", "name": "France" },
  { "code": "ES", "name": "Spain" },
  { "code": "HU", "name": "Hungary" },
  { "code": "IT", "name": "Italy" },
  { "code": "RO", "name": "Romania" },
  { "code": "CH", "name": "Switzerland" },
  { "code": "AT", "name": "Austria" },
  { "code": "GB", "name": "United Kingdom" },
  { "code": "DK", "name": "Denmark" },
  { "code": "SE", "name": "Sweden" },
  { "code": "NO", "name": "Norway" },
  { "code": "PL", "name": "Poland" },
  { "code": "DE", "name": "Germany" },

  { "code": "PE", "name": "Peru" },
  { "code": "MX", "name": "Mexico" },
  { "code": "AR", "name": "Argentina" },
  { "code": "BR", "name": "Brazil" },
  { "code": "CL", "name": "Chile" },
  { "code": "CO", "name": "Colombia" },
  { "code": "VE", "name": "Venezuela" },

  { "code": "MY", "name": "Malaysia" },
  { "code": "AU", "name": "Australia" },
  { "code": "ID", "name": "Indonesia" },
  { "code": "PH", "name": "Philippines" },
  { "code": "NZ", "name": "New Zealand" },
  { "code": "SG", "name": "Singapore" },
  { "code": "TH", "name": "Thailand" },
  { "code": "JP", "name": "Japan" },
  { "code": "VN", "name": "Vietnam" },
  { "code": "CN", "name": "China" },
  { "code": "TR", "name": "Turkey" },
  { "code": "IN", "name": "India" },
  { "code": "PK", "name": "Pakistan" },
  { "code": "LK", "name": "Sri Lanka" },
  { "code": "IR", "name": "Iran" },

  { "code": "MA", "name": "Morocco" },
  { "code": "DZ", "name": "Algeria" },
  { "code": "TN", "name": "Tunisia" },
  { "code": "LY", "name": "Libya" },
  { "code": "GM", "name": "Gambia" },
  { "code": "SN", "name": "Senegal" },
  { "code": "MR", "name": "Mauritania" },
  { "code": "ML", "name": "Mali" },
  { "code": "GN", "name": "Guinea" },
  { "code": "CI", "name": "Ivory Coast" },
  { "code": "BF", "name": "Burkina Faso" },
  { "code": "NE", "name": "Niger" },
  { "code": "TG", "name": "Togo" },
  { "code": "BJ", "name": "Benin" },
  { "code": "MU", "name": "Mauritius" },
  { "code": "LR", "name": "Liberia" },
  { "code": "SL", "name": "Sierra Leone" },
  { "code": "GH", "name": "Ghana" },
  { "code": "NG", "name": "Nigeria" },
  { "code": "TD", "name": "Chad" },
  { "code": "CG", "name": "Republic of the Congo" },
  { "code": "CD", "name": "DR Congo" },
  { "code": "AO", "name": "Angola" },
  { "code": "GW", "name": "Guinea-Bissau" },
  { "code": "IO", "name": "British Indian Ocean Territory" },
  { "code": "SC", "name": "Seychelles" },
  { "code": "SD", "name": "Sudan" },
  { "code": "RW", "name": "Rwanda" },
  { "code": "ET", "name": "Ethiopia" },
  { "code": "SO", "name": "Somalia" },
  { "code": "DJ", "name": "Djibouti" },
  { "code": "KE", "name": "Kenya" },
  { "code": "TZ", "name": "Tanzania" },
  { "code": "UG", "name": "Uganda" },
  { "code": "BI", "name": "Burundi" },
  { "code": "MZ", "name": "Mozambique" },
  { "code": "ZM", "name": "Zambia" },
  { "code": "MG", "name": "Madagascar" },
  { "code": "ZW", "name": "Zimbabwe" },
  { "code": "NA", "name": "Namibia" },
  { "code": "MW", "name": "Malawi" },
  { "code": "LS", "name": "Lesotho" },
  { "code": "BW", "name": "Botswana" },
  { "code": "SZ", "name": "Eswatini" },

  { "code": "KM", "name": "Comoros" },
  { "code": "SH", "name": "Saint Helena" },
  { "code": "AW", "name": "Aruba" },
  { "code": "FO", "name": "Faroe Islands" },
  { "code": "GL", "name": "Greenland" },
  { "code": "GI", "name": "Gibraltar" },

  { "code": "PT", "name": "Portugal" },
  { "code": "LU", "name": "Luxembourg" },
  { "code": "IE", "name": "Ireland" },
  { "code": "IS", "name": "Iceland" },
  { "code": "AL", "name": "Albania" },
  { "code": "MT", "name": "Malta" },
  { "code": "CY", "name": "Cyprus" },
  { "code": "FI", "name": "Finland" },
  { "code": "BG", "name": "Bulgaria" },
  { "code": "LT", "name": "Lithuania" },
  { "code": "LV", "name": "Latvia" },
  { "code": "EE", "name": "Estonia" },
  { "code": "MD", "name": "Moldova" },
  { "code": "AM", "name": "Armenia" },
  { "code": "BY", "name": "Belarus" },
  { "code": "AD", "name": "Andorra" },
  { "code": "MC", "name": "Monaco" },
  { "code": "SM", "name": "San Marino" },
  { "code": "VA", "name": "Vatican City" },
  { "code": "UA", "name": "Ukraine" },
  { "code": "RS", "name": "Serbia" },
  { "code": "ME", "name": "Montenegro" },
  { "code": "XK", "name": "Kosovo" },
  { "code": "HR", "name": "Croatia" },
  { "code": "SI", "name": "Slovenia" },
  { "code": "BA", "name": "Bosnia and Herzegovina" },
  { "code": "MK", "name": "North Macedonia" },
  { "code": "CZ", "name": "Czech Republic" },
  { "code": "SK", "name": "Slovakia" },
  { "code": "LI", "name": "Liechtenstein" },

  { "code": "BZ", "name": "Belize" },
  { "code": "GT", "name": "Guatemala" },
  { "code": "SV", "name": "El Salvador" },
  { "code": "HN", "name": "Honduras" },
  { "code": "NI", "name": "Nicaragua" },
  { "code": "CR", "name": "Costa Rica" },
  { "code": "PA", "name": "Panama" },
  { "code": "HT", "name": "Haiti" },
  { "code": "BO", "name": "Bolivia" },
  { "code": "GY", "name": "Guyana" },
  { "code": "EC", "name": "Ecuador" },
  { "code": "PY", "name": "Paraguay" },
  { "code": "SR", "name": "Suriname" },
  { "code": "UY", "name": "Uruguay" },
  { "code": "CW", "name": "Curacao" },

  { "code": "TL", "name": "Timor-Leste" },
  { "code": "NF", "name": "Norfolk Island" },
  { "code": "BN", "name": "Brunei" },
  { "code": "NR", "name": "Nauru" },
  { "code": "PG", "name": "Papua New Guinea" },
  { "code": "TO", "name": "Tonga" },
  { "code": "SB", "name": "Solomon Islands" },
  { "code": "VU", "name": "Vanuatu" },
  { "code": "FJ", "name": "Fiji" },
  { "code": "PW", "name": "Palau" },
  { "code": "WF", "name": "Wallis and Futuna" },
  { "code": "CK", "name": "Cook Islands" },
  { "code": "NU", "name": "Niue" },
  { "code": "WS", "name": "Samoa" },
  { "code": "KI", "name": "Kiribati" },
  { "code": "NC", "name": "New Caledonia" },
  { "code": "TV", "name": "Tuvalu" },
  { "code": "PF", "name": "French Polynesia" },
  { "code": "TK", "name": "Tokelau" },
  { "code": "FM", "name": "Micronesia" },
  { "code": "MH", "name": "Marshall Islands" },

  { "code": "HK", "name": "Hong Kong" },
  { "code": "MO", "name": "Macau" },
  { "code": "KH", "name": "Cambodia" },
  { "code": "LA", "name": "Laos" },
  { "code": "BD", "name": "Bangladesh" },
  { "code": "TW", "name": "Taiwan" },
  { "code": "MV", "name": "Maldives" },
  { "code": "LB", "name": "Lebanon" },
  { "code": "JO", "name": "Jordan" },
  { "code": "SY", "name": "Syria" },
  { "code": "IQ", "name": "Iraq" },
  { "code": "KW", "name": "Kuwait" },
  { "code": "SA", "name": "Saudi Arabia" },
  { "code": "YE", "name": "Yemen" },
  { "code": "OM", "name": "Oman" },
  { "code": "PS", "name": "Palestine" },
  { "code": "AE", "name": "United Arab Emirates" },
  { "code": "IL", "name": "Israel" },
  { "code": "BH", "name": "Bahrain" },
  { "code": "QA", "name": "Qatar" },
  { "code": "BT", "name": "Bhutan" },
  { "code": "MN", "name": "Mongolia" },
  { "code": "NP", "name": "Nepal" },
  { "code": "TJ", "name": "Tajikistan" },
  { "code": "TM", "name": "Turkmenistan" },
  { "code": "AZ", "name": "Azerbaijan" },
  { "code": "GE", "name": "Georgia" },
  { "code": "KG", "name": "Kyrgyzstan" },
  { "code": "UZ", "name": "Uzbekistan" }
];

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
    avatar_url: '',
    country: '',
  });
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCountryDropdown(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const handleSelectCountry = (code: string) => {
    const country = countries.find(c => c.code === code);
    setFormData({ ...formData, country: code });
    setCountrySearch(country?.name || code);
    setShowCountryDropdown(false);
    setFocusedIndex(-1);
  };

  const handleCountryKeyDown = (e: React.KeyboardEvent) => {
    if (!showCountryDropdown) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        setShowCountryDropdown(true);
        setFocusedIndex(0);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev < filteredCountries.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : filteredCountries.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredCountries.length) {
          handleSelectCountry(filteredCountries[focusedIndex].code);
        }
        break;
      case 'Escape':
        setShowCountryDropdown(false);
        setFocusedIndex(-1);
        break;
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    
    if (editingId) {
      await supabase.from('team_members').update({
        name: formData.name,
        role: formData.role,
        skills: skillsArray,
        avatar_url: formData.avatar_url,
        country: formData.country || null,
      }).eq('id', editingId);
    } else {
      await supabase.from('team_members').insert({
        name: formData.name,
        role: formData.role,
        skills: skillsArray,
        avatar_url: formData.avatar_url,
        country: formData.country || null,
      });
    }
    
    setShowModal(false);
    setEditingId(null);
    setFormData({ name: '', role: '', skills: '', avatar_url: '', country: '' });
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
    const country = member.country ? countries.find(c => c.code === member.country) : null;
    setFormData({
      name: member.name,
      role: member.role,
      skills: member.skills?.join(', ') || '',
      avatar_url: member.avatar_url || '',
      country: member.country || '',
    });
    setCountrySearch(country?.name || '');
    setShowCountryDropdown(false);
    setFocusedIndex(-1);
    setShowModal(true);
  }

  function openAddModal() {
    setEditingId(null);
    setFormData({ name: '', role: '', skills: '', avatar_url: '', country: '' });
    setCountrySearch('');
    setShowCountryDropdown(false);
    setFocusedIndex(-1);
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
          onClick={openAddModal}
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary dark:text-white">Country</th>
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
                  <td className="px-6 py-4">
                    {member.country ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://circle-flags.cdn.skk.moe/flags/${member.country.toLowerCase()}.svg`}
                          alt=""
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="text-sm">{countries.find(c => c.code === member.country)?.name || member.country}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
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
          <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl max-h-[90vh] overflow-y-auto">
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
              <div className="relative">
                <label className="block text-sm font-medium text-primary dark:text-white mb-1">Country (optional)</label>
                <div className="flex items-center gap-2">
                  {formData.country && (
                    <img 
                      src={`https://circle-flags.cdn.skk.moe/flags/${formData.country.toLowerCase()}.svg`} 
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <input
                    type="text"
                    value={formData.country ? countrySearch : ''}
                    onChange={e => { setCountrySearch(e.target.value); setFocusedIndex(-1); setShowCountryDropdown(true); }}
                    onFocus={() => setShowCountryDropdown(true)}
                    onKeyDown={handleCountryKeyDown}
                    placeholder="Search country..."
                    className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                  />
                </div>
                {showCountryDropdown && (
                  <div className="absolute top-full left-0 z-50 w-full max-h-60 overflow-auto bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg mt-1">
                    {filteredCountries.length > 0 ? filteredCountries.slice(0, 15).map((c, index) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => handleSelectCountry(c.code)}
                        onMouseEnter={() => setFocusedIndex(index)}
                        className={`w-full px-4 py-2 text-left flex items-center gap-2 text-sm ${
                          index === focusedIndex 
                            ? 'bg-blue-500 text-white' 
                            : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <img 
                          src={`https://circle-flags.cdn.skk.moe/flags/${c.code.toLowerCase()}.svg`} 
                          alt=""
                          className="w-5 h-5 rounded-full"
                        />
                        {c.name}
                      </button>
                    )) : (
                      <div className="px-4 py-2 text-sm text-gray-400">No results found</div>
                    )}
                  </div>
                )}
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