import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Repeat, Shuffle, Maximize2, Users, Mic2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import Image from 'next/image';

const PlayerBar = () => {
    const { currentTrack, isPlaying, progress, togglePlay } = usePlayer();
    const [isLiked, setIsLiked] = useState(false);
    const [volume, setVolume] = useState(0.75);
    const [isMuted, setIsMuted] = useState(false);

    if (!currentTrack) {
        return null;
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        if (isMuted) {
            setVolume(0.5); // Restore to a default volume
            setIsMuted(false);
        } else {
            setVolume(0);
            setIsMuted(true);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 h-[5.5rem] bg-black/80 backdrop-blur-md border-t border-neutral-800/70 text-white z-50 flex items-center justify-between px-4">

            {/* Track Info */}
            <div className="flex items-center gap-4 w-1/4">
                 <Image src={currentTrack.cover} alt={currentTrack.title} width={64} height={64} className="rounded-md" />
                <div>
                    <h4 className="font-bold truncate text-lg">{currentTrack.title}</h4>
                    <p className="text-neutral-400 text-sm truncate">{currentTrack.producer}</p>
                </div>
                <Heart size={20} fill={isLiked ? '#1DB954' : 'none'} stroke={isLiked ? '#1DB954' : 'currentColor'} className="cursor-pointer hover:text-white" onClick={() => setIsLiked(!isLiked)} />
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center justify-center gap-2 w-1/2 max-w-2xl">
                <div className="flex items-center gap-6">
                    <Shuffle size={20} className="text-neutral-400 cursor-pointer hover:text-white" />
                    <SkipBack size={24} className="text-neutral-400 cursor-pointer hover:text-white" fill="currentColor" />
                    <button onClick={togglePlay} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/20">
                        {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
                    </button>
                    <SkipForward size={24} className="text-neutral-400 cursor-pointer hover:text-white" fill="currentColor" />
                    <Repeat size={20} className="text-neutral-400 cursor-pointer hover:text-white" />
                </div>
                <div className="flex items-center gap-2 w-full">
                    <span className="text-xs text-neutral-400">1:24</span>
                    <div className="w-full bg-neutral-600 rounded-full h-1.5 cursor-pointer">
                        <div className="bg-white rounded-full h-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="text-xs text-neutral-400">3:45</span>
                </div>
            </div>

            {/* Volume & Other Controls */}
            <div className="flex items-center justify-end gap-4 w-1/4">
                 <div className="flex items-center gap-2 w-32">
                    <button onClick={toggleMute}>
                        {isMuted || volume === 0 ? <VolumeX size={22} /> : <Volume2 size={22} />}
                    </button>
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01" 
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1.5 bg-neutral-600 rounded-full appearance-none cursor-pointer accent-white"
                    />
                </div>
                <Users size={20} className="text-neutral-400 cursor-pointer hover:text-white" />
                <Mic2 size={20} className="text-neutral-400 cursor-pointer hover:text-white" />
                <Maximize2 size={20} className="text-neutral-400 cursor-pointer hover:text-white" />
            </div>
        </div>
    );
};

export default PlayerBar; 
