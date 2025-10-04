import React from 'react';

const Shimmer = ({ className }: { className: string }) => (
  <div className={`relative overflow-hidden bg-neutral-800 rounded-lg ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
  </div>
);

const TopProducersShimmer = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-neutral-900/50 p-4 rounded-lg flex items-center gap-4">
        <Shimmer className="w-16 h-16 rounded-full" />
        <div className="space-y-2">
          <Shimmer className="h-4 w-24" />
          <Shimmer className="h-3 w-16" />
        </div>
      </div>
    ))}
  </div>
);

export default TopProducersShimmer;
