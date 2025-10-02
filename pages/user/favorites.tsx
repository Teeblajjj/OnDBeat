import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import BeatCard from '../../components/BeatCard'; 

// Mock data for favorite beats - Replace with actual data from your context or API
const favoriteBeats = [
    { id: '1', name: 'Cloud City', artist: 'Beatle', price: 29.99, cover: 'https://images.unsplash.com/photo-1516442439369-dc83b33142d3?w=400&q=80' },
    { id: '2', name: 'Night Drive', artist: 'Rhythm Raider', price: 49.99, cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80' },
    { id: '3', name: 'Ocean Dreams', artist: 'Wavy', price: 19.99, cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80' },
    { id: '4', name: 'Tokyo Lights', artist: 'SynthSamurai', price: 39.99, cover: 'https://images.unsplash.com/photo-1534351829955-797b21ddb912?w=400&q=80' },
];

const FavoritesPage = () => {
    return (
        <Layout>
            <div className="p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">My Favorites</h1>
                    <p className="text-neutral-400">Your curated collection of top beats.</p>
                </div>

                <motion.div 
                    layout 
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                >
                    {favoriteBeats.map((beat, index) => (
                        <motion.div
                            key={beat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <BeatCard beat={beat} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </Layout>
    );
};

export default FavoritesPage;
