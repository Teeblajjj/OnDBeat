import { useState } from 'react';
import ToggleSwitch from '../ToggleSwitch';
import { CheckCircle, UploadCloud } from 'lucide-react';

const CollectionStep3 = ({ onUpdate, data }) => {
    const [enablePricing, setEnablePricing] = useState(data.enablePricing ?? true);
    const [price, setPrice] = useState(data.price || '49.99');
    const [licenseType, setLicenseType] = useState(data.licenseType || 'non-exclusive');
    const [customLicense, setCustomLicense] = useState(data.customLicense || null);

    const handleUpdate = (field, value) => {
        onUpdate({ [field]: value });
    };
    
    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setCustomLicense(e.target.files[0]);
            handleUpdate('customLicense', e.target.files[0]);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-white">Step 3: Licensing & Pricing</h2>
                <p className="text-sm text-neutral-400">Set a price for the entire collection or use individual track pricing.</p>
            </div>

            <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg text-white">Enable Collection Pricing</h3>
                        <p className="text-sm text-neutral-400">Sell the entire collection as a single bundle.</p>
                    </div>
                    <ToggleSwitch 
                        enabled={enablePricing}
                        setEnabled={(value) => {
                            setEnablePricing(value);
                            handleUpdate('enablePricing', value);
                        }}
                    />
                </div>

                {enablePricing && (
                    <div className="space-y-6 pt-6 border-t border-neutral-800/80">
                        <div>
                            <label htmlFor="collectionPrice" className="block text-sm font-medium text-neutral-300 mb-2">Collection Price</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral-400">$</span>
                                <input
                                    type="text"
                                    id="collectionPrice"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                        handleUpdate('price', e.target.value);
                                    }}
                                    className="w-full bg-neutral-900/60 border border-neutral-700/80 rounded-lg pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-green-500 transition-all duration-200 shadow-inner-soft"
                                    placeholder="49.99"
                                />
                            </div>
                        </div>
                        
                        <div>
                           <h4 className="block text-sm font-medium text-neutral-300 mb-2">License Type</h4>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button 
                                    onClick={() => setLicenseType('non-exclusive')} 
                                    className={`relative p-4 rounded-lg text-left transition-all duration-300 ${licenseType === 'non-exclusive' ? 'bg-gradient-to-r from-green-800/50 to-neutral-800 border-green-500 shadow-[0_0_10px_rgba(49,196,141,0.3)]' : 'bg-neutral-800/60 border-neutral-700/80 hover:border-neutral-600'} border`}>
                                    {licenseType === 'non-exclusive' && <CheckCircle size={20} className="absolute top-3 right-3 text-green-400" />}
                                    <h5 className="font-bold text-white">Non-Exclusive</h5>
                                    <p className="text-xs text-neutral-400 mt-1">Sell this collection to multiple customers. Good for broader reach.</p>
                                </button>
                                <button 
                                    onClick={() => setLicenseType('exclusive')} 
                                    className={`relative p-4 rounded-lg text-left transition-all duration-300 ${licenseType === 'exclusive' ? 'bg-gradient-to-r from-green-800/50 to-neutral-800 border-green-500 shadow-[0_0_10px_rgba(49,196,141,0.3)]' : 'bg-neutral-800/60 border-neutral-700/80 hover:border-neutral-600'} border`}>
                                    {licenseType === 'exclusive' && <CheckCircle size={20} className="absolute top-3 right-3 text-green-400" />}
                                     <h5 className="font-bold text-white">Exclusive</h5>
                                     <p className="text-xs text-neutral-400 mt-1">Sell to a single buyer, who then owns the rights.</p>
                                </button>
                           </div>
                        </div>

                        <div>
                            <label htmlFor="customLicense" className="block text-sm font-medium text-neutral-300 mb-2">Custom License (Optional)</label>
                            <label htmlFor="license-upload" className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-neutral-700/80 hover:border-green-500/50 hover:bg-neutral-800/50 rounded-lg p-4 transition-all">
                                <UploadCloud className="w-8 h-8 text-neutral-500 mb-2" />
                                {customLicense ? (
                                    <p className="text-sm text-green-400 font-semibold">{customLicense.name}</p>
                                ) : (
                                    <p className="text-sm font-semibold text-neutral-300">Upload PDF or DOC</p>
                                )}
                                <p className="text-xs text-neutral-500 mt-1">Attach your own licensing terms if needed.</p>
                            </label>
                            <input 
                                type="file"
                                id="license-upload"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>
                )}
            </div>

             {!enablePricing && (
                    <div className="text-center py-10 border-2 border-dashed border-neutral-800 rounded-lg bg-neutral-900/40">
                        <p className="text-neutral-300 font-semibold">Individual Track Pricing is Active</p>
                        <p className="text-sm text-neutral-400 mt-1">Pricing will be determined by each track's individual settings.</p>
                    </div>
                )}
        </div>
    );
};

export default CollectionStep3;
