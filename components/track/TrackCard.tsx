import React from 'react';
import { TrackUpload } from '../../lib/types';

interface TrackCardProps {
  track: TrackUpload;
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  return (
    <div className="border rounded-lg p-4">
      <img src={track.coverImage || 'https://via.placeholder.com/150'} alt={track.title} className="w-full h-48 object-cover mb-4" />
      <h3 className="font-bold">{track.title}</h3>
      <p className="text-sm text-gray-500">{track.genre}</p>
    </div>
  );
};

export default TrackCard;
