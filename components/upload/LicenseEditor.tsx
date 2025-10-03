import React, { useState, useEffect } from 'react';
import { Trash2, PlusCircle, X, Check, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { License } from '../../lib/types';

const licenseTemplates: { [key: string]: Omit<License, 'name'> } = {
  'MP3': { price: 29.99, files: { mp3: true, wav: false, stems: false }, usageTerms: { distributionCopies: 2500, audioStreams: 50000, musicVideos: 1, livePerformances: true, radioStations: 1 } },
  'WAV': { price: 49.99, files: { mp3: true, wav: true, stems: false }, usageTerms: { distributionCopies: 5000, audioStreams: 250000, musicVideos: 1, livePerformances: true, radioStations: 2 } },
  'Trackout': { price: 99.99, files: { mp3: true, wav: true, stems: true }, usageTerms: { distributionCopies: 10000, audioStreams: 1000000, musicVideos: 'unlimited', livePerformances: true, radioStations: 5 } },
  'Unlimited': { price: 249.99, files: { mp3: true, wav: true, stems: true }, usageTerms: { distributionCopies: 'unlimited', audioStreams: 'unlimited', musicVideos: 'unlimited', livePerformances: true, radioStations: 'unlimited' } },
  'Exclusive': { price: null, files: { mp3: true, wav: true, stems: true }, usageTerms: { distributionCopies: 'unlimited', audioStreams: 'unlimited', musicVideos: 'unlimited', livePerformances: true, radioStations: 'unlimited' } },
};

const LicenseEditor = ({ onLicensesChange }) => {
  const [licenses, setLicenses] = useState<License[]>([]);

  useEffect(() => {
    onLicensesChange(licenses);
  }, [licenses, onLicensesChange]);

  const addLicense = (type: string) => {
    if (licenses.some(l => l.name.startsWith(type))) return;

    const newLicense: License = {
      name: `${type} License`,
      ...licenseTemplates[type],
      featured: licenses.length === 0,
    };
    setLicenses([...licenses, newLicense].sort((a, b) => Object.keys(licenseTemplates).indexOf(a.name.split(' ')[0]) - Object.keys(licenseTemplates).indexOf(b.name.split(' ')[0])));
  };

  const removeLicense = (index) => {
    const wasFeatured = licenses[index].featured;
    const updatedLicenses = licenses.filter((_, i) => i !== index);

    if (wasFeatured && updatedLicenses.length > 0) {
      updatedLicenses[0].featured = true;
    }
    setLicenses(updatedLicenses);
  };
  
  const setFeatured = (index) => {
    setLicenses(licenses.map((lic, i) => ({
      ...lic,
      featured: i === index,
    })));
  };

  const updateLicenseField = (index, field, value) => {
    const updatedLicenses = [...licenses];
    updatedLicenses[index] = { ...updatedLicenses[index], [field]: value };
    setLicenses(updatedLicenses);
  };
  
  const updateUsageTerm = (index, term, value) => {
    const updatedLicenses = [...licenses];
    updatedLicenses[index].usageTerms = { ...updatedLicenses[index].usageTerms, [term]: value };
    setLicenses(updatedLicenses);
  };

  return (
    <div className="space-y-6">
      <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700">
        <h4 className="font-bold text-white mb-3">Add a License</h4>
        <div className="flex flex-wrap gap-3">
          {Object.keys(licenseTemplates).map(type => (
            <button
              key={type}
              onClick={() => addLicense(type)}
              disabled={licenses.some(l => l.name.startsWith(type))}
              className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-700"
            >
              <PlusCircle size={18} />
              {type}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {licenses.map((license, index) => (
          <motion.div
            key={license.name}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className={`bg-neutral-800/50 rounded-xl border-2 transition-all duration-300 ${license.featured ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'border-neutral-700'}`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <input type="text" value={license.name} onChange={(e) => updateLicenseField(index, 'name', e.target.value)} className="text-xl font-bold bg-transparent text-white outline-none focus:ring-1 focus:ring-green-500 rounded-md px-2 py-1 -ml-2" />
                <button
                  onClick={() => setFeatured(index)}
                  className={`flex items-center gap-2 text-xs font-bold uppercase py-1 px-3 rounded-full transition-colors ${license.featured ? 'bg-green-500 text-black' : 'bg-neutral-700 text-white hover:bg-neutral-600'}`}
                >
                  <Star size={14} />
                  {license.featured ? 'Featured' : 'Set as Feature'}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-neutral-400 mb-2">Price</label>
                  {license.price !== null ? (
                    <input type="number" value={license.price} onChange={(e) => updateLicenseField(index, 'price', parseFloat(e.target.value))} className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded-md text-white" />
                  ) : (
                    <div className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-400 font-bold">Negotiable</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-400 mb-2">Files Included</label>
                  <div className="flex gap-4">
                    {['mp3', 'wav', 'stems'].map(fileType => (
                      <label key={fileType} className="flex items-center text-white">
                        <input type="checkbox" checked={license.files[fileType]} onChange={(e) => updateLicenseField(index, 'files', { ...license.files, [fileType]: e.target.checked })} className="w-4 h-4 text-green-600 bg-neutral-800 border-neutral-600 rounded focus:ring-green-500" />
                        <span className="ml-2 uppercase">{fileType}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-neutral-400 mb-2">Usage Terms</label>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(license.usageTerms).map(([term, value]) => (
                      <div key={term}>
                        <label className="block text-xs text-neutral-500">{term.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                        {typeof value === 'boolean' ? (
                          <input type="checkbox" checked={value} onChange={(e) => updateUsageTerm(index, term, e.target.checked)} className="w-4 h-4 text-green-600 bg-neutral-800 border-neutral-600 rounded focus:ring-green-500" />
                        ) : (
                          <input type="text" value={value} onChange={(e) => updateUsageTerm(index, term, e.target.value.toLowerCase() === 'unlimited' ? 'unlimited' : parseInt(e.target.value) || 0)} className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded-md text-white" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LicenseEditor;
