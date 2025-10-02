
import { Download, Play, Image } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Frame from './Frame'; // Import the new Frame component

interface Beat {
  id: string;
  name: string;
  artist: string;
  price: number;
  cover: string;
}

const BeatCard = ({ beat }: { beat: Beat }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="w-full h-full flex flex-col group">
      {/* Use the Frame component for the cover art */}
      <Frame className="relative mb-2 aspect-w-1 aspect-h-1">
        <Link href={`/beats/${beat.id}`} legacyBehavior>
          <a className="block w-full h-full">
            {beat.cover && !imageError ? (
              <img 
                src={beat.cover} 
                alt={`${beat.name} cover art`} 
                className="w-full h-full object-cover" 
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                <Image size={128} className="text-neutral-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
              <button className="text-white bg-black bg-opacity-50 rounded-full p-3 opacity-0 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-300">
                <Play size={24} fill="white" />
              </button>
            </div>
          </a>
        </Link>
      </Frame>

      {/* Beat Details */}
      <div className="flex flex-col flex-grow">
        <Link href={`/beats/${beat.id}`} legacyBehavior>
          <a className='hover:underline'>
            <h3 className="text-white font-medium truncate text-sm">{beat.name}</h3>
          </a>
        </Link>
        <p className="text-neutral-400 text-xs truncate">{beat.artist}</p>

        {/* Combined Price and Action Button */}
        <div className="mt-auto pt-2">
          <button className="flex items-center justify-between w-full px-3 py-1.5 text-sm font-semibold text-white bg-neutral-800/50 border border-neutral-700 rounded-md hover:border-green-500 hover:bg-neutral-800/80 transition-colors">
            <span className="font-mono">${beat.price.toFixed(2)}</span>
            <Download size={16} className="text-neutral-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeatCard;
