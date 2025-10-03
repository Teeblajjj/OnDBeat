import React, { useState, useEffect } from 'react';
import { X, Plus, Music } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const PlaylistModal = ({ track, isOpen, onClose }) => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && isOpen) {
      const fetchPlaylists = async () => {
        setLoading(true);
        const q = query(collection(db, 'playlists'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userPlaylists = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlaylists(userPlaylists);
        setLoading(false);
      };
      fetchPlaylists();
    }
  }, [user, isOpen]);

  const handleAddToPlaylist = async (playlistId) => {
    const playlistRef = doc(db, 'playlists', playlistId);
    await updateDoc(playlistRef, {
      tracks: arrayUnion(track.id)
    });
    // You might want to give some feedback to the user here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-6 shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Add to Playlist</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        {loading ? (
            <p className="text-neutral-400">Loading playlists...</p>
        ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
                {playlists.map(playlist => (
                    <button 
                        key={playlist.id} 
                        onClick={() => handleAddToPlaylist(playlist.id)}
                        className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-700/80 transition-colors text-left"
                    >
                        <div className="w-12 h-12 bg-neutral-800 rounded-md flex items-center justify-center">
                            <Music size={24} className="text-neutral-500" />
                        </div>
                        <div>
                            <p className="font-semibold text-white">{playlist.name}</p>
                            <p className="text-sm text-neutral-400">{playlist.tracks?.length || 0} tracks</p>
                        </div>
                    </button>
                ))}
                <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-700/80 transition-colors text-left">
                    <div className="w-12 h-12 bg-neutral-800 rounded-md flex items-center justify-center">
                        <Plus size={24} className="text-green-500" />
                    </div>
                    <p className="font-semibold text-white">Create New Playlist</p>
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistModal;
