import { Play, Pause, ShoppingCart, Heart, MessageCircle, Upload, MoreVertical, UserCircle, Music } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export const FeedItem = ({ beat }) => {
    const { playTrack, currentTrack, isPlaying } = usePlayer();
    
    // State for client-side only rendering to prevent hydration mismatch
    const [timeAgo, setTimeAgo] = useState('');
    const [releaseDate, setReleaseDate] = useState('...'); // Start with a placeholder

    const producerName = beat.producer?.displayName || "Unknown Artist";
    const producerHandle = beat.producer?.displayName?.toLowerCase().replace(/\s/g, '') || "unknown";
    const producerAvatar = beat.producer?.photoURL;

    useEffect(() => {
        // This entire block runs only on the client-side, after the initial render.
        const createdAtDate = beat.createdAt ? new Date(beat.createdAt) : null;
        if (!createdAtDate) {
            setTimeAgo('some time');
            setReleaseDate('Unknown');
            return;
        }

        // --- Calculate Time Ago ---
        const timeSince = (date) => {
            const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
            if (seconds < 5) return "just now";
            let interval = seconds / 31536000;
            if (interval > 1) return Math.floor(interval) + "y";
            interval = seconds / 2592000;
            if (interval > 1) return Math.floor(interval) + "m";
            interval = seconds / 86400;
            if (interval > 1) return Math.floor(interval) + "d";
            interval = seconds / 3600;
            if (interval > 1) return Math.floor(interval) + "h";
            interval = seconds / 60;
            if (interval > 1) return Math.floor(interval) + "m";
            return Math.floor(seconds) + "s";
        };
        setTimeAgo(timeSince(createdAtDate));

        // --- Calculate Release Date ---
        setReleaseDate(createdAtDate.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        }));

    }, [beat.createdAt]);

    return (
        <div className="bg-[#181818] border border-neutral-800 rounded-lg p-4 sm:p-6 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    {producerAvatar ? (
                        <img src={producerAvatar} alt={producerName} className="w-10 h-10 rounded-full object-cover"/>
                    ) : (
                        <UserCircle size={40} className="text-neutral-500" />
                    )}
                    <div>
                        <p className="font-bold text-white">{producerName} <span className="font-normal text-neutral-400 text-sm">@{producerHandle}</span></p>
                        <p className="text-sm text-neutral-500">{timeAgo} ago {beat.isSponsored && <span className="text-xs text-neutral-500">• Sponsored</span>}</p>
                    </div>
                </div>
                <button className="text-neutral-400 hover:text-white">
                    <MoreVertical size={20} />
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
                 <Link href={`/beats/${beat.id}`} legacyBehavior>
                    <a className="w-full sm:w-40 h-40 bg-neutral-800 rounded-md flex-shrink-0 flex items-center justify-center relative overflow-hidden cursor-pointer">
                        {beat.coverImage ? (
                            <img src={beat.coverImage} alt={beat.title} className="w-full h-full object-cover" />
                        ) : (
                            <Music size={60} className="text-neutral-600" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </a>
                </Link>
                <div className="flex-grow">
                    <div className="flex items-center gap-3">
                        <button onClick={() => playTrack(beat)} className="text-white bg-green-500/10 rounded-full p-2 hover:bg-green-500/20 transition-colors">
                            {currentTrack?.id === beat.id && isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                        </button>
                         <Link href={`/beats/${beat.id}`} legacyBehavior>
                            <a className="hover:underline">
                                <h3 className="text-xl sm:text-2xl font-bold text-white flex-grow">{beat.title}</h3>
                            </a>
                        </Link>
                    </div>
                    <p className="text-neutral-400 mt-2">Released on {releaseDate}</p>
                    <p className="text-neutral-300 my-3 text-sm">{beat.description}</p>
                    <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-all shadow-md hover:shadow-green-500/30">
                        <ShoppingCart size={16} />
                        <span>${beat.priceWav || 'N/A'}</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-6 text-neutral-400 mt-4 pt-4 border-t border-neutral-800">
                <button className="flex items-center gap-2 hover:text-green-400 transition-colors"><Heart size={20} /> <span>{beat.likes || 0}</span></button>
                <button className="flex items-center gap-2 hover:text-green-400 transition-colors"><MessageCircle size={20} /> <span>{beat.comments || 0}</span></button>
                <button className="flex items-center gap-2 hover:text-green-400 transition-colors"><Upload size={20} /> <span>{beat.shares || 0}</span></button>
            </div>
        </div>
    );
};
