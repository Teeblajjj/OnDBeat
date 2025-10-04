import React from 'react';

const Shimmer = ({ className }: { className: string }) => (
  <div className={`relative overflow-hidden bg-neutral-800 rounded-lg ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
  </div>
);

const FeedItemShimmer = () => (
  <div className="bg-[#181818] border border-neutral-800 rounded-lg p-4 sm:p-6 shadow-lg">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <Shimmer className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Shimmer className="h-4 w-48" />
          <Shimmer className="h-3 w-32" />
        </div>
      </div>
    </div>
    <Shimmer className="w-full h-64 rounded-lg mb-4" />
    <div className="space-y-2">
      <Shimmer className="h-5 w-3/4" />
      <Shimmer className="h-4 w-1/2" />
    </div>
    <div className="flex items-center justify-between mt-4 text-sm text-neutral-400">
      <div className="flex gap-4">
        <Shimmer className="h-6 w-16" />
        <Shimmer className="h-6 w-16" />
        <Shimmer className="h-6 w-16" />
      </div>
    </div>
  </div>
);

export default FeedItemShimmer;
