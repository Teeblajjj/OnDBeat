import Layout from '../../../components/Layout';
import { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import PlaylistCard from '../../../components/PlaylistCard'; // Reusing PlaylistCard for sound kits
import { motion } from 'framer-motion';

// Mock Data for sound kits - replace with actual data
const mockSoundKits = [
    { id: '1', name: 'Trap God Vol 1', numberOfTracks: 50, cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80' },
];

const SoundKitsPage = () => {
    const [soundKits, setSoundKits] = useState(mockSoundKits);

    return (
        <Layout>
            <div className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">My Sound Kits</h1>
                        <p className="text-neutral-400 mt-1">Sell your sample packs and drum kits.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors mt-4 md:mt-0">
                        <Plus size={18} /> Upload New Kit
                    </button>
                </div>

                {soundKits.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {soundKits.map((kit, index) => (
                            <motion.div
                                key={kit.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <PlaylistCard 
                                    playlist={kit}
                                    onEdit={() => console.log('Edit kit', kit.id)}
                                    onDelete={() => console.log('Delete kit', kit.id)}
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-neutral-900/50 rounded-2xl border-2 border-dashed border-neutral-800"
                    >
                        <Package size={48} className="mx-auto text-neutral-600 mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">You haven't uploaded any kits yet.</h2>
                        <p className="text-neutral-400 mb-6">Start selling your sample packs and drum kits today.</p>
                        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-5 rounded-lg transition-colors mx-auto">
                            <Plus size={18} /> Upload Your First Kit
                        </button>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
};

export default SoundKitsPage;
