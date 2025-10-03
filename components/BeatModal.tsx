
import { useState } from 'react';
import { X, Check, Mic2, Video, Copy, Signal, Users, RadioTower, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// --- Interfaces ---
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
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

const featureIcons: { [key: string]: React.ReactElement } = {
  "Used for Music Recording": <Mic2 size={18} className="text-neutral-400" />,
  "1 Music Video": <Video size={18} className="text-neutral-400" />,
  "Unlimited Music Videos": <Video size={18} className="text-neutral-400" />,
  "Distribute up to 2,000 copies": <Copy size={18} className="text-neutral-400" />,
  "Distribute up to 5,000 copies": <Copy size={18} className="text-neutral-400" />,
  "Distribute up to 10,000 copies": <Copy size={18} className="text-neutral-400" />,
  "Unlimited Distribution": <Copy size={18} className="text-neutral-400" />,
  "100,000 Online Audio Streams": <Signal size={18} className="text-neutral-400" />,
  "250,000 Online Audio Streams": <Signal size={18} className="text-neutral-400" />,
  "500,000 Online Audio Streams": <Signal size={18} className="text-neutral-400" />,
  "Unlimited Online Audio Streams": <Signal size={18} className="text-neutral-400" />,
  "For Profit Live Performances": <Users size={18} className="text-neutral-400" />,
  "Radio Broadcasting Rights (2 Stations)": <RadioTower size={18} className="text-neutral-400" />,
  "Radio Broadcasting Rights (Unlimited)": <RadioTower size={18} className="text-neutral-400" />,
  "Exclusive Rights to the Beat": <Star size={18} className="text-yellow-400" />,
};

const defaultLicenses: License[] = [
    { name: "MP3", price: 29.99, files: "MP3", features: ["Used for Music Recording", "1 Music Video", "Distribute up to 2,000 copies"] },
    { name: "WAV", price: 49.99, files: "MP3, WAV", features: ["Used for Music Recording", "Unlimited Music Videos", "Distribute up to 5,000 copies"], recommended: true },
    { name: "Trackout", price: 99.99, files: "MP3, WAV, Stems", features: ["Used for Music Recording", "Unlimited Music Videos", "Distribute up to 10,000 copies", "For Profit Live Performances"] },
    { name: "Unlimited", price: 249.99, files: "MP3, WAV, Stems", features: ["Used for Music Recording", "Unlimited Music Videos", "Unlimited Distribution", "Unlimited Online Audio Streams", "For Profit Live Performances", "Radio Broadcasting Rights (Unlimited)"] },
];

export default function BeatModal({ isOpen, beat, onClose, onAddToCart, onBuyNow }: BeatModalProps) {
  const licenses = beat?.licenses && beat.licenses.length > 0 ? beat.licenses : defaultLicenses;
  
  const recommendedIndex = licenses.findIndex(l => l.recommended);
  const [selectedIndex, setSelectedIndex] = useState(recommendedIndex !== -1 ? recommendedIndex : 0);
  
  const activeLicense = licenses[selectedIndex];

  if (!isOpen || !beat) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-neutral-800 flex-shrink-0">
            <h2 className="text-2xl font-bold text-white">Choose License</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={28} />
            </button>
        </div>

        <div className="flex-grow p-6 space-y-6 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {licenses.map((license, index) => (
                    <motion.div 
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        className={`relative p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${selectedIndex === index ? 'border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'border-transparent bg-neutral-800 hover:bg-neutral-700'}`}
                        whileHover={{ scale: 1.03 }}
                    >
                        <h3 className="font-bold text-md text-white">{license.name}</h3>
                        <p className="text-xl font-bold text-white mt-1">{license.price > 0 ? `$${license.price.toFixed(2)}` : "Negotiate"}</p>
                        <p className="text-xs text-neutral-400 uppercase font-semibold mt-2">{license.files}</p>
                    </motion.div>
                ))}
            </div>
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-neutral-800/50 p-6 rounded-lg"
                >
                    <h3 className="font-semibold text-white mb-4 text-lg">Usage Terms for <span className="text-green-400">{activeLicense.name}</span></h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        {activeLicense.features.map(feature => (
                            <div key={feature} className="flex items-center gap-3">
                                {featureIcons[feature] || <Check size={16} className="flex-shrink-0 text-green-500" />}
                                <span className="text-neutral-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
             </AnimatePresence>
        </div>

        <div className="flex justify-between items-center p-6 border-t border-neutral-800 flex-shrink-0 bg-neutral-900/50">
            <div>
              <p className="text-sm text-neutral-400">TOTAL:</p>
              <p className="text-3xl font-bold text-white">{activeLicense.price > 0 ? `$${activeLicense.price.toFixed(2)}` : "-"}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={onAddToCart} className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-3 px-6 rounded-full transition-colors text-lg">
                  Add to Cart
              </button>
              <button onClick={onBuyNow} className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full transition-colors text-lg">
                  Buy Now
              </button>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
