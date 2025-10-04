import React from 'react';

const Shimmer = ({ className }: { className: string }) => (
  <div className={`relative overflow-hidden bg-neutral-800 rounded-lg ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
  </div>
);

const DiscoverMoreShimmer = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="space-y-3">
        <Shimmer className="w-full h-40 rounded-lg" />
        <Shimmer className="h-4 w-3/4" />
        <Shimmer className="h-3 w-1/2" />
      </div>
    ))}
  </div>
);

export default DiscoverMoreShimmer;
