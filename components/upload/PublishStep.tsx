import React from 'react';
import { Image, Music, Calendar, Eye, Star, Shield, DollarSign, Tag, Smile } from 'lucide-react';

const PublishStep = ({ assetType = 'Asset', data }) => {
    // Destructure `data` with defaults to prevent runtime errors if data is null or undefined
    const {
        coverArt,
        visibility = 'Public',
        releaseDate,
        featured = false,
        title = 'Untitled Collection',
        description = '',
        tags = [],
        moods = [],
        enablePricing = false,
        price = '0.00',
        licenseType = 'N/A',
        tracks = []
    } = data || {};

    const DetailItem = ({ icon, label, children }) => (
        <div className="flex items-start bg-neutral-900/50 p-3 rounded-lg border border-neutral-800/80">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-800/40 to-neutral-800 rounded-full flex items-center justify-center mr-4 shadow-inner-soft">
                {icon}
            </div>
            <div>
                <p className="font-semibold text-neutral-400 text-sm">{label}</p>
                <div className="text-white font-bold text-base">{children}</div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-white">Step 5: Review & Publish Your {assetType}</h2>
                <p className="text-sm text-neutral-400">This is a preview of how your collection will appear. Review all details before publishing.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Cover Art & Main Details */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="aspect-square w-full bg-neutral-900/60 rounded-xl overflow-hidden border border-neutral-800/80 shadow-lg">
                         {coverArt && coverArt.preview ? (
                            <img 
                                src={coverArt.preview}
                                alt="Collection Cover Art"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Image size={48} className="text-neutral-600"/>
                            </div>
                        )}
                    </div>
                    <div className="space-y-3">
                        <DetailItem icon={<Eye size={16} />} label="Visibility">
                            <span className="capitalize">{visibility}</span>
                        </DetailItem>
                        <DetailItem icon={<Calendar size={16} />} label="Release Date">
                            {releaseDate ? new Date(releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Immediate'}
                        </DetailItem>
                        {featured && (
                            <DetailItem icon={<Star size={16} className="text-yellow-400" />} label="Featured">
                                Yes, will be highlighted on profile
                            </DetailItem>
                        )}
                    </div>
                </div>

                {/* Right Column: Textual Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80">
                        <h3 className="text-3xl font-bold text-white">{title}</h3>
                        {description && <div className="prose prose-invert prose-sm text-neutral-300 mt-2" dangerouslySetInnerHTML={{ __html: description }}/>}
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                            <div className="flex items-center gap-2">
                                <Tag size={16} className="text-green-400"/>
                                <p className="text-sm font-semibold text-neutral-300">Tags:</p>
                            </div>
                            {tags.map(tag => <span key={tag} className="bg-green-600/30 text-green-200 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">{tag}</span>)}
                        </div>
                         <div className="flex flex-wrap items-center gap-3 mt-2">
                            <div className="flex items-center gap-2">
                                <Smile size={16} className="text-teal-400"/>
                                <p className="text-sm font-semibold text-neutral-300">Moods:</p>
                            </div>
                            {moods.map(mood => <span key={mood} className="bg-teal-600/30 text-teal-200 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">{mood}</span>)}
                        </div>
                    </div>

                    <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80">
                         <h4 className="font-semibold text-lg mb-4 text-white">Pricing & Licensing</h4>
                         {enablePricing ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DetailItem icon={<DollarSign size={18} />} label="Collection Price">
                                    ${price}
                                </DetailItem>
                                <DetailItem icon={<Shield size={18} />} label="License Type">
                                    <span className="capitalize">{licenseType}</span>
                                </DetailItem>
                            </div>
                         ) : (
                            <p className="text-neutral-400 text-sm">Individual track pricing is active. Each track will be sold based on its own licensing settings.</p>
                         )}
                    </div>

                    <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80">
                        <h4 className="font-semibold text-lg mb-4 text-white">Tracks ({tracks.length})</h4>
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 -mr-2 styled-scrollbar">
                            {tracks.length > 0 ? tracks.map((track) => (
                                <div key={track.id} className="flex items-center gap-4 bg-neutral-800/60 p-2.5 rounded-lg border border-neutral-700/60 hover:border-green-600/50 transition-colors">
                                    <img src={track.cover || 'https://placehold.co/100x100/121212/1DB954?text=O'} alt={track.title} className="w-12 h-12 rounded-md object-cover" />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-white">{track.title}</p>
                                        <p className="text-xs text-neutral-400">{track.duration || '3:00'}</p>
                                    </div>
                                    <p className="text-xs font-medium bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">{track.license || 'Basic'}</p>
                                </div>
                            )) : (
                                <div className="text-center py-8">
                                    <Music size={32} className="text-neutral-600 mx-auto"/>
                                    <p className="text-neutral-500 text-sm mt-2">No tracks have been added to this collection yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublishStep;
