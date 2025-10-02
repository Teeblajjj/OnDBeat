import { Play, MoreVertical, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface PlaylistCardProps {
  playlist: {
    id: string;
    name: string;
    cover: string;
    numberOfTracks: number;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const PlaylistCard = ({ playlist, onEdit, onDelete }: PlaylistCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="group bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
      <Link href={`/user/playlists/${playlist.id}`} legacyBehavior>
        <a className="block cursor-pointer">
          {/* Cover Section */}
          <div className="relative w-full aspect-square bg-neutral-800 overflow-hidden">
            {!imageError && playlist.cover ? (
              <img
                src={playlist.cover}
                alt={`${playlist.name} cover`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-neutral-900">
                <ImageIcon size={60} className="text-neutral-600" />
              </div>
            )}

            {/* Play Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300">
              <button className="p-3 bg-green-500 text-black rounded-full opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300">
                <Play size={22} fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Text Content */}
          <div className="p-3">
            <h3 className="text-white font-semibold text-sm truncate">{playlist.name}</h3>
            <p className="text-neutral-400 text-xs">{playlist.numberOfTracks} tracks</p>
          </div>
        </a>
      </Link>

      {/* Menu (Edit/Delete) */}
      {(onEdit || onDelete) && (
        <div className="absolute top-3 right-3">
          <button
            onClick={handleMenuToggle}
            className="text-neutral-400 hover:text-white p-1 bg-neutral-900/60 rounded-full"
          >
            <MoreVertical size={18} />
          </button>
          {menuOpen && (
            <div
              onMouseLeave={() => setMenuOpen(false)}
              className="absolute right-0 mt-2 w-40 bg-[#1e1e1e] border border-neutral-700 rounded-lg shadow-lg z-10"
            >
              {onEdit && (
                <button
                  onClick={() => {
                    onEdit(playlist.id);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
                >
                  <Edit size={16} /> Edit Playlist
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => {
                    onDelete(playlist.id);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={16} /> Delete Playlist
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaylistCard;
