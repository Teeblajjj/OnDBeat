import Layout from '../../../components/Layout';
import { motion } from 'framer-motion';
import { Play, Shuffle, MoreHorizontal, Trash2, Image, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter

interface Track {
  id: string;
  title: string;
  artist: string;
  cover?: string; // Made cover optional
  duration: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  numberOfTracks: number;
  tracks: Track[];
}

// Mock Data for now (replace with Firestore later)
const mockPlaylist: Playlist = {
  id: '1',
  name: 'Chill Vibes',
  description: 'Relaxing beats for winding down.',
  cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
  numberOfTracks: 3,
  tracks: [
    { id: 't1', title: 'Sunset Breeze', artist: 'LoFi Dreams', cover: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80', duration: '3:24' },
    { id: 't2', title: 'Night Walk', artist: 'Synth Samurai', cover: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=800&q=80', duration: '4:10' },
    { id: 't3', title: 'Ocean Eyes', artist: 'Deep Focus', duration: '2:58' }, // No cover for this track
  ]
};

const PlaylistDetailPage = () => {
  const router = useRouter(); // Initialize useRouter
  const playlist = mockPlaylist;
  const [mainImageError, setMainImageError] = useState(false);

  const handleMainImageError = () => {
    setMainImageError(true);
  };

  return (
    <Layout>
      <div className="pb-10 text-white">
        {/* Back Button */}
        <div className="px-8 pt-6">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Playlists
          </button>
        </div>

        {/* Playlist Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-8 p-8 bg-gradient-to-b from-emerald-800 via-emerald-900 to-neutral-900 rounded-b-2xl shadow-lg mt-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-48 h-48 md:w-56 md:h-56 shrink-0 bg-neutral-900 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden"
          >
            {playlist.cover && !mainImageError ? (
              <img
                src={playlist.cover}
                alt={playlist.name}
                className="w-full h-full object-cover"
                onError={handleMainImageError}
              />
            ) : (
              <Image size={60} className="text-neutral-600" />
            )}
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl"
          >
            <p className="uppercase text-sm text-green-300 font-bold tracking-wider">Playlist</p>
            <h1 className="text-4xl md:text-6xl font-extrabold">{playlist.name}</h1>
            <p className="text-neutral-300 mt-2">{playlist.description}</p>
            <p className="text-sm mt-1">{playlist.numberOfTracks} tracks</p>
          </motion.div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 px-8 py-6">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2">
            <Play size={20} /> Play All
          </button>
          <button className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 px-6 rounded-full flex items-center gap-2">
            <Shuffle size={20} /> Shuffle
          </button>
        </div>

        {/* Track List */}
        <div className="px-8">
          <h2 className="text-xl font-bold mb-4">Tracks</h2>
          <div className="divide-y divide-neutral-800">
            {playlist.tracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between py-4 hover:bg-neutral-800/50 rounded-lg px-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 object-cover rounded-md flex-shrink-0 bg-neutral-900 flex items-center justify-center">
                    {track.cover ? (
                        <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                    ) : (
                        <Image size={24} className="text-neutral-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{track.title}</p>
                    <p className="text-sm text-neutral-400">{track.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-neutral-400">
                  <span>{track.duration}</span>
                  <button className="hover:text-white"><MoreHorizontal size={20} /></button>
                  <button className="hover:text-red-500"><Trash2 size={20} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlaylistDetailPage;