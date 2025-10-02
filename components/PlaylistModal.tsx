
import { X, UploadCloud, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlist?: any; // Pass existing playlist data for editing
}

const PlaylistModal = ({ isOpen, onClose, playlist }: PlaylistModalProps) => {
  if (!isOpen) return null;

  const [coverPreview, setCoverPreview] = useState(playlist?.cover || null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const isEditing = !!playlist;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="bg-[#181818] rounded-2xl w-full max-w-lg border border-neutral-800"
      >
        <div className="flex justify-between items-center p-6 border-b border-neutral-800">
          <h2 className="text-xl font-bold text-white">{isEditing ? 'Edit Playlist' : 'Create New Playlist'}</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form className="p-6 space-y-6">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 shrink-0">
              <label htmlFor="cover-upload" className="cursor-pointer group">
                <div className="relative w-full h-full rounded-lg border-2 border-dashed border-neutral-700 hover:border-green-500 transition-colors flex items-center justify-center">
                  {coverPreview ? (
                    <img src={coverPreview} alt="Playlist cover" className="w-full h-full object-cover rounded-md" />
                  ) : (
                    <div className="text-center">
                      <UploadCloud size={32} className="text-neutral-500 mx-auto" />
                      <span className="text-xs text-neutral-400 mt-1">Upload Cover</span>
                    </div>
                  )}
                </div>
              </label>
              <input id="cover-upload" type="file" className="hidden" accept="image/*" onChange={handleCoverChange} />
            </div>
            <div className="w-full space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-300 mb-1">Title</label>
                <input type="text" id="title" defaultValue={playlist?.name} className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-1">Description</label>
                <textarea id="description" rows={2} defaultValue={playlist?.description} className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"></textarea>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Add Tracks</h3>
            <div className="h-40 bg-neutral-900 rounded-lg border border-neutral-700 flex items-center justify-center">
                <p className="text-neutral-500">Track selection UI will be here.</p>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4 pt-4 border-t border-neutral-800">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-neutral-300 hover:text-white rounded-2xl">Cancel</button>
            <button type="submit" className="px-6 py-2 text-sm font-bold bg-green-500 text-black rounded-2xl hover:bg-green-600 transition-colors">
              {isEditing ? 'Save Changes' : 'Create Playlist'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PlaylistModal;
