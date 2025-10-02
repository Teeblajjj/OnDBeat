import Layout from '../../../components/Layout';
import { useState } from 'react';
import { Plus, Folder } from 'lucide-react';
import PlaylistCard from '../../../components/PlaylistCard'; // Reusing PlaylistCard for collections
import { motion } from 'framer-motion';

// Mock Data for collections - replace with actual data
const mockCollections = [
    { id: '1', name: 'Vintage Drum Kit', numberOfTracks: 15, cover: 'https://images.unsplash.com/photo-1519791401344-934d47190779?w=400&q=80' },
    { id: '2', name: 'Chill LoFi Pack', numberOfTracks: 22, cover: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&q=80' },
];

const CollectionsPage = () => {
    const [collections, setCollections] = useState(mockCollections);

    return (
        <Layout>
            <div className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">My Collections</h1>
                        <p className="text-neutral-400 mt-1">Group your beats into albums and bundles.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors mt-4 md:mt-0">
                        <Plus size={18} /> Create New Collection
                    </button>
                </div>

                {collections.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {collections.map((collection, index) => (
                            <motion.div
                                key={collection.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <PlaylistCard 
                                    playlist={collection} 
                                    onEdit={() => console.log('Edit collection', collection.id)}
                                    onDelete={() => console.log('Delete collection', collection.id)}
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
                        <Folder size={48} className="mx-auto text-neutral-600 mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">No collections yet</h2>
                        <p className="text-neutral-400 mb-6">Start by grouping your tracks into a collection.</p>
                        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-5 rounded-lg transition-colors mx-auto">
                            <Plus size={18} /> Create Your First Collection
                        </button>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
};

export default CollectionsPage;
