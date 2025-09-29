import { Play, Pause, Heart, ShoppingCart } from 'lucide-react';

interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
  cover: string;
  // Other beat properties...
}

interface BeatCardProps {
  beat: Beat;
  isCurrent: boolean;
  isPlaying: boolean;
  onPlay: (id: number) => void;
  onAddToCart: (beat: Beat) => void;
  onClick: (beat: Beat) => void;
}

export default function BeatCard({ beat, isCurrent, isPlaying, onPlay, onAddToCart, onClick }: BeatCardProps) {

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    onPlay(beat.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(beat);
  };

  return (
    <div 
        className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group" 
        onClick={() => onClick(beat)}
    >
        <div className="relative mb-4">
            <img src={beat.cover} alt={beat.title} className="w-full h-auto aspect-square object-cover rounded-md" />
            
            <button 
                onClick={handlePlayPause}
                className={`absolute bottom-2 right-2 w-12 h-12 bg-green-500 text-black rounded-full flex items-center justify-center shadow-lg transform transition-all duration-200 ease-in-out 
                    ${isCurrent ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'}
                `}
            >
                {isCurrent && isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
            </button>
        </div>

        <div className="flex items-start justify-between gap-4">
            <div>
                <h3 className="text-white font-bold truncate transition-colors group-hover:text-green-400">{beat.title}</h3>
                <p className="text-gray-400 text-sm truncate">{beat.producer}</p>
            </div>

            <button 
                onClick={handleAddToCart}
                className="flex-shrink-0 bg-white/5 border border-white/10 text-white font-bold text-sm px-4 py-2 rounded-full hover:bg-white/10 hover:border-white/20 transition-all"
            >
                ${beat.price}
            </button>
        </div>
    </div>
  );
}
