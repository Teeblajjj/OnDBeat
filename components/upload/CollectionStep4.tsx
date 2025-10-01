import { useState } from 'react';
import ToggleSwitch from '../ToggleSwitch';
import { Calendar, Eye, Globe, Lock, Star, CheckCircle } from 'lucide-react';

const CollectionStep4 = ({ onUpdate, data }) => {
    const [releaseDate, setReleaseDate] = useState(data.releaseDate || '');
    const [visibility, setVisibility] = useState(data.visibility || 'public');
    const [featured, setFeatured] = useState(data.featured || false);

    const handleUpdate = (field, value) => {
        onUpdate({ [field]: value });
    };

    const visibilityOptions = [
        { id: 'public', title: 'Public', description: 'Visible to everyone.', icon: <Globe size={20} /> },
        { id: 'private', title: 'Private', description: 'Only you can see it.', icon: <Lock size={20} /> },
        { id: 'unlisted', title: 'Unlisted', description: 'Only people with the link can see it.', icon: <Eye size={20} /> },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-white">Step 4: Publishing & Visibility</h2>
                <p className="text-sm text-neutral-400">Control when and how your collection is released.</p>
            </div>

            <div className="space-y-6">
                {/* Release Date */}
                <div className="p-4 border border-neutral-800/80 rounded-lg">
                    <label htmlFor="releaseDate" className="block text-sm font-medium text-neutral-300 mb-2">Schedule Release</label>
                    <div className="relative">
                         <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral-400 pointer-events-none"><Calendar size={18}/></span>
                        <input
                            type="date"
                            id="releaseDate"
                            value={releaseDate}
                            onChange={(e) => {
                                setReleaseDate(e.target.value);
                                handleUpdate('releaseDate', e.target.value);
                            }}
                            className="w-full bg-neutral-900/60 border border-neutral-700/80 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-green-500 transition-all duration-200 shadow-inner-soft appearance-none"
                        />
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">Leave blank for immediate release upon publishing.</p>
                </div>

                {/* Visibility */}
                <div className="p-4 border border-neutral-800/80 rounded-lg">
                    <h3 className="text-sm font-medium text-neutral-300 mb-3">Visibility</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {visibilityOptions.map(option => (
                            <button 
                                key={option.id}
                                onClick={() => {
                                    setVisibility(option.id);
                                    handleUpdate('visibility', option.id);
                                }}
                                className={`relative text-left p-4 rounded-lg transition-all duration-300 border ${visibility === option.id ? 'bg-gradient-to-r from-green-800/50 to-neutral-800 border-green-500 shadow-[0_0_10px_rgba(49,196,141,0.3)]' : 'bg-neutral-800/60 border-neutral-700/80 hover:border-neutral-600'}`}>
                                {visibility === option.id && <CheckCircle size={20} className="absolute top-3 right-3 text-green-400" />}
                                <div className="flex items-center gap-3 mb-1">
                                    <div className={`${visibility === option.id ? 'text-green-400' : 'text-neutral-400'}`}>{option.icon}</div>
                                    <h5 className="font-bold text-white">{option.title}</h5>
                                </div>
                                <p className="text-xs text-neutral-400">{option.description}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Option */}
                <div className="bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800/80 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-white flex items-center gap-2"><Star size={20} className="text-yellow-400"/> Feature this collection</h3>
                        <p className="text-sm text-neutral-400">Highlight this on your main creator profile.</p>
                    </div>
                     <ToggleSwitch 
                        enabled={featured}
                        setEnabled={(value) => {
                            setFeatured(value);
                            handleUpdate('featured', value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CollectionStep4;
