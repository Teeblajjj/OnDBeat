import { useState } from 'react';
import { X, Play, Pause, Check, ShoppingCart, Download, Info } from 'lucide-react';

interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
  cover: string;
  bpm: number;
  tags: string[];
  licenses: Array<{ name: string; price: number; features: string[] }>;
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

export default function BeatModal({ isOpen, beat, onClose, selectedLicense, onLicenseSelect, onAddToCart, onBuyNow }: BeatModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen || !beat) return null;

  const activeLicenseIndex = selectedLicense ?? 0;
  const activeLicense = beat.licenses[activeLicenseIndex];

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-gradient-to-t from-[#121212] to-[#181818] border border-neutral-700/50 rounded-xl shadow-lg w-full max-w-4xl max-h-[95vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        {/* Left Side: Cover & Info */}
        <div className="relative flex flex-col justify-between p-8 bg-cover bg-center" style={{backgroundImage: `url(${beat.cover})`}}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="relative z-10">
                <button onClick={onClose} className="absolute top-[-1rem] right-[-1rem] text-gray-400 hover:text-white transition-colors bg-black/50 rounded-full p-1">
                    <X size={24} />
                </button>
                <h1 className="text-4xl font-extrabold text-white mb-2">{beat.title}</h1>
                <p className="text-lg text-gray-300">{beat.producer}</p>
                <div className="mt-4 flex gap-2">
                    {beat.tags.map(tag => (
                        <span key={tag} className="bg-white/10 text-white text-xs font-bold px-2.5 py-1 rounded-full capitalize backdrop-blur-sm">{tag}</span>
                    ))}
                    <span className="bg-white/10 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">{beat.bpm} BPM</span>
                </div>
            </div>
             <div className="relative z-10 flex items-center justify-center">
                <button onClick={() => setIsPlaying(!isPlaying)} className="w-20 h-20 bg-green-500 text-black rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                    {isPlaying ? <Pause size={40} fill="black" /> : <Play size={40} fill="black" className="ml-2" />}
                </button>
            </div>
        </div>

        {/* Right Side: Licenses & Purchase */}
        <div className="flex flex-col p-8 overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Choose Your License</h2>
            <div className="space-y-3 mb-6">
                {beat.licenses.map((license, index) => (
                    <div 
                        key={index}
                        onClick={() => onLicenseSelect(index)}
                        className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${activeLicenseIndex === index ? 'bg-green-500/10 border-green-500' : 'bg-neutral-800/60 border-transparent hover:bg-neutral-700/80'}`}>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg text-white">{license.name} License</span>
                            <span className="font-extrabold text-2xl text-white">${license.price}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-neutral-800/60 p-6 rounded-lg mb-6 flex-grow">
                 <h3 className="font-semibold text-white mb-3 text-lg">License Details for <span className="text-green-400">{activeLicense.name}</span></h3>
                <ul className="space-y-2 text-gray-300">
                    {activeLicense.features.map(feature => (
                        <li key={feature} className="flex items-center gap-3">
                            <Check size={18} className="flex-shrink-0 text-green-500" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <button onClick={onAddToCart} className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-full transition-colors flex items-center justify-center gap-2 text-lg">
                <ShoppingCart size={20} />
                Add to Cart - ${activeLicense.price}
            </button>
        </div>
      </div>
    </div>
  );
}