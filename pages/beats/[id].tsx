import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { db } from '../../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { Play, Heart, Share2, Download, ArrowLeft, Music, ChevronUp, Mic2, Video, Copy, Signal, Radio } from 'lucide-react';
import BeatCard from '../../components/BeatCard';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import CommentsSection from '../../components/CommentsSection';

// --- Helper Components ---

const iconMap = {
    Copy: <Copy size={20} className="text-neutral-400"/>,
    Signal: <Signal size={20} className="text-neutral-400"/>,
    RadioTower: <Radio size={20} className="text-neutral-400"/>,
    Video: <Video size={20} className="text-neutral-400"/>,
    Mic2: <Mic2 size={20} className="text-neutral-400"/>,
};

const UsageTerms = ({ terms }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        {Array.isArray(terms) && terms.map((term, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 text-neutral-300"
            >
                <div className="w-5 h-5 flex-shrink-0 mt-0.5">{iconMap[term.icon]}</div>
                <span>{term.text}</span>
            </motion.div>
        ))}
    </div>
);

// --- Main Page Component ---

const BeatDetailPage = ({ track, creator, moreTracks, licenses, comments }) => {
    const router = useRouter();
    const [selectedLicense, setSelectedLicense] = useState(licenses.find(l => l.licenseType === 'premium') || licenses[0] || null);
    const [isTermsOpen, setIsTermsOpen] = useState(true);
    const [publishedDate, setPublishedDate] = useState('');

    useEffect(() => {
        if (track.createdAt) {
            setPublishedDate(new Date(track.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
        }
    }, [track.createdAt]);

    if (router.isFallback) return <div className="h-screen w-full flex items-center justify-center text-white">Loading...</div>;

    const handleAddToCart = () => console.log('Added to cart:', selectedLicense);
    const handleNegotiate = () => console.log('Negotiating for:', selectedLicense);

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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-1 space-y-6">
                        <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80">
                            <div className="w-full aspect-square rounded-lg overflow-hidden relative group mb-4">
                                <img src={track.coverImage} alt={track.title} className="w-full h-full object-cover"/>
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="w-16 h-16 bg-green-500/80 text-black rounded-full flex items-center justify-center transform transition-transform hover:scale-110">
                                        <Play size={32} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-white">{track.title}</h1>
                            <p className="text-md text-neutral-400">by {creator?.displayName || 'Unknown Artist'}</p>
                            <div className="flex items-center justify-around text-neutral-400 my-4 py-2 border-y border-neutral-800">
                                <button className="flex flex-col items-center gap-1 hover:text-white"><Heart size={20}/> <span className="text-xs">{track.likes}</span></button>
                                <button className="flex flex-col items-center gap-1 hover:text-white"><Share2 size={20}/> <span className="text-xs">Share</span></button>
                                <button className="flex flex-col items-center gap-1 hover:text-white"><Download size={20}/> <span className="text-xs">Free</span></button>
                            </div>
                        </div>
                        <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80 text-sm">
                            <h3 className="font-bold text-white mb-4">Information</h3>
                            <div className="space-y-2 text-neutral-300">
                                <div className="flex justify-between"><span>Published:</span> <span>{publishedDate || '...'}</span></div>
                                <div className="flex justify-between"><span>BPM:</span> <span>{track.bpm}</span></div>
                                <div className="flex justify-between"><span>Key:</span> <span>{track.key}</span></div>
                                <div className="flex justify-between"><span>Plays:</span> <span>{track.plays}</span></div>
                            </div>
                             <h3 className="font-bold text-white mt-6 mb-3">Tags</h3>
                             <div className="flex flex-wrap gap-2">
                                {track.tags.map(tag => <span key={tag} className="text-xs bg-neutral-800 text-neutral-300 px-2 py-1 rounded">#{tag}</span>)}
                             </div>
                        </div>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-2 space-y-8">
                        <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800/80">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-white">Licensing</h2>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm text-neutral-400">TOTAL</p>
                                        <p className="text-xl font-bold text-white">${selectedLicense?.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex gap-2">
                                         {selectedLicense?.licenseType === 'exclusive' ? (
                                             <button onClick={handleNegotiate} className="px-6 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded-md">Negotiate</button>
                                         ) : (
                                            <>
                                                <button onClick={handleAddToCart} className="px-4 py-2 text-sm font-semibold bg-neutral-700 hover:bg-neutral-600 rounded-md">Add to Cart</button>
                                                <button onClick={() => {}} className="px-6 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded-md">Buy Now</button>
                                            </>
                                         )}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {licenses.map(license => (
                                    <button 
                                        key={license.licenseType}
                                        onClick={() => setSelectedLicense(license)}
                                        className={`p-4 rounded-lg text-left border-2 transition-all ${selectedLicense?.licenseType === license.licenseType ? 'border-green-500 bg-green-500/10' : 'border-neutral-700 hover:border-neutral-600'}`}
                                    >
                                        <h4 className="font-bold text-white capitalize">{license.licenseType} License</h4>
                                        <p className="text-sm text-neutral-300">${license.price.toFixed(2)}</p>
                                        <p className="text-xs text-neutral-400 mt-1">{license.files}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-neutral-900/50 rounded-2xl border border-neutral-800/80">
                            <button onClick={() => setIsTermsOpen(!isTermsOpen)} className="w-full flex justify-between items-center p-6">
                                <h2 className="text-xl font-bold text-white">Usage Terms</h2>
                                <ChevronUp size={20} className={`transition-transform ${!isTermsOpen && 'rotate-180'}`} />
                            </button>
                            <AnimatePresence>
                                {isTermsOpen && selectedLicense && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="px-6 pb-6">
                                            <UsageTerms terms={selectedLicense.usageTerms} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        <CommentsSection trackId={track.id} initialComments={comments} />

                        {moreTracks.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">More from {creator?.displayName}</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {moreTracks.map(t => <BeatCard key={t.id} beat={t} />)}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    const trackRef = doc(db, 'tracks', id);
    const trackSnap = await getDoc(trackRef);

    if (!trackSnap.exists()) return { notFound: true };
    
    const track = { id: trackSnap.id, ...trackSnap.data(), createdAt: trackSnap.data().createdAt?.toDate().toISOString() || null };

    let creator = null;
    if (track.creatorId) {
        const creatorRef = doc(db, 'users', track.creatorId);
        const creatorSnap = await getDoc(creatorRef);
        if (creatorSnap.exists()) creator = { id: creatorSnap.id, ...creatorSnap.data(), createdAt: null };
    }
    
    const licensesQuery = query(collection(db, 'tracks', id, 'licenses'), orderBy('price'));
    const licensesSnap = await getDocs(licensesQuery);
    const licenses = licensesSnap.docs.map(doc => doc.data());
    
    const commentsQuery = query(collection(db, 'tracks', id, 'comments'), orderBy('createdAt', 'desc'), limit(10));
    const commentsSnap = await getDocs(commentsQuery);
    const comments = await Promise.all(commentsSnap.docs.map(async (docSnap) => {
        const commentData = docSnap.data();
        let userData = null;
        if(commentData.userId) {
            const userRef = doc(db, 'users', commentData.userId);
            const userSnap = await getDoc(userRef);
            if(userSnap.exists()) userData = { displayName: userSnap.data().displayName, photoURL: userSnap.data().photoURL };
        }
        return { id: docSnap.id, ...commentData, user: userData, createdAt: commentData.createdAt?.toDate().toISOString() || null };
    }));
    
    const moreTracksQuery = query(collection(db, 'tracks'), where('creatorId', '==', track.creatorId), orderBy("createdAt", "desc"), limit(5));
    const moreTracksSnap = await getDocs(moreTracksQuery);
    const moreTracks = moreTracksSnap.docs
        .map(doc => ({
            id: doc.id,
            name: doc.data().title,
            artist: creator?.displayName || "Creator",
            price: doc.data().priceWav,
            cover: doc.data().coverImage,
        }))
        .filter(t => t.id !== id)
        .slice(0, 4);

    return {
        props: {
            track: JSON.parse(JSON.stringify(track)),
            creator: JSON.parse(JSON.stringify(creator)),
            licenses: JSON.parse(JSON.stringify(licenses)),
            comments: JSON.parse(JSON.stringify(comments)),
            moreTracks: JSON.parse(JSON.stringify(moreTracks)),
        },
    };
}

export default BeatDetailPage;
