import { useState } from 'react';
import { X, Check, Star, Mic2, Video, Copy, Signal, Users, RadioTower } from 'lucide-react';

interface License {
  name: string;
  price: number;
  files: string;
  recommended?: boolean;
  features: string[];
}

interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
  cover: string;
  bpm: number;
  tags: string[];
  licenses?: License[];
}

interface BeatModalProps {
  isOpen: boolean;
  beat: Beat | null;
  onClose: () => void;
  selectedLicense: number | null;
  onLicenseSelect: (index: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const featureIcons: { [key: string]: React.ReactElement } = {
  "Used for Music Recording": <Mic2 size={18} className="text-gray-400" />,
  "1 Music Video": <Video size={18} className="text-gray-400" />,
  "Unlimited Music Videos": <Video size={18} className="text-gray-400" />,
  "Distribute up to 2,000 copies": <Copy size={18} className="text-gray-400" />,
  "Distribute up to 5,000 copies": <Copy size={18} className="text-gray-400" />,
  "Distribute up to 10,000 copies": <Copy size={18} className="text-gray-400" />,
  "Unlimited Distribution": <Copy size={18} className="text-gray-400" />,
  "100,000 Online Audio Streams": <Signal size={18} className="text-gray-400" />,
  "250,000 Online Audio Streams": <Signal size={18} className="text-gray-400" />,
  "500,000 Online Audio Streams": <Signal size={18} className="text-gray-400" />,
  "Unlimited Online Audio Streams": <Signal size={18} className="text-gray-400" />,
  "For Profit Live Performances": <Users size={18} className="text-gray-400" />,
  "Radio Broadcasting Rights (2 Stations)": <RadioTower size={18} className="text-gray-400" />,
  "Radio Broadcasting Rights (Unlimited)": <RadioTower size={18} className="text-gray-400" />,
  "Exclusive Rights to the Beat": <Star size={18} className="text-yellow-400" />,
};

export default function BeatModal({ isOpen, beat, onClose, selectedLicense, onLicenseSelect, onAddToCart, onBuyNow }: BeatModalProps) {
  if (!isOpen || !beat) return null;

  const licenses = beat.licenses || [];
  const recommendedIndex = licenses.findIndex(l => l.recommended);
  const activeLicenseIndex = selectedLicense ?? (recommendedIndex !== -1 ? recommendedIndex : 0);
  const activeLicense = licenses[activeLicenseIndex];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-[#0d0d0d] border border-neutral-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-neutral-800 flex-shrink-0">
            <h2 className="text-3xl font-bold text-white">Choose License</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={28} />
            </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8">
            {/* License Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {licenses.map((license, index) => (
                    <div 
                        key={index}
                        onClick={() => onLicenseSelect(index)}
                        className={`relative p-5 rounded-xl cursor-pointer transition-all border-2 ${activeLicenseIndex === index ? 'bg-neutral-800 border-blue-500' : 'bg-[#1a1a1a] border-transparent hover:bg-neutral-800'}`}>
                        {license.recommended && <div className="absolute top-3 right-3 text-yellow-400"><Star size={20} fill="currentColor" /></div>}
                        <h3 className="font-bold text-xl text-white mb-1">{license.name}</h3>
                        <p className="text-2xl font-extrabold text-white mb-2">{license.price > 0 ? `$${license.price.toFixed(2)}` : "Negotiate"}</p>
                        <p className="text-sm text-gray-400 uppercase font-semibold">{license.files}</p>
                    </div>
                ))}
            </div>

            {/* Usage Terms */}
             {activeLicense && (
              <div className="bg-[#1a1a1a] p-6 rounded-xl">
                  <h3 className="font-semibold text-white mb-5 text-xl">Usage Terms for <span className="text-blue-400">{activeLicense.name}</span></h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {activeLicense.features.map(feature => (
                          <div key={feature} className="flex items-center gap-4">
                              {featureIcons[feature] || <Check size={18} className="flex-shrink-0 text-green-500" />}
                              <span className="text-gray-300">{feature}</span>
                          </div>
                      ))}
                  </div>
              </div>
            )}
        </div>

        {/* Footer */}
        {activeLicense && (
          <div className="flex justify-between items-center p-6 border-t border-neutral-800 flex-shrink-0 bg-[#121212]">
            <div>
              <p className="text-sm text-gray-400">TOTAL:</p>
              <p className="text-3xl font-bold text-white">{activeLicense.price > 0 ? `$${activeLicense.price.toFixed(2)}` : "-"}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={onAddToCart} className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-3 px-8 rounded-full transition-colors text-lg">
                  Add to Cart
              </button>
              <button onClick={onBuyNow} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors text-lg">
                  Buy now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
