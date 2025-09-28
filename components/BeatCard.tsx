import { Play, Pause, Heart, MessageCircle, Share2, ShoppingCart } from "lucide-react";

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

interface BeatCardProps {
  beat: Beat;
  currentTrack: number | null;
  isPlaying: boolean;
  onTogglePlay: (id: number) => void;
  onLike: (id: number) => void;
  onComment: (id: number) => void;
  onShare: (id: number) => void;
  onAddToCart: (beat: Beat) => void;
  onBeatClick: (beat: Beat) => void;
}

export default function BeatCard({ 
  beat, 
  currentTrack, 
  isPlaying, 
  onTogglePlay, 
  onLike, 
  onComment, 
  onShare, 
  onAddToCart,
  onBeatClick 
}: BeatCardProps) {
  const isCurrentTrack = currentTrack === beat.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  return (
    <div 
      className="bg-neutral-900 rounded-lg p-4 mb-4 hover:shadow-lg hover:shadow-green-500/10 transition cursor-pointer"
      onClick={() => onBeatClick(beat)}
    >
      <div className="flex gap-4">
        {/* Cover Image */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <img 
            src={beat.cover} 
            alt={beat.title}
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePlay(beat.id);
            }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
          >
            {isCurrentlyPlaying ? (
              <Pause className="w-8 h-8 text-green-500" />
            ) : (
              <Play className="w-8 h-8 text-green-500 ml-1" />
            )}
          </button>
        </div>

        {/* Beat Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg leading-tight">{beat.title}</h3>
              <p className="text-sm text-gray-400 mt-1">by {beat.producer}</p>
              <p className="text-xs text-gray-500 mt-1">Released on {beat.time}</p>
              <p className="text-xs text-gray-400 mt-1">{beat.bpm} BPM</p>
            </div>
            {beat.id === 1 && <span className="text-xs bg-gray-800 px-2 py-1 rounded">AD</span>}
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between mt-3">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(beat);
              }}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full font-bold text-sm text-white transition-colors"
            >
              ${beat.price}.00
            </button>
            
            <div className="flex items-center space-x-4" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => onLike(beat.id)}
                className="flex items-center gap-1 hover:text-red-500 transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span>{beat.likes}</span>
              </button>
              <button 
                onClick={() => onComment(beat.id)}
                className="flex items-center gap-1 hover:text-green-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{beat.comments}</span>
              </button>
              <button 
                onClick={() => onShare(beat.id)}
                className="flex items-center gap-1 hover:text-blue-400 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>{beat.shares}</span>
              </button>
              <ShoppingCart 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(beat);
                }}
                className="w-5 h-5 cursor-pointer hover:text-green-400 transition-colors" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}