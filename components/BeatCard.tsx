import { Play, Pause, Heart, ShoppingCart, Music } from 'lucide-react';

interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
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
        className="group relative rounded-lg overflow-hidden bg-[#181818] hover:bg-[#282828] transition-all duration-300 ease-in-out cursor-pointer"
        onClick={() => onClick(beat)}
    >
        <div className="relative w-full aspect-square">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <Music size={80} className="text-gray-500" />
            </div>

            <button 
                onClick={handlePlayPause}
                className={`absolute bottom-4 left-4 w-14 h-14 bg-green-500 text-black rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 ease-in-out 
                    ${isCurrent ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'}`
                }
            >
                {isCurrent && isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
            </button>
            
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    // Handle favorite logic
                }}
                className="absolute top-4 right-4 w-10 h-10 bg-black/40 text-white/70 hover:text-white hover:bg-black/60 rounded-full flex items-center justify-center transition-all"
            >
                <Heart size={20} />
            </button>
        </div>

        <div className="p-4 space-y-2">
            <h3 className="text-white font-bold text-lg truncate transition-colors group-hover:text-green-400">{beat.title}</h3>
            <p className="text-gray-400 text-sm truncate">{beat.producer}</p>
            
            <div className="flex items-center justify-between pt-2">
                <p className="text-white font-semibold text-lg">${beat.price}</p>
                <button 
                    onClick={handleAddToCart}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-4 py-2 rounded-full transition-colors"
                >
                    <ShoppingCart size={16} />
                    Add
                </button>
            </div>
        </div>
    </div>
  );
}
