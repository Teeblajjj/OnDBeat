import { useState } from 'react';
import { Image, Archive } from 'lucide-react';
import { FileDropzone, FilePreview } from './Step1Files';

const SoundKitStep1 = () => {
    const [kitTitle, setKitTitle] = useState('');
    const [kitDescription, setKitDescription] = useState('');
    const [coverArt, setCoverArt] = useState(null);
    const [kitFile, setKitFile] = useState(null);

    const onCoverArtDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setCoverArt(acceptedFiles[0]);
        }
    };
    
    const onKitFileDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setKitFile(acceptedFiles[0]);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-white">Upload a Sound Kit</h2>
                <p className="text-sm text-neutral-400">Package and sell your drum kits, loop packs, or preset banks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Title & Description */}
                <div className="space-y-6">
                    <div>
                        <label htmlFor="kitTitle" className="block text-sm font-medium text-neutral-300 mb-2">Sound Kit Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="kitTitle"
                            value={kitTitle}
                            onChange={(e) => setKitTitle(e.target.value)}
                            placeholder="e.g., The Neptune Preset Bank"
                            className="w-full bg-neutral-800 border-transparent rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="kitDescription" className="block text-sm font-medium text-neutral-300 mb-2">Description</label>
                        <textarea
                            id="kitDescription"
                            value={kitDescription}
                            onChange={(e) => setKitDescription(e.target.value)}
                            rows={5}
                            placeholder="Describe what is in your sound kit..."
                            className="w-full bg-neutral-800 border-transparent rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                {/* Right Side: File Uploads */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-neutral-300 mb-2">Cover Art <span className="text-red-500">*</span></h3>
                        {!coverArt ? (
                            <FileDropzone
                                onDrop={onCoverArtDrop}
                                acceptedFormats="image/jpeg, image/png, image/gif"
                                title="Upload Cover Art"
                                description="1:1 Ratio Recommended"
                            />
                        ) : (
                            <FilePreview file={coverArt} icon={<Image className="w-6 h-6 text-green-500"/>} onClear={() => setCoverArt(null)} />
                        )}
                    </div>
                     <div>
                        <h3 className="text-sm font-medium text-neutral-300 mb-2">Sound Kit File <span className="text-red-500">*</span></h3>
                         {!kitFile ? (
                            <FileDropzone
                                onDrop={onKitFileDrop}
                                acceptedFormats=".zip,.rar,.tar.gz"
                                title="Upload Sound Kit"
                                description="ZIP, RAR, or TAR.GZ"
                            />
                        ) : (
                            <FilePreview file={kitFile} icon={<Archive className="w-6 h-6 text-green-500"/>} onClear={() => setKitFile(null)} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoundKitStep1;
