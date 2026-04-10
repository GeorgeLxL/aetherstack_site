'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

const countryCodes = [
  { code: '+1', country: 'US/CA' }, { code: '+7', country: 'RU/KZ' }, { code: '+20', country: 'EG' },
  { code: '+27', country: 'ZA' }, { code: '+30', country: 'GR' }, { code: '+31', country: 'NL' },
  { code: '+32', country: 'BE' }, { code: '+33', country: 'FR' }, { code: '+34', country: 'ES' },
  { code: '+36', country: 'HU' }, { code: '+39', country: 'IT' }, { code: '+40', country: 'RO' },
  { code: '+41', country: 'CH' }, { code: '+43', country: 'AT' }, { code: '+44', country: 'UK' },
  { code: '+45', country: 'DK' }, { code: '+46', country: 'SE' }, { code: '+47', country: 'NO' },
  { code: '+48', country: 'PL' }, { code: '+49', country: 'DE' }, { code: '+51', country: 'PE' },
  { code: '+52', country: 'MX' }, { code: '+53', country: 'CU' }, { code: '+54', country: 'AR' },
  { code: '+55', country: 'BR' }, { code: '+56', country: 'CL' }, { code: '+57', country: 'CO' },
  { code: '+58', country: 'VE' }, { code: '+60', country: 'MY' }, { code: '+61', country: 'AU' },
  { code: '+62', country: 'ID' }, { code: '+63', country: 'PH' }, { code: '+64', country: 'NZ' },
  { code: '+65', country: 'SG' }, { code: '+66', country: 'TH' }, { code: '+81', country: 'JP' },
  { code: '+82', country: 'KR' }, { code: '+84', country: 'VN' }, { code: '+86', country: 'CN' },
  { code: '+90', country: 'TR' }, { code: '+91', country: 'IN' }, { code: '+92', country: 'PK' },
  { code: '+94', country: 'LK' }, { code: '+95', country: 'MM' }, { code: '+98', country: 'IR' },
  { code: '+212', country: 'MA' }, { code: '+213', country: 'DZ' }, { code: '+216', country: 'TN' },
  { code: '+218', country: 'LY' }, { code: '+220', country: 'GM' }, { code: '+221', country: 'SN' },
  { code: '+222', country: 'MR' }, { code: '+223', country: 'ML' }, { code: '+224', country: 'GN' },
  { code: '+225', country: 'CI' }, { code: '+226', country: 'BF' }, { code: '+227', country: 'NE' },
  { code: '+228', country: 'TG' }, { code: '+229', country: 'BJ' }, { code: '+230', country: 'MU' },
  { code: '+231', country: 'LR' }, { code: '+232', country: 'SL' }, { code: '+233', country: 'GH' },
  { code: '+234', country: 'NG' }, { code: '+235', country: 'TD' }, { code: '+236', country: 'CF' },
  { code: '+237', country: 'CM' }, { code: '+238', country: 'CV' }, { code: '+239', country: 'ST' },
  { code: '+240', country: 'GQ' }, { code: '+241', country: 'GA' }, { code: '+242', country: 'CG' },
  { code: '+243', country: 'CD' }, { code: '+244', country: 'AO' }, { code: '+245', country: 'GW' },
  { code: '+246', country: 'IO' }, { code: '+248', country: 'SC' }, { code: '+249', country: 'SD' },
  { code: '+250', country: 'RW' }, { code: '+251', country: 'ET' }, { code: '+252', country: 'SO' },
  { code: '+253', country: 'DJ' }, { code: '+254', country: 'KE' }, { code: '+255', country: 'TZ' },
  { code: '+256', country: 'UG' }, { code: '+257', country: 'BI' }, { code: '+258', country: 'MZ' },
  { code: '+260', country: 'ZM' }, { code: '+261', country: 'MG' }, { code: '+262', country: 'RE' },
  { code: '+263', country: 'ZW' }, { code: '+264', country: 'NA' }, { code: '+265', country: 'MW' },
  { code: '+266', country: 'LS' }, { code: '+267', country: 'BW' }, { code: '+268', country: 'SZ' },
  { code: '+269', country: 'KM' }, { code: '+290', country: 'SH' }, { code: '+297', country: 'AW' },
  { code: '+298', country: 'FO' }, { code: '+299', country: 'GL' }, { code: '+350', country: 'GI' },
  { code: '+351', country: 'PT' }, { code: '+352', country: 'LU' }, { code: '+353', country: 'IE' },
  { code: '+354', country: 'IS' }, { code: '+355', country: 'AL' }, { code: '+356', country: 'MT' },
  { code: '+357', country: 'CY' }, { code: '+358', country: 'FI' }, { code: '+359', country: 'BG' },
  { code: '+370', country: 'LT' }, { code: '+371', country: 'LV' }, { code: '+372', country: 'EE' },
  { code: '+373', country: 'MD' }, { code: '+374', country: 'AM' }, { code: '+375', country: 'BY' },
  { code: '+376', country: 'AD' }, { code: '+377', country: 'MC' }, { code: '+378', country: 'SM' },
  { code: '+379', country: 'VA' }, { code: '+380', country: 'UA' }, { code: '+381', country: 'RS' },
  { code: '+382', country: 'ME' }, { code: '+383', country: 'XK' }, { code: '+385', country: 'HR' },
  { code: '+386', country: 'SI' }, { code: '+387', country: 'BA' }, { code: '+389', country: 'MK' },
  { code: '+420', country: 'CZ' }, { code: '+421', country: 'SK' }, { code: '+423', country: 'LI' },
  { code: '+500', country: 'FK' }, { code: '+501', country: 'BZ' }, { code: '+502', country: 'GT' },
  { code: '+503', country: 'SV' }, { code: '+504', country: 'HN' }, { code: '+505', country: 'NI' },
  { code: '+506', country: 'CR' }, { code: '+507', country: 'PA' }, { code: '+508', country: 'PM' },
  { code: '+509', country: 'HT' }, { code: '+590', country: 'GP' }, { code: '+591', country: 'BO' },
  { code: '+592', country: 'GY' }, { code: '+593', country: 'EC' }, { code: '+594', country: 'GF' },
  { code: '+595', country: 'PY' }, { code: '+596', country: 'MQ' }, { code: '+597', country: 'SR' },
  { code: '+598', country: 'UY' }, { code: '+599', country: 'CW' }, { code: '+670', country: 'TL' },
  { code: '+672', country: 'NF' }, { code: '+673', country: 'BN' }, { code: '+674', country: 'NR' },
  { code: '+675', country: 'PG' }, { code: '+676', country: 'TO' }, { code: '+677', country: 'SB' },
  { code: '+678', country: 'VU' }, { code: '+679', country: 'FJ' }, { code: '+680', country: 'PW' },
  { code: '+681', country: 'WF' }, { code: '+682', country: 'CK' }, { code: '+683', country: 'NU' },
  { code: '+685', country: 'WS' }, { code: '+686', country: 'KI' }, { code: '+687', country: 'NC' },
  { code: '+688', country: 'TV' }, { code: '+689', country: 'PF' }, { code: '+690', country: 'TK' },
  { code: '+691', country: 'FM' }, { code: '+692', country: 'MH' }, { code: '+850', country: 'KP' },
  { code: '+852', country: 'HK' }, { code: '+853', country: 'MO' }, { code: '+855', country: 'KH' },
  { code: '+856', country: 'LA' }, { code: '+880', country: 'BD' }, { code: '+886', country: 'TW' },
  { code: '+960', country: 'MV' }, { code: '+961', country: 'LB' }, { code: '+962', country: 'JO' },
  { code: '+963', country: 'SY' }, { code: '+964', country: 'IQ' }, { code: '+965', country: 'KW' },
  { code: '+966', country: 'SA' }, { code: '+967', country: 'YE' }, { code: '+968', country: 'OM' },
  { code: '+970', country: 'PS' }, { code: '+971', country: 'AE' }, { code: '+972', country: 'IL' },
  { code: '+973', country: 'BH' }, { code: '+974', country: 'QA' }, { code: '+975', country: 'BT' },
  { code: '+976', country: 'MN' }, { code: '+977', country: 'NP' }, { code: '+992', country: 'TJ' },
  { code: '+993', country: 'TM' }, { code: '+994', country: 'AZ' }, { code: '+995', country: 'GE' },
  { code: '+996', country: 'KG' }, { code: '+998', country: 'UZ' },
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
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Thank you for reaching out. We'll get back to you soon.</p>
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
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone *</label>
          <div className="flex">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="px-3 py-3 border border-r-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {countryCodes.map((cc) => (
                <option key={cc.code} value={cc.code}>
                  {cc.code}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={countryCode}
              onChange={(e) => {
                const val = e.target.value;
                if (val.startsWith('+') || !val) setCountryCode(val.startsWith('+') ? val : '+' + val);
              }}
              className="w-20 px-2 py-3 border border-r-0 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1"
            />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1234567890"
              required
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your company (optional)"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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