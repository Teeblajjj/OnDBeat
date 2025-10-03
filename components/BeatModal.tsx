import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { X, ChevronUp, Mic2, Video, Copy, Signal, Radio, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/ModalContext';

const UsageTerms = ({ terms }) => {
    const formatNumber = (num) => new Intl.NumberFormat().format(num);
    const termDetails = {
        radioStations: { icon: <Radio size={20} className="text-neutral-400"/>, label: (val) => `Radio Broadcasting rights (${val === 'unlimited' ? 'Unlimited' : val} Station${val !== 1 ? 's' : ''})` },
        musicVideos: { icon: <Video size={20} className="text-neutral-400"/>, label: (val) => `${val === 'unlimited' ? 'Unlimited' : val} Music Video${val !== 1 ? 's' : ''}` },
        livePerformances: { icon: <Users size={20} className="text-neutral-400"/>, label: () => `For Profit Live Performances` },
        distributionCopies: { icon: <Copy size={20} className="text-neutral-400"/>, label: (val) => `Distribute up to ${val === 'unlimited' ? 'Unlimited' : formatNumber(val)} copies` },
        audioStreams: { icon: <Signal size={20} className="text-neutral-400"/>, label: (val) => `${val === 'unlimited' ? 'Unlimited' : formatNumber(val)} Online Audio Streams` },
    };
    const displayOrder = ['radioStations', 'musicVideos', 'livePerformances', 'distributionCopies', 'audioStreams'];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {displayOrder.map((key, index) => {
                const value = terms[key];
                if (value === 0 || (value === false && key !== 'livePerformances')) return null;
                const detail = termDetails[key];
                if (!detail) return null;
                const isStrikethrough = key === 'livePerformances' && value === false;

                return (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 text-neutral-300"
                    >
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5">{detail.icon}</div>
                        <span className={isStrikethrough ? 'line-through text-neutral-500' : ''}>{detail.label(value)}</span>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default function BeatModal({ isOpen, beat, onClose }) {
    const { openModal } = useModal();
    const [licenses, setLicenses] = useState([]);
    const [selectedLicense, setSelectedLicense] = useState(null);
    const [isTermsOpen, setIsTermsOpen] = useState(true);

    useEffect(() => {
        const fetchLicenses = async () => {
            if (beat && isOpen) {
                const licensesQuery = query(collection(db, 'tracks', beat.id, 'licenses'));
                const licensesSnap = await getDocs(licensesQuery);
                const licensesData = licensesSnap.docs.map(doc => doc.data());
                const sortedLicenses = licensesData.sort((a, b) => {
                    if (a.price === null) return 1;
                    if (b.price === null) return -1;
                    return a.price - b.price;
                });
                setLicenses(sortedLicenses);
                setSelectedLicense(sortedLicenses.find(l => l.featured) || sortedLicenses[0] || null);
            }
        };
        fetchLicenses();
    }, [beat, isOpen]);

    if (!isOpen || !beat) return null;
    
    const handleNegotiate = () => {
        onClose(); // Close the current modal
        openModal('negotiation', { beat });
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
            <motion.div 
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-neutral-800 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-white">Choose Your License</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X size={28} /></button>
                </div>

                <div className="flex-grow p-6 space-y-6 overflow-y-auto">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-white">Select a License</h3>
                        {selectedLicense?.name.toLowerCase() === 'exclusive license' ? (
                            <button onClick={handleNegotiate} className="px-6 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded-md">Negotiate</button>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm text-neutral-400">TOTAL</p>
                                    <p className="text-xl font-bold text-white">{selectedLicense?.price ? `$${selectedLicense.price.toFixed(2)}` : '...'}</p>
                                </div>
                                <button className="px-6 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded-md">Buy Now</button>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {licenses.map(license => (
                            <button 
                                key={license.name}
                                onClick={() => setSelectedLicense(license)}
                                className={`relative p-4 rounded-lg text-left border-2 transition-all ${selectedLicense?.name === license.name ? 'border-green-500 bg-green-500/10' : 'border-neutral-700 hover:border-neutral-600'}`}
                            >
                                {license.featured && <div className="absolute top-[-10px] right-2 text-xs bg-green-500 text-black font-bold px-2 py-0.5 rounded-full shadow-lg">Featured</div>}
                                <h4 className="font-bold text-white capitalize">{license.name === 'Exclusive License' ? 'Exclusive Rights' : license.name}</h4>
                                <p className="text-sm text-neutral-300">{license.price ? `$${license.price.toFixed(2)}` : 'Negotiable'}</p>
                                <p className="text-xs text-neutral-400 mt-1">{Object.keys(license.files).filter(f => license.files[f]).join(', ').toUpperCase()}</p>
                            </button>
                        ))}
                    </div>
                    
                    <div className="bg-neutral-900/50 rounded-2xl border border-neutral-800/80">
                        <button onClick={() => setIsTermsOpen(!isTermsOpen)} className="w-full flex justify-between items-center p-6">
                            <h2 className="text-xl font-bold text-white">Usage Terms</h2>
                            <ChevronUp size={20} className={`transition-transform ${!isTermsOpen && 'rotate-180'}`} />
                        </button>
                        <AnimatePresence>
                            {isTermsOpen && selectedLicense && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                    <div className="px-6 pb-6">
                                        <UsageTerms terms={selectedLicense.usageTerms} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
