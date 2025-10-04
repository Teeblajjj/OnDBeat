import React from 'react';

const Shimmer = ({ className }: { className: string }) => (
  <div className={`relative overflow-hidden bg-neutral-800 rounded-lg ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
  </div>
);

const BeatModalShimmer = () => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-md">
    <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 h-64 md:h-auto">
        <Shimmer className="w-full h-full rounded-l-2xl" />
      </div>
      <div className="w-full md:w-2/3 p-6 flex flex-col">
        <div className="flex-grow overflow-y-auto">
          <Shimmer className="h-8 w-3/4 mb-2" />
          <Shimmer className="h-6 w-1/2 mb-6" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <Shimmer className="h-16 w-full" />
            <Shimmer className="h-16 w-full" />
            <Shimmer className="h-16 w-full" />
            <Shimmer className="h-16 w-full" />
          </div>

          <div className="space-y-4">
            <Shimmer className="h-24 w-full" />
            <Shimmer className="h-32 w-full" />
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center gap-4">
          <Shimmer className="h-12 w-full sm:w-1/2" />
          <Shimmer className="h-12 w-full sm:w-1/2" />
        </div>
      </div>
    </div>
  </div>
);

export default BeatModalShimmer;
