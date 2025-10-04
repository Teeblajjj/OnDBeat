import React from 'react';
import { motion } from 'framer-motion';
import { Music, MessageSquare, Heart, UserPlus } from 'lucide-react';
import Link from 'next/link';

const mockNotifications = [
  { id: 1, type: 'new_beat', text: 'Miracle beats just dropped a new beat "Starlight"', time: '2 hours ago', icon: <Music size={20} className="text-green-500" /> },
  { id: 2, type: 'new_comment', text: 'John Doe commented on your beat "Cosmic Drift"', time: '5 hours ago', icon: <MessageSquare size={20} className="text-blue-500" /> },
  { id: 3, type: 'new_like', text: 'Jane Doe liked your beat "Future Funk"', time: '1 day ago', icon: <Heart size={20} className="text-red-500" /> },
  { id: 4, type: 'new_follower', text: 'Metro Boomin started following you', time: '2 days ago', icon: <UserPlus size={20} className="text-purple-500" /> },
];

const NotificationDropdown = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute top-16 right-0 w-80 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg z-50 overflow-hidden"
    >
      <div className="p-4 border-b border-neutral-800">
        <h3 className="font-bold text-white">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {mockNotifications.map(notif => (
          <div key={notif.id} className="flex items-start gap-4 p-4 hover:bg-neutral-800/60 transition-colors cursor-pointer">
            <div className="mt-1">{notif.icon}</div>
            <div>
              <p className="text-sm text-white">{notif.text}</p>
              <p className="text-xs text-neutral-500 mt-1">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/user/notifications-all" passHref legacyBehavior>
        <a className="block text-center p-3 bg-neutral-800/50 hover:bg-neutral-700/80 text-sm font-semibold text-green-500 transition-colors">
          View All Notifications
        </a>
      </Link>
    </motion.div>
  );
};

export default NotificationDropdown;
