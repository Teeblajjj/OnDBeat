import { useState } from 'react';
import { FileDropzone, FilePreview } from './Step1Files';
import RichTextEditor from '../RichTextEditor';
import { Image, X, Check } from 'lucide-react';

const genreOptions = ['Hip-Hop', 'Afrobeats', 'RnB', 'Trap', 'Drill', 'Pop', 'Reggaeton', 'Amapiano', 'Jersey Club'];
const moodOptions = ['Chill', 'Dark', 'Uplifting', 'Energetic', 'Romantic', 'Mysterious', 'Hyped', 'Sad', 'Peaceful'];

const MultiSelect = ({ options, selected, onSelectionChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (option) => {
        const newSelection = selected.includes(option)
            ? selected.filter(item => item !== option)
            : [...selected, option];
        onSelectionChange(newSelection);
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-neutral-900/60 border border-neutral-700/80 rounded-lg px-4 py-3 text-left text-white placeholder-neutral-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-green-500 transition-all duration-200 shadow-inner-soft"
            >
                {selected.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                        {selected.map(item => (
                            <span key={item} className="bg-green-600/50 text-green-100 text-xs font-semibold px-2 py-1 rounded-full">
                                {item}
                            </span>
                        ))}
                    </div>
                ) : placeholder}
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg">
                    {options.map(option => (
                        <div
                            key={option}
                            onClick={() => toggleOption(option)}
                            className={`px-4 py-2 cursor-pointer hover:bg-neutral-700 flex justify-between items-center ${selected.includes(option) ? 'font-bold text-green-400' : 'text-white'}`}>
                            <span>{option}</span>
                            {selected.includes(option) && <Check size={16} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const CollectionStep1 = ({ onUpdate, data }) => {
    const [title, setTitle] = useState(data.title || '');
    const [description, setDescription] = useState(data.description || '');
    const [coverArt, setCoverArt] = useState(data.coverArt || null);
    const [tags, setTags] = useState(data.tags || []);
    const [moods, setMoods] = useState(data.moods || []);

    const handleUpdate = (field, value) => {
        onUpdate({ [field]: value });
    };

    const onCoverArtDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const previewUrl = URL.createObjectURL(file);
            const fileWithPreview = Object.assign(file, { preview: previewUrl });
            setCoverArt(fileWithPreview);
            handleUpdate('coverArt', fileWithPreview);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-white">Step 1: Collection Details</h2>
                <p className="text-sm text-neutral-400">Provide the essential details for your collection.</p>
            </div>

            <div className="space-y-6">
                {/* Collection Title */}
                <div className="p-4 border border-neutral-800/80 rounded-lg">
                    <label htmlFor="collectionTitle" className="block text-sm font-medium text-neutral-300 mb-2">Collection Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="collectionTitle"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            handleUpdate('title', e.target.value);
                        }}
                        placeholder="e.g., Summer 2024 Pack"
                        className="w-full bg-neutral-900/60 border border-neutral-700/80 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-green-500 transition-all duration-200 shadow-inner-soft"
                        required
                    />
                </div>

                {/* Description */}
                <div className="p-4 border border-neutral-800/80 rounded-lg">
                    <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-2">Description</label>
                    <RichTextEditor
                        value={description}
                        onChange={(value) => {
                            setDescription(value);
                            handleUpdate('description', value);
                        }}
                        placeholder="Tell us about your collection..."
                    />
                </div>

                {/* Cover Art */}
                <div className="p-4 border border-neutral-800/80 rounded-lg">
                    <h3 className="text-sm font-medium text-neutral-300 mb-2">Cover Art <span className="text-red-500">*</span></h3>
                    {!coverArt ? (
                        <FileDropzone
                            onDrop={onCoverArtDrop}
                            acceptedFormats="image/jpeg, image/png"
                            title="Upload Cover Art"
                            description="1000x1000px Recommended"
                        />
                    ) : (
                        <FilePreview
                            file={coverArt}
                            icon={<Image className="w-6 h-6 text-green-500"/>}
                            onClear={() => {
                                setCoverArt(null);
                                handleUpdate('coverArt', null);
                            }}
                        />
                    )}
                </div>

                {/* Tags / Genres */}
                <div className="p-4 border border-neutral-800/80 rounded-lg">
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Tags / Genres</label>
                    <MultiSelect
                        options={genreOptions}
                        selected={tags}
                        onSelectionChange={(newTags) => {
                            setTags(newTags);
                            handleUpdate('tags', newTags);
                        }}
                        placeholder="Select genres"
                    />
                </div>

                 {/* Moods / Vibes */}
                <div className="p-4 border border-neutral-800/80 rounded-lg">
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Moods / Vibes</label>
                    <MultiSelect
                        options={moodOptions}
                        selected={moods}
                        onSelectionChange={(newMoods) => {
                            setMoods(newMoods);
                            handleUpdate('moods', newMoods);
                        }}
                        placeholder="Select moods"
                    />
                </div>
            </div>
        </div>
    );
};

export default CollectionStep1;
