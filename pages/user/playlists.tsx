import Layout from '../../components/Layout';
import PlaylistCard from '../../components/PlaylistCard';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface Playlist {
  id: string;
  name: string;
  cover: string;
  numberOfTracks: number;
}

// Mock Data (replace later with Firestore data)
const mockPlaylists: Playlist[] = [
  { id: '1', name: 'Chill Vibes', cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80', numberOfTracks: 15 },
  { id: '2', name: 'Workout Bangers', cover: 'https://images.unsplash.com/photo-1557007787-8a719992c676?w=800&q=80', numberOfTracks: 22 },
  { id: '3', name: 'Late Night Drive', cover: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=800&q=80', numberOfTracks: 10 },
  { id: '4', name: 'Focus Zone', cover: 'https://images.unsplash.com/photo-1517677265842-87a02c3260d3?w=800&q=80', numberOfTracks: 18 },
  { id: '5', name: 'Summer Anthems', cover: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&q=80', numberOfTracks: 12 },
];

const PlaylistsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateModal = () => setIsModalOpen(true);
  const closeCreateModal = () => setIsModalOpen(false);

  return (
    <Layout>
      <div className="p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">My Playlists</h1>
          
        </div>

        {/* Playlist Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {/* Create New Playlist Card */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <button 
              onClick={openCreateModal}
              className="w-full h-full flex flex-col items-center justify-center bg-neutral-800/60 hover:bg-neutral-700/80 p-6 rounded-2xl border-2 border-dashed border-neutral-700 hover:border-green-500 transition-colors"
            >
              <Plus size={42} className="text-neutral-500 mb-2" />
              <span className="font-semibold text-white text-center">Create New Playlist</span>
            </button>
          </motion.div>

          {/* User Playlists */}
          {mockPlaylists.map((playlist) => (
            <motion.div
              key={playlist.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <PlaylistCard 
                playlist={playlist} 
                onEdit={() => console.log(`Edit ${playlist.name}`)} 
                onDelete={() => console.log(`Delete ${playlist.name}`)} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal Placeholder */}
      {/* 
      <PlaylistModal 
        isOpen={isModalOpen} 
        onClose={closeCreateModal} 
      /> 
      */}
    </Layout>
  );
};

export default PlaylistsPage;
