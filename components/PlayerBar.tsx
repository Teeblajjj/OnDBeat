import { Play, Pause, Heart, Volume2, VolumeX, RotateCcw, SkipBack, SkipForward, EllipsisVertical, ShoppingCart } from "lucide-react";

interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
  cover: string;
}

interface PlayerBarProps {
  currentTrack: number | null;
  isPlaying: boolean;
  isMuted: boolean;
  audioProgress: number;
  beats: Beat[];
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
  onRestart: () => void;
  onLike: () => void;
  onAddToCart: () => void;
  onHidePlayer: () => void;
}

export default function PlayerBar({
  currentTrack,
  isPlaying,
  isMuted,
  audioProgress,
  beats,
  onTogglePlay,
  onToggleMute,
  onSkipBack,
  onSkipForward,
  onRestart,
  onLike,
  onAddToCart,
  onHidePlayer
}: PlayerBarProps) {
  if (!currentTrack) return null;

  const currentBeat = beats.find(b => b.id === currentTrack);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-800 px-4 md:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4 z-50">
      {/* Track Info */}
      <div className="flex items-center space-x-3 w-full md:w-1/4">
        <img 
          src={currentBeat?.cover} 
          className="w-12 h-12 rounded-md object-cover"
          alt="Playing Beat"
        />
        <div className="truncate">
          <p className="text-sm font-semibold truncate">
            {currentBeat?.title}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {currentBeat?.producer}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-full md:w-2/4">
        <div className="flex items-center space-x-6 mb-2">
          <SkipBack 
            onClick={onSkipBack}
            className="cursor-pointer hover:text-green-400 w-5 h-5 transition-colors" 
          />
          {isPlaying ? (
            <Pause 
              className="text-xl cursor-pointer hover:text-green-400 transition-colors" 
              onClick={onTogglePlay}
            />
          ) : (
            <Play 
              className="text-xl cursor-pointer hover:text-green-400 ml-0.5 transition-colors" 
              onClick={onTogglePlay}
            />
          )}
          <SkipForward 
            onClick={onSkipForward}
            className="cursor-pointer hover:text-green-400 w-5 h-5 transition-colors" 
          />
          <RotateCcw 
            onClick={onRestart}
            className="cursor-pointer hover:text-green-400 w-5 h-5 transition-colors" 
          />
        </div>
        
        {/* Progress Bar */}
        <div className="w-full max-w-lg h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-100"
            style={{ width: `${audioProgress}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4 w-full md:w-1/4">
        <Heart 
          onClick={onLike}
          className="cursor-pointer hover:text-red-500 w-5 h-5 transition-colors" 
        />
        {isMuted ? (
          <VolumeX 
            onClick={onToggleMute}
            className="cursor-pointer hover:text-green-400 w-5 h-5 transition-colors" 
          />
        ) : (
          <Volume2 
            onClick={onToggleMute}
            className="cursor-pointer hover:text-green-400 w-5 h-5 transition-colors" 
          />
        )}
        <div 
          onClick={onAddToCart}
          className="flex items-center space-x-2 bg-green-600 px-3 py-1 rounded-md cursor-pointer hover:bg-green-700 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>${currentBeat?.price}.00</span>
        </div>
        <EllipsisVertical 
          onClick={onHidePlayer}
          className="cursor-pointer hover:text-green-400 w-5 h-5 transition-colors" 
        />
      </div>
    </footer>
  );
}