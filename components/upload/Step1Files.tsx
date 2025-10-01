import { useState, useCallback } from 'react';
import { UploadCloud, Music, FileZip, Image as ImageIcon, X } from 'lucide-react';

export const FileDropzone = ({ onDrop, acceptedFormats, title, description }) => {
    const [isDragActive, setIsDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onDrop(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            onDrop(e.target.files);
        }
    };

    // Base classes for the dropzone
    const baseClasses = "border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ease-in-out cursor-pointer";
    // Classes for the inactive state
    const inactiveClasses = "border-neutral-700 bg-neutral-900/50 hover:border-green-500/50 hover:bg-neutral-800/50";
    // Classes for the active (drag-over) state, featuring the gamified green glow
    const activeClasses = "border-green-500 bg-green-900/20 shadow-[inset_0_0_15px_rgba(49,196,141,0.3),_0_0_15px_rgba(49,196,141,0.2)] scale-105";

    return (
        <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`${baseClasses} ${isDragActive ? activeClasses : inactiveClasses}`}
        >
            <input type="file" id={`file-upload-${title}`} accept={acceptedFormats} onChange={handleChange} className="hidden" />
            <label htmlFor={`file-upload-${title}`} className="cursor-pointer flex flex-col items-center justify-center h-full">
                <UploadCloud className={`w-12 h-12 mb-3 transition-transform ${isDragActive ? 'text-green-400 scale-110' : 'text-neutral-500'}`} />
                <p className="font-bold text-white text-lg">{title}</p>
                <p className="text-sm text-neutral-400">{description}</p>
                <p className="text-xs text-neutral-500 mt-2 tracking-wider">{acceptedFormats}</p>
            </label>
        </div>
    );
};

export const FilePreview = ({ file, icon, onClear }) => (
    <div className="flex items-center justify-between bg-gradient-to-r from-neutral-800/80 to-neutral-900/70 p-3 rounded-lg border border-neutral-700/80 shadow-md">
        <div className="flex items-center gap-3 overflow-hidden">
            {icon}
            <span className="text-sm font-medium text-white truncate">{file.name}</span>
        </div>
        <button onClick={onClear} className="text-neutral-500 hover:text-white p-1 rounded-full hover:bg-red-500/20 transition-colors">
            <X size={18}/>
        </button>
    </div>
);

// This is the default export, it's not used in CollectionStep1, but it is here
// I will leave it as it is
const Step1_Files = () => {
    // ... same as before
    return <div></div>
}

export default Step1_Files;
