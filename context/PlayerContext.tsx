
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Beat {
    id: number;
    title: string;
    producer: string;
    cover: string;
    // Add other beat properties if needed
}

interface PlayerContextType {
    currentTrack: Beat | null;
    isPlaying: boolean;
    progress: number;
    playTrack: (track: Beat) => void;
    togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
    const [currentTrack, setCurrentTrack] = useState<Beat | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const playTrack = (track: Beat) => {
        if (currentTrack?.id === track.id) {
            togglePlay();
        } else {
            setCurrentTrack(track);
            setIsPlaying(true);
            setProgress(0); // Reset progress for new track
        }
    };

    const togglePlay = () => {
        if (!currentTrack) return;
        setIsPlaying(prev => !prev);
    };

    // Simulate progress for demonstration
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && currentTrack) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 300); // Adjust for realistic timing
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentTrack]);


    return (
        <PlayerContext.Provider value={{ currentTrack, isPlaying, progress, playTrack, togglePlay }}>
            {children}
        </PlayerContext.Provider>
    );
};
