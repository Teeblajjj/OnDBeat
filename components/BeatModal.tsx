import { X, Play, Pause, Check, ShoppingCart } from "lucide-react";

interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
  cover: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
  bpm: number;
  description: string;
  licenses: Array<{
    name: string;
    price: number;
    description: string;
    features: string[];
    limitations: string[];
  }>;
}

interface BeatModalProps {
  isOpen: boolean;
  beat: Beat | null;
  selectedLicense: number | null;
  isPlaying: boolean;
  onClose: () => void;
  onLicenseSelect: (index: number) => void;
  onTogglePlay: () => void;
  onAddToCart: (beat: Beat, licenseIndex: number) => void;
}

export default function BeatModal({
  isOpen,
  beat,
  selectedLicense,
  isPlaying,
  onClose,
  onLicenseSelect,
  onTogglePlay,
  onAddToCart
}: BeatModalProps) {
  if (!isOpen || !beat) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">{beat.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side - Cover and Player */}
          <div>
            <div className="relative mb-4">
              <img
                src={beat.cover}
                alt={beat.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={onTogglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
              >
                {isPlaying ? (
                  <Pause className="w-16 h-16 text-green-500" />
                ) : (
                  <Play className="w-16 h-16 text-green-500 ml-2" />
                )}
              </button>
            </div>

            <div className="space-y-2 text-sm text-gray-400">
              <p><strong className="text-white">Producer:</strong> {beat.producer}</p>
              <p><strong className="text-white">Released:</strong> {beat.time}</p>
              <p><strong className="text-white">BPM:</strong> {beat.bpm}</p>
              <p><strong className="text-white">Description:</strong></p>
              <p className="text-gray-300">{beat.description}</p>
            </div>
          </div>

          {/* Right Side - Licenses */}
          <div>
            <h3 className="text-xl font-bold mb-4">Choose License</h3>
            <div className="space-y-4">
              {beat.licenses.map((license, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedLicense === index
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => onLicenseSelect(index)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-lg">{license.name}</h4>
                      <p className="text-gray-400 text-sm">{license.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-500">${license.price}</p>
                      {selectedLicense === index && (
                        <Check className="w-6 h-6 text-green-500 ml-auto" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-green-400 mb-1">Features:</p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {license.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <Check className="w-4 h-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {license.limitations.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-red-400 mb-1">Limitations:</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {license.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-center">
                              <X className="w-4 h-4 text-red-500 mr-2" />
                              {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {selectedLicense !== null && (
              <button
                onClick={() => onAddToCart(beat, selectedLicense)}
                className="w-full mt-6 bg-green-500 text-black font-bold py-3 rounded-lg hover:bg-green-400 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart - ${beat.licenses[selectedLicense].price}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
