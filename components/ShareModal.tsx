import React from 'react';
import { X, Link, Code, Facebook, Twitter } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const ShareModal = ({ item, isVisible, onClose }) => {
  if (!isVisible) return null;

  const fullUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/beats/${item.id}`
      : '';
  const shortUrl = `https://ond.beat/${item.id.slice(0, 6)}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: optional toast notification for feedback
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-[#181818] border border-neutral-800 rounded-2xl p-5 shadow-xl w-full max-w-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Share Track</h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Track info */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src={
                item.coverImage ||
                'https://placehold.co/64x64/181818/22c55e?text=🎵'
              }
              alt={item.title}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold text-white text-sm">{item.title}</p>
              <p className="text-neutral-400 text-xs">
                {item.producer?.displayName || 'Anonymous'}
              </p>
            </div>
          </div>

          {/* Short URL */}
          <div>
            <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
              Marketplace Short URL
            </p>
            <div className="flex items-center bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2">
              <Link size={16} className="text-neutral-500 mr-2 flex-shrink-0" />
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="bg-transparent text-white text-sm w-full outline-none truncate"
              />
              <button
                onClick={() => copyToClipboard(shortUrl)}
                className="text-green-500 font-semibold text-xs hover:text-green-400 transition-colors ml-2"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Share Options */}
          <div className="flex items-center justify-center gap-5 mt-6">
            <div className="text-center">
              <button className="w-12 h-12 bg-neutral-800/60 hover:bg-neutral-700/80 rounded-full flex items-center justify-center mb-1 transition-colors">
                <Code size={22} className="text-white" />
              </button>
              <p className="text-neutral-300 text-xs font-medium">Embed</p>
            </div>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                fullUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center"
            >
              <button className="w-12 h-12 bg-[#1877F2] hover:bg-[#166ee1] rounded-full flex items-center justify-center mb-1 transition-colors">
                <Facebook size={22} className="text-white" />
              </button>
              <p className="text-neutral-300 text-xs font-medium">Facebook</p>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                fullUrl
              )}&text=${encodeURIComponent(item.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center"
            >
              <button className="w-12 h-12 bg-[#1DA1F2] hover:bg-[#1a91da] rounded-full flex items-center justify-center mb-1 transition-colors">
                <Twitter size={22} className="text-white" />
              </button>
              <p className="text-neutral-300 text-xs font-medium">X</p>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShareModal;
