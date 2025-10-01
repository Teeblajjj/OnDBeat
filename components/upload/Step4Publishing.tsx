import { useState } from 'react';
import { Plus, X, User } from 'lucide-react';

const proOrganizations = ['ASCAP', 'BMI', 'SOCAN', 'PRS', 'Other'];

const Step4_Publishing = () => {
    // Assuming producer's name is fetched from a user profile context
    const [displayName, setDisplayName] = useState('ProducerName'); 
    const [tagline, setTagline] = useState('Prod. by ProducerName');
    const [pro, setPro] = useState('');
    const [ipiNumber, setIpiNumber] = useState('');
    const [splits, setSplits] = useState([{ name: 'ProducerName (You)', percentage: 100, locked: true }]);
    const [newSplitName, setNewSplitName] = useState('');
    const [newSplitPercentage, setNewSplitPercentage] = useState('');

    const updateSplit = (index, field, value) => {
        const newSplits = [...splits];
        let newPercentage = value;

        if (field === 'percentage') {
            newPercentage = Math.max(0, Math.min(100, Number(value)));
            const remainingPercentage = 100 - newSplits.filter((_, i) => i !== index && !newSplits[i].locked).reduce((sum, s) => sum + s.percentage, 0) - newPercentage;
            const lockedPercentage = newSplits.find(s => s.locked)?.percentage ?? 0;

            // Auto-adjust the main producer's share
            const producerIndex = newSplits.findIndex(s => s.locked);
            if (producerIndex !== -1) {
                 const otherSplitsTotal = newSplits.reduce((total, s, i) => i === producerIndex || i === index ? total : total + s.percentage, 0);
                 newSplits[producerIndex].percentage = 100 - otherSplitsTotal - newPercentage;
            }
        }
        
        newSplits[index][field] = newPercentage;
        setSplits(newSplits);
    };

    const addSplit = () => {
        if(newSplitName && newSplitPercentage) {
            const percentage = Math.max(0, Math.min(100, Number(newSplitPercentage)));
            const newSplits = [...splits, { name: newSplitName, percentage: percentage }];
            setNewSplitName('');
            setNewSplitPercentage('');

            // Recalculate main producer's share
             const producerIndex = newSplits.findIndex(s => s.locked);
            if (producerIndex !== -1) {
                const otherSplitsTotal = newSplits.reduce((total, s, i) => i === producerIndex ? total : total + s.percentage, 0);
                newSplits[producerIndex].percentage = 100 - otherSplitsTotal;
            }

            setSplits(newSplits);
        }
    }

    const removeSplit = (indexToRemove) => {
        const newSplits = splits.filter((_, index) => index !== indexToRemove);
        // Recalculate main producer's share
        const producerIndex = newSplits.findIndex(s => s.locked);
        if (producerIndex !== -1) {
            const otherSplitsTotal = newSplits.reduce((total, s, i) => i === producerIndex ? total : total + s.percentage, 0);
            newSplits[producerIndex].percentage = 100 - otherSplitsTotal;
        }
        setSplits(newSplits);
    }
    
    const totalPercentage = splits.reduce((sum, s) => sum + s.percentage, 0);

    return (
        <div className="space-y-8">
            {/* Display Name & Tagline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-neutral-300 mb-2">Producer Display Name</label>
                    <input type="text" id="displayName" value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full bg-neutral-800 border-transparent rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                    <label htmlFor="tagline" className="block text-sm font-medium text-neutral-300 mb-2">Producer Tagline</label>
                    <input type="text" id="tagline" value={tagline} onChange={e => setTagline(e.target.value)} placeholder="e.g., Prod. by XYZ" className="w-full bg-neutral-800 border-transparent rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-green-500"/>
                </div>
            </div>

            {/* PRO Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="pro" className="block text-sm font-medium text-neutral-300 mb-2">PRO Organization</label>
                    <select id="pro" value={pro} onChange={e => setPro(e.target.value)} className="w-full bg-neutral-800 border-transparent rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-green-500">
                        <option value="" disabled>Select your PRO</option>
                        {proOrganizations.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="ipiNumber" className="block text-sm font-medium text-neutral-300 mb-2">IPI/CAE Number</label>
                    <input type="text" id="ipiNumber" value={ipiNumber} onChange={e => setIpiNumber(e.target.value)} placeholder="Optional" className="w-full bg-neutral-800 border-transparent rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-green-500"/>
                </div>
            </div>

            {/* Splits */}
            <div>
                 <h3 className="text-lg font-semibold mb-3">Splits</h3>
                 <div className="space-y-3">
                     {splits.map((split, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-neutral-800/50 rounded-lg">
                            <User className="text-neutral-400"/>
                            <input type="text" value={split.name} onChange={e => updateSplit(index, 'name', e.target.value)} className="flex-grow bg-transparent text-white focus:outline-none" disabled={split.locked}/>
                            <div className="flex items-center gap-2">
                                <input type="number" value={split.percentage} onChange={e => updateSplit(index, 'percentage', e.target.value)} className="w-20 bg-neutral-700 rounded p-2 text-center text-white" disabled={split.locked}/>
                                <span className="text-neutral-400">%</span>
                            </div>
                           {!split.locked && <button onClick={() => removeSplit(index)} className="text-red-500 hover:text-red-400"><X size={18}/></button>}
                        </div>
                     ))}
                 </div>

                 {/* Add new split form */}
                 <div className="mt-4 pt-4 border-t border-neutral-800 flex items-end gap-4">
                      <div className="flex-grow">
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Collaborator Name</label>
                        <input type="text" value={newSplitName} onChange={e => setNewSplitName(e.target.value)} placeholder="Collaborator's Name or ID" className="w-full bg-neutral-800 border-transparent rounded-md px-3 py-2 text-white placeholder-neutral-500"/>
                      </div>
                       <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Percentage</label>
                         <input type="number" value={newSplitPercentage} onChange={e => setNewSplitPercentage(e.target.value)} placeholder="e.g., 50" className="w-24 bg-neutral-800 border-transparent rounded-md px-3 py-2 text-white placeholder-neutral-500"/>
                      </div>
                      <button onClick={addSplit} className="bg-green-500/80 hover:bg-green-500 h-10 px-4 rounded-lg flex items-center gap-2 font-semibold">
                        <Plus size={16}/> Add
                      </button>
                 </div>

                 {totalPercentage !== 100 && (
                     <p className="text-red-500 text-sm mt-3">Total splits must add up to 100%. Current total: {totalPercentage}%</p>
                 )}
            </div>

        </div>
    )
}

export default Step4_Publishing;