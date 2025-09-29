import { Play, Pause, Heart, Volume2, Volume1, VolumeX, Shuffle, SkipBack, SkipForward, Repeat, Mic, ListMusic, Laptop2, Maximize2 } from 'lucide-react';
import { useState } from 'react';

interface Track {
    title: string;
    producer: string;
    cover: string;
}

interface PlayerBarProps {
    isPlaying: boolean;
    progress: number; // 0 to 100
    currentTrack: Track | null;
    onPlayPause: () => void;
}

const Slider = ({ value, onChange, ...props }) => (
    <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={onChange}
        className="w-full h-1 bg-neutral-600 rounded-lg appearance-none cursor-pointer group-hover:bg-green-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:opacity-0 group-hover:[&::-webkit-slider-thumb]:opacity-100 transition-all"
        {...props}
    />
);

export default function PlayerBar({ isPlaying, progress, currentTrack, onPlayPause }: PlayerBarProps) {
    const [volume, setVolume] = useState(70);

    const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

    if (!currentTrack) {
        // Render a placeholder or nothing if no track is selected
        return <div className="fixed bottom-0 w-full h-[5.5rem] bg-black border-t border-neutral-800" />;
    }

    return (
        <footer className="fixed bottom-0 w-full h-[5.5rem] bg-black border-t border-neutral-800 px-4 py-3 grid grid-cols-12 items-center gap-4 z-50">
            
            {/* Track Info (Left) */}
            <div className="col-span-4 md:col-span-3 flex items-center gap-3">
                <img src={currentTrack.cover} alt={currentTrack.title} className="w-14 h-14 rounded-md object-cover" />
                <div className="hidden md:block">
                    <p className="text-white font-semibold truncate hover:underline cursor-pointer">{currentTrack.title}</p>
                    <p className="text-neutral-400 text-sm truncate hover:underline cursor-pointer">{currentTrack.producer}</p>
                </div>
                <Heart size={20} className="text-neutral-400 hover:text-white cursor-pointer hidden lg:block"/>
            </div>

            {/* Player Controls (Center) */}
            <div className="col-span-8 md:col-span-6 flex flex-col justify-center gap-2">
                <div className="flex items-center justify-center gap-4">
                    <Shuffle size={18} className="text-neutral-400 hover:text-white cursor-pointer"/>
                    <SkipBack size={20} className="text-neutral-400 hover:text-white cursor-pointer"/>
                    <button onClick={onPlayPause} className="bg-white rounded-full p-2 hover:scale-105 transition-transform">
                        {isPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" size={24} className="ml-0.5" />}
                    </button>
                    <SkipForward size={20} className="text-neutral-400 hover:text-white cursor-pointer"/>
                    <Repeat size={18} className="text-neutral-400 hover:text-white cursor-pointer"/>
                </div>
                <div className="flex items-center gap-2 group">
                    <span className="text-xs text-neutral-400">1:24</span>
                    <div className="w-full">
                        <Slider value={progress} />
                    </div>
                    <span className="text-xs text-neutral-400">3:45</span>
                </div>
            </div>

            {/* Volume & Other Controls (Right) */}
            <div className="hidden md:col-span-3 md:flex items-center justify-end gap-3 text-neutral-400">
                <Mic size={18} className="hover:text-white cursor-pointer"/>
                <ListMusic size={18} className="hover:text-white cursor-pointer"/>
                <Laptop2 size={18} className="hover:text-white cursor-pointer"/>
                <div className="flex items-center gap-2 w-32 group">
                    <VolumeIcon size={20} className="cursor-pointer hover:text-white" onClick={() => setVolume(v => v > 0 ? 0 : 70)}/>
                    <Slider value={volume} onChange={e => setVolume(Number(e.target.value))} />
                </div>
                <Maximize2 size={18} className="hover:text-white cursor-pointer"/>
            </div>

        </footer>
    );
}
