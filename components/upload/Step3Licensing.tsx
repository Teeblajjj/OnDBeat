import { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const defaultTiers = [
    {
        name: 'MP3 Lease',
        price: '29.99',
        distributionLimit: '5,000',
        files: '1 MP3',
        enabled: true,
    },
    {
        name: 'WAV Lease',
        price: '49.99',
        distributionLimit: '10,000',
        files: '1 WAV, 1 MP3',
        enabled: true,
    },
    {
        name: 'Trackout Lease',
        price: '99.99',
        distributionLimit: '25,000',
        files: 'Stems, 1 WAV, 1 MP3',
        enabled: true,
    },
    {
        name: 'Unlimited Lease',
        price: '199.99',
        distributionLimit: 'Unlimited',
        files: 'Stems, 1 WAV, 1 MP3',
        enabled: true,
    },
     {
        name: 'Exclusive',
        price: '499.99',
        distributionLimit: 'Unlimited',
        files: 'Stems, 1 WAV, 1 MP3',
        enabled: true,
        allowOffers: true,
    },
];

const ToggleSwitch = ({ enabled, onChange }) => (
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
);


const Step3_Licensing = () => {
    const [tiers, setTiers] = useState(defaultTiers);

    const handleTierChange = (index, field, value) => {
        const updatedTiers = [...tiers];
        updatedTiers[index][field] = value;
        setTiers(updatedTiers);
    };

    const addCustomTier = () => {
        setTiers([...tiers, {
            name: 'Custom License',
            price: '0.00',
            distributionLimit: '1,000',
            files: '1 MP3',
            enabled: true,
        }]);
    }

    return (
        <div className="space-y-6">
             <div>
                <h2 className="text-xl font-bold text-white">Licensing & Pricing</h2>
                <p className="text-sm text-neutral-400">Configure your licensing tiers. You can disable tiers you don’t want to offer.</p>
            </div>

            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden bg-neutral-900/50">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-neutral-800 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">License Tier</th>
                                <th className="px-5 py-3 border-b-2 border-neutral-800 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Price ($)</th>
                                <th className="px-5 py-3 border-b-2 border-neutral-800 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Distribution Limit</th>
                                <th className="px-5 py-3 border-b-2 border-neutral-800 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Files</th>
                                <th className="px-5 py-3 border-b-2 border-neutral-800 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Enabled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tiers.map((tier, index) => (
                                <tr key={index} className={`${!tier.enabled ? 'opacity-50' : ''}`}>
                                    <td className="px-5 py-5 border-b border-neutral-800 text-sm">
                                        <input type="text" value={tier.name} onChange={e => handleTierChange(index, 'name', e.target.value)} className="bg-transparent w-full focus:outline-none" disabled={!tier.enabled}/>
                                    </td>
                                    <td className="px-5 py-5 border-b border-neutral-800 text-sm">
                                        <input type="text" value={tier.price} onChange={e => handleTierChange(index, 'price', e.target.value)} className="bg-neutral-800 rounded px-2 py-1 w-24" disabled={!tier.enabled}/>
                                    </td>
                                    <td className="px-5 py-5 border-b border-neutral-800 text-sm">
                                         <input type="text" value={tier.distributionLimit} onChange={e => handleTierChange(index, 'distributionLimit', e.target.value)} className="bg-neutral-800 rounded px-2 py-1 w-32" disabled={!tier.enabled}/>
                                    </td>
                                    <td className="px-5 py-5 border-b border-neutral-800 text-sm">
                                        <p className="text-white whitespace-no-wrap">{tier.files}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-neutral-800 text-sm">
                                        <ToggleSwitch enabled={tier.enabled} onChange={() => handleTierChange(index, 'enabled', !tier.enabled)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>

            <div className="flex justify-between items-center mt-6">
                <button onClick={addCustomTier} className="border border-green-500/50 text-green-400 hover:bg-green-500/10 font-bold py-2 px-4 rounded-lg">
                    Add Custom License
                </button>

                <div className="flex items-center gap-3">
                    <label htmlFor="allow-offers" className="font-medium text-neutral-300">Allow offers for Exclusive</label>
                     <ToggleSwitch enabled={tiers.find(t => t.name === 'Exclusive')?.allowOffers ?? false} onChange={() => {
                         const exclusiveIndex = tiers.findIndex(t => t.name === 'Exclusive');
                         if(exclusiveIndex > -1) handleTierChange(exclusiveIndex, 'allowOffers', !tiers[exclusiveIndex].allowOffers);
                     }}/>
                    <div className="relative group">
                        <HelpCircle size={16} className="text-neutral-500"/>
                        <div className="absolute bottom-full mb-2 w-64 bg-neutral-800 text-white text-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Enabling this allows buyers to negotiate the price for an exclusive license.
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Step3_Licensing;