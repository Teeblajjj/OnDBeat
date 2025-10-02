import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import CampaignTargetingModal from '../../components/CampaignTargetingModal';
import BillingAddressFormModal from '../../components/BillingAddressFormModal';
import { motion } from 'framer-motion';
import { 
    DollarSign, Calendar, Info, CreditCard, Wallet, Plus, 
    ChevronDown, Globe, MapPin, Tag, CheckCircle, AlertTriangle, User,
    Play, Disc, LayoutGrid, Rocket
} from 'lucide-react';

// Mock Data (replace with actual Firestore fetches)
const mockBeats = [
    { id: 'beat1', name: 'Sunset Drive', artist: 'Metro Boomin', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80' },
    { id: 'beat2', name: 'Ocean Eyes', artist: 'Billie Eilish', cover: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&q=80' },
];
const mockCollections = [
    { id: 'col1', name: 'Vintage Drum Kit', creator: 'ProDucer', cover: 'https://images.unsplash.com/photo-1519791401344-934d47190779?w=400&q=80' },
    { id: 'col2', name: 'Chill LoFi Pack', creator: 'Beat Weaver', cover: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&q=80' },
];
const mockSoundkits = [
    { id: 'skit1', name: 'Trap God Vol 1', creator: 'Sound Architect', cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80' },
];

const mockBillingAddress = {
    line1: '123 Music Lane',
    city: 'Melodyville',
    state: 'CA',
    zip: '90210',
    country: 'USA'
};

const mockPaymentMethods = [
    { id: 'pm_1', type: 'card', last4: '4242', brand: 'visa' },
    { id: 'pm_2', type: 'wallet', balance: 250.75 }
];

const FormSection = ({ title, children }) => (
    <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const CreateCampaignPage = () => {
    const [campaignTitle, setCampaignTitle] = useState('');
    const [promotionType, setPromotionType] = useState<string | null>(null);
    const [promotedItemId, setPromotedItemId] = useState<string | null>(null);
    const [dailyBudget, setDailyBudget] = useState<number>(10);
    const [continuous, setContinuous] = useState(true);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [targeting, setTargeting] = useState({ global: true, userType: 'both', keywords: [], locations: [], interests: [] });
    const [billingAddress, setBillingAddress] = useState<any | null>(mockBillingAddress);
    const [paymentOption, setPaymentOption] = useState('wallet'); // 'wallet' or 'card'
    const [paymentMethodId, setPaymentMethodId] = useState<string | null>(mockPaymentMethods[0]?.id || null);
    
    const [isTargetingModalOpen, setTargetingModalOpen] = useState(false);
    const [isAddressModalOpen, setAddressModalOpen] = useState(false);

    const isFormValid = campaignTitle && promotionType && promotedItemId && paymentMethodId;

    const getPromotedItems = () => {
        switch (promotionType) {
            case 'BEAT': return mockBeats;
            case 'COLLECTION': return mockCollections;
            case 'SOUNDKIT': return mockSoundkits;
            default: return [];
        }
    };
    
    const calculateDuration = () => {
        if (continuous) return 'Continuous';
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return `${diffDays} days`;
        }
        return 'Not set';
    };

    const calculateTotalSpend = () => {
        const duration = calculateDuration();
        if (duration === 'Continuous' || duration === 'Not set') {
            return 'N/A';
        }
        const days = parseInt(duration.split(' ')[0]);
        return `$${(dailyBudget * days).toFixed(2)}`;
    };
    
    const handleCreateCampaign = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            alert('Please fill all required fields and add a payment method.');
            return;
        }

        const campaignData = {
            campaignTitle,
            promotionType,
            promotedItemId,
            dailyBudget,
            continuous,
            startDate: continuous ? null : startDate,
            endDate: continuous ? null : endDate,
            targeting,
            billingAddressId: billingAddress?.id, // assuming address object has an id
            paymentMethodId,
            status: 'draft',
            createdAt: new Date().toISOString(),
            // createdBy: currentUserId, // fetch from auth context
        };
        console.log('Creating campaign with data:', campaignData);
        // Here you would typically send this data to your Firestore backend
    };

    return (
        <Layout>
            <div className="p-4 md:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Create Campaign</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Form */}
                    <form onSubmit={handleCreateCampaign} className="lg:col-span-2 space-y-6">
                        <CampaignInfoSection 
                            title={campaignTitle}
                            setTitle={setCampaignTitle}
                            type={promotionType}
                            setType={setPromotionType}
                            itemId={promotedItemId}
                            setItemId={setPromotedItemId}
                            items={getPromotedItems()}
                        />
                        <BudgetSection
                            budget={dailyBudget}
                            setBudget={setDailyBudget}
                        />
                        <ScheduleSection
                            continuous={continuous}
                            setContinuous={setContinuous}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                        />
                        <TargetingSection onEdit={() => setTargetingModalOpen(true)} />
                        <BillingAndPaymentSection
                            address={billingAddress}
                            onEditAddress={() => setAddressModalOpen(true)}
                            paymentMethods={mockPaymentMethods}
                            selectedPaymentMethodId={paymentMethodId}
                            onSelectPaymentMethod={setPaymentMethodId}
                        />
                    </form>

                    {/* Right Column: Overview */}
                    <aside className="lg:col-span-1 sticky top-8">
                        <CampaignOverview
                            title={campaignTitle}
                            budget={dailyBudget}
                            duration={calculateDuration()}
                            totalSpend={calculateTotalSpend()}
                            isValid={isFormValid}
                        />
                    </aside>
                </div>
            </div>
            
            <CampaignTargetingModal 
                isOpen={isTargetingModalOpen} 
                onClose={() => setTargetingModalOpen(false)} 
                onSave={setTargeting}
                currentTargeting={targeting}
            />
            <BillingAddressFormModal
                isOpen={isAddressModalOpen}
                onClose={() => setAddressModalOpen(false)}
                onSave={setBillingAddress}
                currentAddress={billingAddress}
            />
        </Layout>
    );
};

// Sub-components for form sections
const CampaignInfoSection = ({ title, setTitle, type, setType, itemId, setItemId, items }) => {
    const getIconForType = (type) => {
        switch (type) {
            case 'BEAT': return <Play size={16} />;
            case 'COLLECTION': return <LayoutGrid size={16} />;
            case 'SOUNDKIT': return <Disc size={16} />;
            case 'PROFILE': return <User size={16} />;
            default: return null;
        }
    };

    return (
        <FormSection title="1. Campaign Basic Info">
            <div>
                <label htmlFor="campaignTitle" className="block text-sm font-medium text-neutral-300 mb-1">Campaign Title</label>
                <input
                    type="text"
                    id="campaignTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                    required
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="promotionType" className="block text-sm font-medium text-neutral-300 mb-1">Promotion Type</label>
                    <select
                        id="promotionType"
                        value={type || ''}
                        onChange={(e) => { setType(e.target.value); setItemId(null); }}
                        required
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                    >
                        <option value="" disabled>Select a type...</option>
                        <option value="BEAT">Beat</option>
                        <option value="COLLECTION">Collection</option>
                        <option value="SOUNDKIT">Sound Kit</option>
                        <option value="PROFILE">Profile</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="promotedItem" className="block text-sm font-medium text-neutral-300 mb-1">Promoted Item</label>
                    {type === 'PROFILE' ? (
                        <div className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-green-400 flex items-center gap-2">
                            <CheckCircle size={16} /> Your Profile
                        </div>
                    ) : (
                        <select
                            id="promotedItem"
                            value={itemId || ''}
                            onChange={(e) => setItemId(e.target.value)}
                            required
                            disabled={!type}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none disabled:opacity-50"
                        >
                            <option value="" disabled>Select an item...</option>
                            {items.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>
        </FormSection>
    );
};

const BudgetSection = ({ budget, setBudget }) => (
    <FormSection title="2. Daily Budget">
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2">
                <DollarSign size={16} className="text-green-400" />
                <input
                    type="number"
                    min="5"
                    max="30"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-16 bg-transparent text-white font-bold text-center focus:outline-none"
                />
            </div>
        </div>
        <p className="text-xs text-neutral-500 flex items-center gap-1.5"><Info size={14}/> Your maximum daily budget may increase over time.</p>
    </FormSection>
);

const ScheduleSection = ({ continuous, setContinuous, startDate, setStartDate, endDate, setEndDate }) => (
    <FormSection title="3. Schedule and Duration">
        <div className="flex items-center gap-4">
            <label className="flex items-center cursor-pointer">
                <input type="radio" name="schedule" checked={continuous} onChange={() => setContinuous(true)} className="form-radio text-green-500 bg-neutral-800 border-neutral-700" />
                <span className="ml-2 text-neutral-300">Run continuously</span>
            </label>
            <label className="flex items-center cursor-pointer">
                <input type="radio" name="schedule" checked={!continuous} onChange={() => setContinuous(false)} className="form-radio text-green-500 bg-neutral-800 border-neutral-700" />
                <span className="ml-2 text-neutral-300">Set start and end dates</span>
            </label>
        </div>
        {!continuous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-neutral-300 mb-1">Start Date</label>
                    <input type="datetime-local" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-neutral-300 mb-1">End Date</label>
                    <input type="datetime-local" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white" />
                </div>
            </div>
        )}
    </FormSection>
);

const TargetingSection = ({ onEdit }) => (
    <FormSection title="4. Targeting">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-neutral-300"><Globe size={16}/> Global Audience (Default)</div>
            <button type="button" onClick={onEdit} className="text-sm font-semibold text-green-400 hover:underline">Edit Audience</button>
        </div>
    </FormSection>
);

const BillingAndPaymentSection = ({ address, onEditAddress, paymentMethods, selectedPaymentMethodId, onSelectPaymentMethod }) => (
    <>
        <FormSection title="5. Billing Address">
            {address ? (
                <div className="flex justify-between items-center">
                    <p className="text-neutral-300">{address.line1}, {address.city}, {address.state}</p>
                    <button type="button" onClick={onEditAddress} className="text-sm font-semibold text-green-400 hover:underline">Edit</button>
                </div>
            ) : (
                <button type="button" onClick={onEditAddress} className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700/80 p-3 rounded-lg border-2 border-dashed border-neutral-700 hover:border-green-500 transition-colors">
                    <Plus size={18} /> Add Address
                </button>
            )}
        </FormSection>
        <FormSection title="6. Payment Method">
            {paymentMethods && paymentMethods.length > 0 ? (
                <div className="space-y-3">
                    {paymentMethods.map(pm => (
                        <label key={pm.id} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${selectedPaymentMethodId === pm.id ? 'border-green-500 bg-green-500/10' : 'border-neutral-700 hover:border-neutral-600'}`}>
                            <input type="radio" name="paymentMethod" value={pm.id} checked={selectedPaymentMethodId === pm.id} onChange={() => onSelectPaymentMethod(pm.id)} className="form-radio text-green-500 bg-neutral-800 border-neutral-700" />
                            <div className="ml-3 flex items-center gap-3">
                                {pm.type === 'card' ? <CreditCard size={20} /> : <Wallet size={20} />}
                                <span className="text-white font-medium">{pm.type === 'card' ? `Visa ending in ${pm.last4}` : `Wallet Balance: $${pm.balance.toFixed(2)}`}</span>
                            </div>
                        </label>
                    ))}
                </div>
            ) : (
                <div className="flex items-center gap-2 text-yellow-400 bg-yellow-500/10 p-3 rounded-lg">
                    <AlertTriangle size={20} />
                    <p className="text-sm">You need to add a payment method to your account before publishing a campaign.</p>
                </div>
            )}
        </FormSection>
    </>
);

const CampaignOverview = ({ title, budget, duration, totalSpend, isValid }) => (
    <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80">
        <h2 className="text-xl font-bold text-white mb-4">Campaign Overview</h2>
        <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-neutral-400">Campaign Title:</span> <span className="font-medium text-white truncate">{title || 'Not set'}</span></div>
            <div className="flex justify-between"><span className="text-neutral-400">Daily Budget:</span> <span className="font-medium text-white">${budget.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-neutral-400">Duration:</span> <span className="font-medium text-white">{duration}</span></div>
            <div className="border-t border-neutral-800 my-2"></div>
            <div className="flex justify-between text-base"><span className="text-neutral-400">Total Spend Estimate:</span> <span className="font-bold text-white">{totalSpend}</span></div>
            <div className="flex justify-between"><span className="text-neutral-400">Today's Spend:</span> <span className="font-medium text-white">$0.00</span></div>
        </div>
        <button 
            type="submit" 
            form="create-campaign-form" // This should match the form's id
            disabled={!isValid}
            className="w-full mt-6 bg-green-500 text-black font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Rocket size={18}/>
            Create Campaign
        </button>
    </div>
);


export default CreateCampaignPage;
