import { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between bg-neutral-800/50 p-4 rounded-lg">
        <div>
            <h4 className="font-semibold text-white">{label}</h4>
            <p className="text-sm text-neutral-400">{description}</p>
        </div>
        <button
            type="button"
            className={`${enabled ? 'bg-green-500' : 'bg-neutral-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-neutral-900`}
            role="switch"
            aria-checked={enabled}
            onClick={onChange}
        >
            <span
                aria-hidden="true"
                className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
        </button>
    </div>
);

const Slider = ({ value, onChange, min, max, step, label }) => (
    <div className="bg-neutral-800/50 p-4 rounded-lg">
         <div className="flex justify-between items-center mb-2">
            <label className="font-semibold text-white">{label}</label>
            <span className="text-green-400 font-mono">{value}s</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer range-lg"
            style={{
                background: `linear-gradient(to right, #22c55e 0%, #22c55e ${(value - min) / (max - min) * 100}%, #404040 ${(value - min) / (max - min) * 100}%, #404040 100%)`
            }}
        />
         <div className="flex justify-between text-xs text-neutral-400 mt-1">
            <span>{min}s</span>
            <span>{max}s</span>
        </div>
    </div>
);


const Step5_Monetization = () => {
    const [contentId, setContentId] = useState(false);
    const [freeDemo, setFreeDemo] = useState(true);
    const [previewLength, setPreviewLength] = useState(60);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Monetization</h2>
            
            <div className="relative group">
                 <ToggleSwitch 
                    enabled={contentId} 
                    onChange={() => setContentId(!contentId)} 
                    label="YouTube Content ID"
                    description="Register this beat with YouTube's Content ID system to detect and claim monetization on copies."
                />
                <div className="absolute top-4 right-4">
                    <HelpCircle size={16} className="text-neutral-500"/>
                    <div className="absolute bottom-full mb-2 w-72 bg-neutral-800 text-white text-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -translate-x-1/2 left-1/2">
                        When enabled, we will automatically register your beat with YouTube. This helps you earn revenue when your beat is used in monetized videos.
                    </div>
                </div>
            </div>

            <ToggleSwitch 
                enabled={freeDemo} 
                onChange={() => setFreeDemo(!freeDemo)} 
                label="Free Demo Download"
                description="Allow non-commercial users to download a tagged MP3 version for free."
            />

            <Slider 
                label="Preview Length"
                value={previewLength}
                onChange={e => setPreviewLength(Number(e.target.value))}
                min={30}
                max={120}
                step={15}
            />
        </div>
    )
}

export default Step5_Monetization;
