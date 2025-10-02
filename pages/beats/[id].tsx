import { useState } from 'react';
import Layout from '../../components/Layout';
import { db } from '../../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { Play, Heart, Share2, ShoppingCart, ArrowLeft, Music } from 'lucide-react';
import BeatCard from '../../components/BeatCard';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

// Dummy component for license selection
const LicenseSelector = ({ licenses, onAddToCart }) => (
    <div className="space-y-4">
        {licenses.map(license => (
            <div key={license.licenseType} className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700 flex justify-between items-center">
                <div>
                    <h4 className="font-bold text-white capitalize">{license.licenseType} License</h4>
                    <p className="text-sm text-neutral-400">{license.usageRights}</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-green-400">${license.price.toFixed(2)}</p>
                    <button onClick={() => onAddToCart(license)} className="text-sm text-white mt-1">Add to Cart</button>
                </div>
            </div>
        ))}
    </div>
);


const BeatDetailPage = ({ track, creator, moreTracks, licenses }) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <div className="p-4 md:p-8">
                <button 
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Cover Art & Details */}
                    <div className="lg:col-span-2">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col md:flex-row items-start gap-8 bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80"
                        >
                            <div className="w-full md:w-56 h-56 shrink-0 rounded-lg overflow-hidden relative">
                                {track.coverImage ? (
                                    <img src={track.coverImage} alt={track.title} className="w-full h-full object-cover"/>
                                ) : (
                                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                                        <Music size={60} className="text-neutral-600"/>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <button className="w-16 h-16 bg-green-500/80 text-black rounded-full flex items-center justify-center transform transition-transform hover:scale-110">
                                        <Play size={32} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <h1 className="text-3xl md:text-4xl font-bold text-white">{track.title}</h1>
                                <p className="text-lg text-neutral-300 mt-2">by <span className="font-semibold text-green-400">{creator?.displayName || 'Unknown Artist'}</span></p>
                                <div className="flex items-center gap-4 mt-4 text-sm text-neutral-400">
                                    <span>{track.genre}</span>
                                    <span>&bull;</span>
                                    <span>{track.bpm} BPM</span>
                                    <span>&bull;</span>
                                    <span>{track.key}</span>
                                </div>
                                <div className="flex items-center gap-4 mt-6">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"><Heart size={16}/> {track.likes}</button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"><Share2 size={16}/> Share</button>
                                </div>
                            </div>
                        </motion.div>

                        <div className="mt-8">
                             <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
                             <p className="text-neutral-300 whitespace-pre-line">{track.description}</p>
                        </div>
                    </div>

                    {/* Right Column: Licensing */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-8 bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80">
                            <h2 className="text-2xl font-bold text-white mb-4">Licensing</h2>
                            <LicenseSelector licenses={licenses} onAddToCart={(l) => console.log('Add to cart:', l)} />
                        </div>
                    </aside>
                </div>
                
                {/* More from this creator */}
                {moreTracks.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-white mb-6">More from {creator?.displayName || 'this artist'}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {moreTracks.map(t => <BeatCard key={t.id} beat={t} />)}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params;

    const trackRef = doc(db, 'tracks', id);
    const trackSnap = await getDoc(trackRef);

    if (!trackSnap.exists()) {
        return { notFound: true };
    }

    const track = {
        id: trackSnap.id,
        ...trackSnap.data(),
        createdAt: trackSnap.data().createdAt?.toDate().toISOString() || null,
    };

    let creator = null;
    if (track.creatorId) {
        const creatorRef = doc(db, 'users', track.creatorId);
        const creatorSnap = await getDoc(creatorRef);
        if (creatorSnap.exists()) {
            creator = {
                id: creatorSnap.id,
                ...creatorSnap.data(),
                createdAt: null,
            };
        }
    }
    
    // Fetch licenses from the subcollection
    const licensesQuery = query(collection(db, 'tracks', id, 'licenses'));
    const licensesSnap = await getDocs(licensesQuery);
    const licenses = licensesSnap.docs.map(doc => doc.data());

    // Fetch more tracks from the same creator, excluding the current one
    const moreTracksQuery = query(
        collection(db, 'tracks'), 
        where('creatorId', '==', track.creatorId),
        orderBy("createdAt", "desc"),
        limit(7) // Fetch one extra to filter out the current track
    );
    const moreTracksSnap = await getDocs(moreTracksQuery);
    const moreTracks = moreTracksSnap.docs
        .map(doc => ({
            id: doc.id,
            name: doc.data().title,
            artist: creator?.displayName || "Creator",
            price: doc.data().priceWav,
            cover: doc.data().coverImage,
        }))
        .filter(t => t.id !== id) // Exclude the current track
        .slice(0, 6); // Ensure we only have 6


    return {
        props: {
            track: JSON.parse(JSON.stringify(track)),
            creator: JSON.parse(JSON.stringify(creator)),
            licenses: JSON.parse(JSON.stringify(licenses)),
            moreTracks: JSON.parse(JSON.stringify(moreTracks)),
        },
    };
}


export default BeatDetailPage;
