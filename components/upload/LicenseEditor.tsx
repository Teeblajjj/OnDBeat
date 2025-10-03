import React, { useState } from 'react';
import { Trash2, PlusCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { License } from '../../lib/types';

const defaultLicenses: License[] = [
  { name: 'MP3 License', price: 29.99, files: { mp3: true, wav: false, stems: false }, usageTerms: { distributionCopies: 2500, audioStreams: 150000, musicVideos: 1, livePerformances: true, radioStations: 1 }, isDefault: true },
  { name: 'WAV License', price: 49.99, files: { mp3: true, wav: true, stems: false }, usageTerms: { distributionCopies: 5000, audioStreams: 500000, musicVideos: 1, livePerformances: true, radioStations: 2 }, isDefault: true },
  { name: 'Trackout License', price: 99.99, files: { mp3: true, wav: true, stems: true }, usageTerms: { distributionCopies: 10000, audioStreams: 1000000, musicVideos: 'unlimited', livePerformances: true, radioStations: 'unlimited' }, isDefault: true },
];

const LicenseEditor = ({ onLicensesChange }) => {
  const [licenses, setLicenses] = useState<License[]>(defaultLicenses);

  const updateLicense = (index, updatedFields) => {
    const updatedLicenses = [...licenses];
    updatedLicenses[index] = { ...updatedLicenses[index], ...updatedFields };
    setLicenses(updatedLicenses);
    onLicensesChange(updatedLicenses);
  };

  const addCustomLicense = () => {
    if (licenses.filter(l => !l.isDefault).length < 2) {
      const newLicense: License = { name: 'Custom License', price: 0.00, files: { mp3: true, wav: false, stems: false }, usageTerms: { distributionCopies: 0, audioStreams: 0, musicVideos: 0, livePerformances: false, radioStations: 0 }, isDefault: false };
      setLicenses([...licenses, newLicense]);
      onLicensesChange([...licenses, newLicense]);
    }
  };

  const removeLicense = (index) => {
    setLicenses(licenses.filter((_, i) => i !== index));
    onLicensesChange(licenses.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {licenses.map((license, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700"
          >
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                value={license.name}
                onChange={(e) => updateLicense(index, { name: e.target.value })}
                className="text-xl font-bold bg-transparent text-white outline-none focus:ring-1 focus:ring-green-500 rounded-md px-2 py-1"
                disabled={license.isDefault}
              />
              {!license.isDefault && (
                <button onClick={() => removeLicense(index)} className="text-red-500 hover:text-red-400">
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-neutral-400 mb-2">Price</label>
                <input
                  type="number"
                  value={license.price || ''}
                  onChange={(e) => updateLicense(index, { price: parseFloat(e.target.value) || null })}
                  className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded-md text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-400 mb-2">Files Included</label>
                <div className="flex gap-4">
                  {['mp3', 'wav', 'stems'].map(fileType => (
                    <label key={fileType} className="flex items-center text-white">
                      <input
                        type="checkbox"
                        checked={license.files[fileType]}
                        onChange={(e) => {
                          const newFiles = { ...license.files, [fileType]: e.target.checked };
                          updateLicense(index, { files: newFiles });
                        }}
                        className="w-4 h-4 text-green-600 bg-neutral-800 border-neutral-600 rounded focus:ring-green-500"
                      />
                      <span className="ml-2 uppercase">{fileType}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-neutral-400 mb-2">Usage Terms</label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(license.usageTerms).map(term => (
                    <div key={term}>
                      <label className="block text-xs text-neutral-500">{term.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                      {typeof license.usageTerms[term] === 'boolean' ? (
                        <input
                          type="checkbox"
                          checked={license.usageTerms[term]}
                          onChange={(e) => {
                            const newTerms = { ...license.usageTerms, [term]: e.target.checked };
                            updateLicense(index, { usageTerms: newTerms });
                          }}
                          className="w-4 h-4 text-green-600 bg-neutral-800 border-neutral-600 rounded focus:ring-green-500"
                        />
                      ) : (
                        <input
                          type="text" // Use text to allow "unlimited"
                          value={license.usageTerms[term]}
                          onChange={(e) => {
                            const value = e.target.value.toLowerCase() === 'unlimited' ? 'unlimited' : parseInt(e.target.value) || 0;
                            const newTerms = { ...license.usageTerms, [term]: value };
                            updateLicense(index, { usageTerms: newTerms });
                          }}
                          className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded-md text-white"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {licenses.filter(l => !l.isDefault).length < 2 && (
        <button
          onClick={addCustomLicense}
          className="mt-4 flex items-center justify-center gap-2 w-full text-green-500 hover:text-green-400 font-semibold border-2 border-dashed border-neutral-700 rounded-lg py-4 transition-colors hover:border-green-500 hover:bg-green-500/10"
        >
          <PlusCircle size={20} />
          Add Custom License
        </button>
      )}
    </div>
  );
};

export default LicenseEditor;
