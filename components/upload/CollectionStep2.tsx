import { useState } from 'react';
import { Plus, Upload, Music, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

// Mock data for existing beats
const existingBeats = [
    { id: 1, title: 'Sunset Vibes', duration: '3:15', license: 'Non-Exclusive', cover: '/placeholders/sunset.jpg' },
    { id: 2, title: 'Midnight Drive', duration: '2:45', license: 'Exclusive', cover: '/placeholders/midnight.jpg' },
    { id: 3, title: 'Lo-Fi Dreams', duration: '3:30', license: 'Non-Exclusive', cover: '/placeholders/lofi.jpg' },
    { id: 4, title: 'Trap Banger', duration: '2:55', license: 'Non-Exclusive', cover: '/placeholders/trap.jpg' },
    { id: 5, title: 'Cloudy Mornings', duration: '3:05', license: 'Exclusive', cover: '/placeholders/cloudy.jpg' },
    { id: 6, title: 'Drill Sergeant', duration: '3:00', license: 'Non-Exclusive', cover: '/placeholders/drill.jpg' },
];

const CollectionStep2 = ({ onUpdate, data }) => {
    const [selectedTracks, setSelectedTracks] = useState(data.tracks || []);
    const [showExistingTracks, setShowExistingTracks] = useState(false);

    const isTrackSelected = (trackId) => selectedTracks.some(t => t.id === trackId);

    const addTrack = (track) => {
        if (isTrackSelected(track.id)) return; // Prevent adding duplicates
        const newTracks = [...selectedTracks, track];
        setSelectedTracks(newTracks);
        onUpdate({ tracks: newTracks });
    };

    const removeTrack = (trackId) => {
        const newTracks = selectedTracks.filter(t => t.id !== trackId);
        setSelectedTracks(newTracks);
        onUpdate({ tracks: newTracks });
    };

    const moveTrack = (index, direction) => {
        const newTracks = [...selectedTracks];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= newTracks.length) return;
        [newTracks[index], newTracks[newIndex]] = [newTracks[newIndex], newTracks[index]]; // Swap elements
        setSelectedTracks(newTracks);
        onUpdate({ tracks: newTracks });
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-white">Step 2: Add Tracks</h2>
                <p className="text-sm text-neutral-400">Upload new tracks or select from your existing library.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-[0_0_10px_rgba(49,196,141,0.5)] border border-green-700 flex items-center justify-center gap-2">
                    <Upload size={20} />
                    <span>Upload New Tracks</span>
                </button>
                <button 
                    onClick={() => setShowExistingTracks(!showExistingTracks)}
                    className="flex-1 bg-neutral-800 text-white font-bold py-3 px-6 rounded-lg hover:border-green-500 transition-colors border border-neutral-700 flex items-center justify-center gap-2">
                    <Music size={20} />
                    <span>Select from Library</span>
                </button>
            </div>

            {showExistingTracks && (
                <div className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-800">
                    <h3 className="text-lg font-semibold mb-4 text-white">Your Existing Beats</h3>
                    <div className="space-y-3">
                        {existingBeats.map(beat => (
                            <div key={beat.id} className="flex items-center justify-between bg-neutral-800/60 p-3 rounded-md border border-neutral-700/80">
                                <div className="flex items-center gap-3">
                                     <img src={beat.cover} alt={beat.title} className="w-10 h-10 rounded-md object-cover" />
                                     <div>
                                        <p className="font-semibold text-white">{beat.title}</p>
                                        <p className="text-xs text-neutral-400">{beat.license}</p>
                                     </div>
                                </div>
                                <button 
                                    onClick={() => addTrack(beat)} 
                                    disabled={isTrackSelected(beat.id)}
                                    className={`text-xs font-bold py-1 px-4 rounded-full transition-all ${isTrackSelected(beat.id) ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                                    {isTrackSelected(beat.id) ? 'Added' : 'Add'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Collection Tracks ({selectedTracks.length})</h3>
                {selectedTracks.length === 0 ? (
                    <div className="text-center py-10 border-2 border-dashed border-neutral-800 rounded-lg">
                         <Music size={32} className="mx-auto text-neutral-600 mb-2" />
                        <p className="text-neutral-400">No tracks added yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {selectedTracks.map((track, index) => (
                            <div key={track.id} className="flex items-center justify-between bg-gradient-to-r from-neutral-800 to-neutral-900 p-3 rounded-lg border border-neutral-700/80 shadow-lg">
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-lg text-green-400/80 w-6 text-center" style={{textShadow: '0 0 5px rgba(49, 196, 141, 0.5)'}}>{index + 1}</span>
                                    <img src={track.cover} alt={track.title} className="w-12 h-12 rounded-md object-cover" />
                                    <div>
                                        <p className="font-semibold text-white">{track.title}</p>
                                        <p className="text-sm text-neutral-400">{track.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                     <div className="flex items-center gap-1">
                                        <button onClick={() => moveTrack(index, 'up')} disabled={index === 0} className="p-1 rounded-full bg-neutral-700/50 hover:bg-neutral-700 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"><ArrowUp size={16} /></button>
                                        <button onClick={() => moveTrack(index, 'down')} disabled={index === selectedTracks.length - 1} className="p-1 rounded-full bg-neutral-700/50 hover:bg-neutral-700 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"><ArrowDown size={16} /></button>
                                    </div>
                                    <button onClick={() => removeTrack(track.id)} className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectionStep2;
