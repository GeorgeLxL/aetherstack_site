'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, CheckCircle, Loader2, Search } from 'lucide-react';

const countryCodes = [
  { code: '+1', country: 'United States/Canada' }, { code: '+7', country: 'Russia/Kazakhstan' }, { code: '+20', country: 'Egypt' },
  { code: '+27', country: 'South Africa' }, { code: '+30', country: 'Greece' }, { code: '+31', country: 'Netherlands' },
  { code: '+32', country: 'Belgium' }, { code: '+33', country: 'France' }, { code: '+34', country: 'Spain' },
  { code: '+36', country: 'Hungary' }, { code: '+39', country: 'Italy' }, { code: '+40', country: 'Romania' },
  { code: '+41', country: 'Switzerland' }, { code: '+43', country: 'Austria' }, { code: '+44', country: 'United Kingdom' },
  { code: '+45', country: 'Denmark' }, { code: '+46', country: 'Sweden' }, { code: '+47', country: 'Norway' },
  { code: '+48', country: 'Poland' }, { code: '+49', country: 'Germany' }, { code: '+51', country: 'Peru' },
  { code: '+52', country: 'Mexico' }, { code: '+54', country: 'Argentina' }, { code: '+55', country: 'Brazil' },
  { code: '+56', country: 'Chile' }, { code: '+57', country: 'Colombia' }, { code: '+58', country: 'Venezuela' },
  { code: '+60', country: 'Malaysia' }, { code: '+61', country: 'Australia' }, { code: '+62', country: 'Indonesia' },
  { code: '+63', country: 'Philippines' }, { code: '+64', country: 'New Zealand' }, { code: '+65', country: 'Singapore' },
  { code: '+66', country: 'Thailand' }, { code: '+81', country: 'Japan' }, { code: '+82', country: 'South Korea' },
  { code: '+84', country: 'Vietnam' }, { code: '+86', country: 'China' }, { code: '+90', country: 'Turkey' },
  { code: '+91', country: 'India' }, { code: '+92', country: 'Pakistan' }, { code: '+94', country: 'Sri Lanka' },
  { code: '+98', country: 'Iran' }, { code: '+212', country: 'Morocco' }, { code: '+213', country: 'Algeria' },
  { code: '+216', country: 'Tunisia' }, { code: '+218', country: 'Libya' }, { code: '+220', country: 'Gambia' },
  { code: '+221', country: 'Senegal' }, { code: '+222', country: 'Mauritania' }, { code: '+223', country: 'Mali' },
  { code: '+224', country: 'Guinea' }, { code: '+225', country: 'Ivory Coast' }, { code: '+226', country: 'Burkina Faso' },
  { code: '+227', country: 'Niger' }, { code: '+228', country: 'Togo' }, { code: '+229', country: 'Benin' },
  { code: '+230', country: 'Mauritius' }, { code: '+231', country: 'Liberia' }, { code: '+232', country: 'Sierra Leone' },
  { code: '+233', country: 'Ghana' }, { code: '+234', country: 'Nigeria' }, { code: '+235', country: 'Chad' },
  { code: '+236', country: 'Central African Republic' }, { code: '+237', country: 'Cameroon' }, { code: '+238', country: 'Cape Verde' },
  { code: '+239', country: 'Sao Tome and Principe' }, { code: '+240', country: 'Equatorial Guinea' }, { code: '+241', country: 'Gabon' },
  { code: '+242', country: 'Republic of the Congo' }, { code: '+243', country: 'DR Congo' }, { code: '+244', country: 'Angola' },
  { code: '+245', country: 'Guinea-Bissau' }, { code: '+246', country: 'British Indian Ocean Territory' }, { code: '+248', country: 'Seychelles' },
  { code: '+249', country: 'Sudan' }, { code: '+250', country: 'Rwanda' }, { code: '+251', country: 'Ethiopia' },
  { code: '+252', country: 'Somalia' }, { code: '+253', country: 'Djibouti' }, { code: '+254', country: 'Kenya' },
  { code: '+255', country: 'Tanzania' }, { code: '+256', country: 'Uganda' }, { code: '+257', country: 'Burundi' },
  { code: '+258', country: 'Mozambique' }, { code: '+260', country: 'Zambia' }, { code: '+261', country: 'Madagascar' },
  { code: '+263', country: 'Zimbabwe' }, { code: '+264', country: 'Namibia' }, { code: '+265', country: 'Malawi' },
  { code: '+266', country: 'Lesotho' }, { code: '+267', country: 'Botswana' }, { code: '+268', country: 'Eswatini' },
  { code: '+269', country: 'Comoros' }, { code: '+290', country: 'Saint Helena' }, { code: '+297', country: 'Aruba' },
  { code: '+298', country: 'Faroe Islands' }, { code: '+299', country: 'Greenland' }, { code: '+350', country: 'Gibraltar' },
  { code: '+351', country: 'Portugal' }, { code: '+352', country: 'Luxembourg' }, { code: '+353', country: 'Ireland' },
  { code: '+354', country: 'Iceland' }, { code: '+355', country: 'Albania' }, { code: '+356', country: 'Malta' },
  { code: '+357', country: 'Cyprus' }, { code: '+358', country: 'Finland' }, { code: '+359', country: 'Bulgaria' },
  { code: '+370', country: 'Lithuania' }, { code: '+371', country: 'Latvia' }, { code: '+372', country: 'Estonia' },
  { code: '+373', country: 'Moldova' }, { code: '+374', country: 'Armenia' }, { code: '+375', country: 'Belarus' },
  { code: '+376', country: 'Andorra' }, { code: '+377', country: 'Monaco' }, { code: '+378', country: 'San Marino' },
  { code: '+379', country: 'Vatican City' }, { code: '+380', country: 'Ukraine' }, { code: '+381', country: 'Serbia' },
  { code: '+382', country: 'Montenegro' }, { code: '+383', country: 'Kosovo' }, { code: '+385', country: 'Croatia' },
  { code: '+386', country: 'Slovenia' }, { code: '+387', country: 'Bosnia and Herzegovina' }, { code: '+389', country: 'North Macedonia' },
  { code: '+420', country: 'Czech Republic' }, { code: '+421', country: 'Slovakia' }, { code: '+423', country: 'Liechtenstein' },
  { code: '+501', country: 'Belize' }, { code: '+502', country: 'Guatemala' }, { code: '+503', country: 'El Salvador' },
  { code: '+504', country: 'Honduras' }, { code: '+505', country: 'Nicaragua' }, { code: '+506', country: 'Costa Rica' },
  { code: '+507', country: 'Panama' }, { code: '+509', country: 'Haiti' }, { code: '+591', country: 'Bolivia' },
  { code: '+592', country: 'Guyana' }, { code: '+593', country: 'Ecuador' }, { code: '+595', country: 'Paraguay' },
  { code: '+597', country: 'Suriname' }, { code: '+598', country: 'Uruguay' }, { code: '+599', country: 'Curacao' },
  { code: '+670', country: 'Timor-Leste' }, { code: '+672', country: 'Norfolk Island' }, { code: '+673', country: 'Brunei' },
  { code: '+674', country: 'Nauru' }, { code: '+675', country: 'Papua New Guinea' }, { code: '+676', country: 'Tonga' },
  { code: '+677', country: 'Solomon Islands' }, { code: '+678', country: 'Vanuatu' }, { code: '+679', country: 'Fiji' },
  { code: '+680', country: 'Palau' }, { code: '+681', country: 'Wallis and Futuna' }, { code: '+682', country: 'Cook Islands' },
  { code: '+683', country: 'Niue' }, { code: '+685', country: 'Samoa' }, { code: '+686', country: 'Kiribati' },
  { code: '+687', country: 'New Caledonia' }, { code: '+688', country: 'Tuvalu' }, { code: '+689', country: 'French Polynesia' },
  { code: '+690', country: 'Tokelau' }, { code: '+691', country: 'Micronesia' }, { code: '+692', country: 'Marshall Islands' },
  { code: '+850', country: 'North Korea' }, { code: '+852', country: 'Hong Kong' }, { code: '+853', country: 'Macau' },
  { code: '+855', country: 'Cambodia' }, { code: '+856', country: 'Laos' }, { code: '+880', country: 'Bangladesh' },
  { code: '+886', country: 'Taiwan' }, { code: '+960', country: 'Maldives' }, { code: '+961', country: 'Lebanon' },
  { code: '+962', country: 'Jordan' }, { code: '+963', country: 'Syria' }, { code: '+964', country: 'Iraq' },
  { code: '+965', country: 'Kuwait' }, { code: '+966', country: 'Saudi Arabia' }, { code: '+967', country: 'Yemen' },
  { code: '+968', country: 'Oman' }, { code: '+970', country: 'Palestine' }, { code: '+971', country: 'United Arab Emirates' },
  { code: '+972', country: 'Israel' }, { code: '+973', country: 'Bahrain' }, { code: '+974', country: 'Qatar' },
  { code: '+975', country: 'Bhutan' }, { code: '+976', country: 'Mongolia' }, { code: '+977', country: 'Nepal' },
  { code: '+992', country: 'Tajikistan' }, { code: '+993', country: 'Turkmenistan' }, { code: '+994', country: 'Azerbaijan' },
  { code: '+995', country: 'Georgia' }, { code: '+996', country: 'Kyrgyzstan' }, { code: '+998', country: 'Uzbekistan' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCodes = countryCodes.filter(cc => 
    cc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cc.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCode = (code: string) => {
    setCountryCode(code);
    setSearchQuery('');
    setShowDropdown(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        setShowDropdown(true);
        setFocusedIndex(0);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev < filteredCodes.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : filteredCodes.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredCodes.length) {
          handleSelectCode(filteredCodes[focusedIndex].code);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setFocusedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0 && dropdownRef.current) {
      const focusedElement = dropdownRef.current.querySelector(`[data-index="${focusedIndex}"]`);
      focusedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      if (supabase) {
        const fullPhone = `${countryCode} ${formData.phone}`.trim();
        const { error } = await supabase.from('contacts').insert({
          ...formData,
          phone: fullPhone,
        });
        if (error) throw error;
      }
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setCountryCode('+1');
    } catch (error: any) {
      setStatus('error');
      if (error.message.includes('contacts_phone_check')) setErrorMessage('Please enter a valid phone number with country code.');
      else setErrorMessage('Failed to send message. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Thank you for reaching out. We&apos;ll get back to you soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'error' && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-600"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-600"
            placeholder="your@email.com"
            required
          />
        </div>
        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone *</label>
          <div className="flex">
            <button
              type="button"
              onClick={() => { setShowDropdown(!showDropdown); setTimeout(() => searchInputRef.current?.focus(), 0); }}
              className="h-full px-4 py-3 border border-r-0 border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 min-w-[100px]"
            >
              <span>{countryCode}</span>
              <Search className="w-4 h-4 text-gray-400" />
            </button>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="flex-1 px-4 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-600"
              placeholder="1234567890"
              required
            />
          </div>
          {showDropdown && (
            <div className="absolute top-full left-0 z-50 w-64 max-h-60 overflow-auto bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg shadow-lg mt-1">
              <div className="p-2 border-b border-gray-200 dark:border-white/10">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setFocusedIndex(0); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search country..."
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-[#111] text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none"
                />
              </div>
              {filteredCodes.slice(0, 20).map((cc, index) => (
                <button
                  key={cc.code}
                  type="button"
                  data-index={index}
                  onClick={() => handleSelectCode(cc.code)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`w-full px-4 py-2 text-left text-sm ${
                    index === focusedIndex 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#111]'
                  }`}
                >
                  {cc.code} - {cc.country}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
          className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-600"
          placeholder="Your company (optional)"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-600"
          placeholder="Tell us about your project..."
          rows={5}
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}