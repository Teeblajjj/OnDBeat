import React from 'react';
import { TrackUpload } from '../../lib/types';
import { Tag, Clock, Key, Info, Music } from 'lucide-react';

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 text-sm">
    <div className="text-neutral-500">{icon}</div>
    <span className="font-bold text-neutral-400">{label}:</span>
    <span className="text-white">{value}</span>
  </div>
);

const PreviewStep = ({ formData }: { formData: TrackUpload }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">Preview Your Beat</h2>
      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img 
            src={formData.coverArtFile ? URL.createObjectURL(formData.coverArtFile) : 'https://placehold.co/150x150/181818/22c55e'} 
            alt="Cover Art Preview" 
            className="w-full md:w-48 h-48 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-white">{formData.title || 'Untitled Beat'}</h3>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <DetailRow icon={<Music size={16} />} label="Genre" value={formData.genre || 'N/A'} />
              <DetailRow icon={<Clock size={16} />} label="BPM" value={formData.bpm || 'N/A'} />
              <DetailRow icon={<Key size={16} />} label="Key" value={formData.key || 'N/A'} />
            </div>
            
            <div className="mt-4">
              <DetailRow icon={<Tag size={16} />} label="Tags" value={formData.tags.join(', ') || 'None'} />
            </div>

            <div className="mt-4">
                <h4 className="font-bold text-neutral-400 text-sm mb-2">DESCRIPTION</h4>
                <p className="text-neutral-300 text-sm">{formData.description || 'No description provided.'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold text-white mb-4">Your Licenses</h3>
        <div className="space-y-4">
          {formData.licenses.map((license, index) => (
            <div key={index} className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">{license.name}</span>
                <span className="font-bold text-green-500">{license.price !== null ? `$${license.price}` : 'Negotiable'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;
