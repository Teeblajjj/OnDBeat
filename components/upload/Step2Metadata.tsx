import { useState } from 'react';
import { X } from 'lucide-react';

const genres = ['Hip-Hop', 'Afrobeats', 'R&B', 'Pop', 'Electronic', 'Dancehall', 'Reggaeton'];
const moods = ['Dark', 'Chill', 'Uplifting', 'Energetic', 'Melancholic', 'Aggressive', 'Smooth'];
const keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const keyModes = ['Major', 'Minor'];

const Chip = ({ label, onRemove }) => (
    <div className="flex items-center bg-green-500/20 text-green-300 rounded-full px-3 py-1 text-sm font-medium">
        <span>{label}</span>
        {onRemove && (
            <button onClick={onRemove} className="ml-2 text-green-300 hover:text-white">
                <X size={14}/>
            </button>
        )}
    </div>
);

const Step2_Metadata = () => {
    const [genre, setGenre] = useState('');
    const [subGenre, setSubGenre] = useState('');
    const [selectedMoods, setSelectedMoods] = useState([]);
    const [bpm, setBpm] = useState('');
    const [beatKey, setBeatKey] = useState('C');
    const [keyMode, setKeyMode] = useState('Major');
    const [description, setDescription] = useState('');
    const [referenceArtists, setReferenceArtists] = useState([]);
    const [artistInput, setArtistInput] = useState('');

    const toggleMood = (mood) => {
        setSelectedMoods(prev => 
            prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
        );
    };

    const addArtist = () => {
        if (artistInput && !referenceArtists.includes(artistInput)) {
            setReferenceArtists(prev => [...prev, artistInput]);
            setArtistInput('');
        }
    };

    const removeArtist = (artistToRemove) => {
        setReferenceArtists(prev => prev.filter(artist => artist !== artistToRemove));
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Genre */}
                <div>
                    <label htmlFor="genre" className="block text-sm font-medium text-neutral-300 mb-2">Genre <span className="text-red-500">*</span></label>
                    <select id="genre" value={genre} onChange={e => setGenre(e.target.value)} className="w-full bg-neutral-800 border-transparent rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-green-500">
                        <option value="" disabled>Select a genre</option>
                        {genres.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
                 {/* Sub-Genre */}
                <div>
                    <label htmlFor="subGenre" className="block text-sm font-medium text-neutral-300 mb-2">Sub-Genre</label>
                    <input type="text" id="subGenre" value={subGenre} onChange={e => setSubGenre(e.target.value)} placeholder="e.g., Trap, Lo-fi" className="w-full bg-neutral-800 border-transparent rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-green-500"/>
                </div>
            </div>

             {/* Mood/Tags */}
            <div>
                 <label className="block text-sm font-medium text-neutral-300 mb-2">Moods / Tags</label>
                 <div className="flex flex-wrap gap-2">
                    {moods.map(mood => (
                        <button key={mood} onClick={() => toggleMood(mood)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedMoods.includes(mood) ? 'bg-green-500 text-white' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'}`}>
                            {mood}
                        </button>
                    ))}
                 </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* BPM */}
                <div>
                    <label htmlFor="bpm" className="block text-sm font-medium text-neutral-300 mb-2">BPM <span className="text-red-500">*</span></label>
                    <input type="number" id="bpm" value={bpm} onChange={e => setBpm(e.target.value)} placeholder="e.g., 120" className="w-full bg-neutral-800 border-transparent rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-green-500"/>
                </div>
                {/* Key */}
                <div>
                    <label htmlFor="key" className="block text-sm font-medium text-neutral-300 mb-2">Key <span className="text-red-500">*</span></label>
                    <select id="key" value={beatKey} onChange={e => setBeatKey(e.target.value)} className="w-full bg-neutral-800 border-transparent rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-green-500">
                         {keys.map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                </div>
                {/* Key Mode */}
                 <div>
                    <label htmlFor="keyMode" className="block text-sm font-medium text-neutral-300 mb-2"> </label>
                    <select id="keyMode" value={keyMode} onChange={e => setKeyMode(e.target.value)} className="w-full bg-neutral-800 border-transparent rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-green-500 mt-[7px]">
                         {keyModes.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-2">Description</label>
                <textarea id="description" value={description} onChange={e => setDescription(e.Tungsten.value)} rows={4} placeholder="Describe your beat..." className="w-full bg-neutral-800 border-transparent rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-green-500" />
            </div>

            {/* Reference Artists */}
            <div>
                 <label htmlFor="artistInput" className="block text-sm font-medium text-neutral-300 mb-2">Reference Artists</label>
                 <div className="flex gap-2">
                    <input type="text" id="artistInput" value={artistInput} onChange={e => setArtistInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addArtist()} placeholder="e.g., Burna Boy, Drake" className="w-full bg-neutral-800 border-transparent rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-green-500"/>
                    <button onClick={addArtist} className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-2 px-4 rounded-lg">Add</button>
                 </div>
                 <div className="flex flex-wrap gap-2 mt-3">
                    {referenceArtists.map(artist => (
                        <Chip key={artist} label={artist} onRemove={() => removeArtist(artist)} />
                    ))}
                 </div>
            </div>
        </div>
    )
}

export default Step2_Metadata;