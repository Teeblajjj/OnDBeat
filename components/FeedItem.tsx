
import { Play, Pause, ShoppingCart, Heart, MessageCircle, Share2, MoreVertical, UserCircle, Music } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { CommentSection } from "./CommentSection";
import { AnimatedHeart } from "./AnimatedHeart";
import { AnimatePresence } from "framer-motion";
import ShareModal from "./ShareModal";

export const FeedItem = ({ item, collectionName }) => {
    const { playTrack, currentTrack, isPlaying } = usePlayer();
    const { user } = useAuth();

    const [timeAgo, setTimeAgo] = useState('');
    const [releaseDate, setReleaseDate] = useState('...');
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [showCommentSection, setShowCommentSection] = useState(false);
    const [animatedHearts, setAnimatedHearts] = useState([]);
    const [isShareModalOpen, setShareModalOpen] = useState(false);

    const producerName = item.producer?.displayName || "Unknown Artist";
    const producerHandle = item.producer?.displayName?.toLowerCase().replace(/\s/g, '') || "unknown";
    const producerAvatar = item.producer?.photoURL;

    useEffect(() => {
        const likes = item.likes;
        const isLegacyLikes = typeof likes === 'number';

        if (isLegacyLikes) {
            setLikeCount(likes);
            setIsLiked(false);
        } else if (Array.isArray(likes)) {
            setLikeCount(likes.length);
            setIsLiked(user ? likes.includes(user.uid) : false);
        } else {
            setLikeCount(0);
            setIsLiked(false);
        }
    }, [item.likes, user]);

    useEffect(() => {
        const createdAtDate = item.createdAt ? new Date(item.createdAt) : null;
        if (!createdAtDate) {
            setTimeAgo('some time');
            setReleaseDate('Unknown');
            return;
        }

        const timeSince = (date) => {
            const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
            if (seconds < 5) return "just now";
            let interval = seconds / 31536000;
            if (interval > 1) return Math.floor(interval) + "y";
            interval = seconds / 2592000;
            if (interval > 1) return Math.floor(interval) + "m";
            interval = seconds / 86400;
            if (interval > 1) return Math.floor(interval) + "d";
            interval = seconds / 3600;
            if (interval > 1) return Math.floor(interval) + "h";
            interval = seconds / 60;
            if (interval > 1) return Math.floor(interval) + "m";
            return Math.floor(seconds) + "s";
        };
        setTimeAgo(timeSince(createdAtDate));

        setReleaseDate(createdAtDate.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        }));
    }, [item.createdAt]);

    const handleAnimationComplete = (id) => {
        setAnimatedHearts((prev) => prev.filter((heart) => heart.id !== id));
    };

    const handleLike = async () => {
        if (!user) {
            console.log("You must be logged in to like an item.");
            return;
        }

        const itemRef = doc(db, collectionName, item.id);
        const isLegacyLikes = typeof item.likes === 'number';

        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);

        if (newIsLiked) {
            const newHearts = Array.from({ length: 5 }, (_, i) => ({ id: Date.now() + i }));
            setAnimatedHearts((prev) => [...prev, ...newHearts]);
        }

        try {
            if (newIsLiked) {
                if (isLegacyLikes) {
                    setLikeCount(1);
                    await updateDoc(itemRef, { likes: [user.uid] });
                } else {
                    setLikeCount(prev => prev + 1);
                    await updateDoc(itemRef, { likes: arrayUnion(user.uid) });
                }
            } else {
                setLikeCount(prev => prev - 1);
                await updateDoc(itemRef, { likes: arrayRemove(user.uid) });
            }
        } catch (error) {
            console.error("Error updating like status:", error);
            setIsLiked(!newIsLiked);
        }
    };

    return (
        <div className="bg-[#181818] border border-neutral-800 rounded-lg p-4 sm:p-6 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    {producerAvatar ? (
                        <img src={producerAvatar} alt={producerName} className="w-10 h-10 rounded-full object-cover"/>
                    ) : (
                        <UserCircle size={40} className="text-neutral-500" />
                    )}
                    <div>
                        <p className="font-bold text-white">{producerName} <span className="font-normal text-neutral-400 text-sm">@{producerHandle}</span></p>
                        <p className="text-sm text-neutral-500">{timeAgo} ago {item.isSponsored && <span className="text-xs text-neutral-500">• Sponsored</span>}</p>
                    </div>
                </div>
                <button className="text-neutral-400 hover:text-white">
                    <MoreVertical size={20} />
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
                 <Link href={`/beats/${item.id}`} legacyBehavior>
                    <a className="w-full sm:w-40 h-40 bg-neutral-800 rounded-md flex-shrink-0 flex items-center justify-center relative overflow-hidden cursor-pointer">
                        {item.coverImage ? (
                            <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                            <Music size={60} className="text-neutral-600" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </a>
                </Link>
                <div className="flex-grow">
                    <div className="flex items-center gap-3">
                        <button onClick={() => playTrack(item)} className="text-white bg-green-500/10 rounded-full p-2 hover:bg-green-500/20 transition-colors">
                            {currentTrack?.id === item.id && isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                        </button>
                         <Link href={`/beats/${item.id}`} legacyBehavior>
                            <a className="hover:underline">
                                <h3 className="text-xl sm:text-2xl font-bold text-white flex-grow">{item.title}</h3>
                            </a>
                        </Link>
                    </div>
                    <p className="text-neutral-400 mt-2">Released on {releaseDate}</p>
                    <p className="text-neutral-300 my-3 text-sm">{item.description}</p>
                    <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-all shadow-md hover:shadow-green-500/30">
                        <ShoppingCart size={16} />
                        <span>${item.priceWav || 'N/A'}</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-6 text-neutral-400 mt-4 pt-4 border-t border-neutral-800">
                <div className="relative">
                    <button onClick={handleLike} className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-green-400' : 'hover:text-green-400'}`}>
                       <Heart size={20} fill={isLiked ? "currentColor" : "none"} /> 
                       <span>{likeCount}</span>
                    </button>
                    <AnimatePresence>
                        {animatedHearts.map((heart) => (
                            <AnimatedHeart key={heart.id} id={heart.id} onAnimationComplete={handleAnimationComplete} />
                        ))}
                    </AnimatePresence>
                </div>
                <button onClick={() => setShowCommentSection(!showCommentSection)} className="flex items-center gap-2 hover:text-green-400 transition-colors">
                    <MessageCircle size={20} /> <span>{item.comments?.length || 0}</span>
                </button>
                <button onClick={() => setShareModalOpen(true)} className="flex items-center gap-2 hover:text-green-400 transition-colors">
                    <Share2 size={20} /> <span>{item.shares || 0}</span>
                </button>
            </div>

            {showCommentSection && <CommentSection beatId={item.id} comments={item.comments} collectionName={collectionName} />}
            <ShareModal item={item} isVisible={isShareModalOpen} onClose={() => setShareModalOpen(false)} />
        </div>
    );
};
