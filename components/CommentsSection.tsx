import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase'; // Import db
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CommentsSection = ({ trackId, initialComments }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState(initialComments || []);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !user) return;

        setIsSubmitting(true);

        const newCommentObj = {
            text: newComment,
            userId: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            likeCount: 0,
            createdAt: new Date(), // Use client-side date for optimistic update
            parentId: null,
            replyCount: 0
        };

        try {
            // Optimistically update the UI
            setComments([newCommentObj, ...comments]);
            setNewComment('');

            // Submit to Firestore
            const commentsRef = collection(db, 'tracks', trackId, 'comments');
            await addDoc(commentsRef, {
                ...newCommentObj,
                createdAt: serverTimestamp(), // Replace client date with server timestamp
            });

        } catch (error) {
            console.error("Error adding comment: ", error);
            // Revert optimistic update on error
            setComments(comments); 
            alert("Sorry, there was an error posting your comment.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Comments ({comments.length})</h2>
            
            <form onSubmit={handleSubmitComment} className="flex items-start gap-4 mb-8">
                {user?.photoURL ? (
                    <img src={user.photoURL} alt="Your avatar" className="w-10 h-10 rounded-full object-cover"/>
                ) : (
                    <UserCircle size={40} className="text-neutral-500"/>
                )}
                <div className="relative w-full">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder={user ? "Add a comment..." : "You must be logged in to comment."}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        rows={2}
                        disabled={!user || isSubmitting}
                    />
                    <button type="submit" disabled={!user || !newComment.trim() || isSubmitting} className="absolute right-3 bottom-2 text-neutral-400 hover:text-green-400 disabled:opacity-50">
                        <Send size={20} />
                    </button>
                </div>
            </form>

            <div className="space-y-6">
                <AnimatePresence>
                    {comments.map((comment, index) => (
                        <motion.div 
                            key={comment.id || index} // Use index as a fallback key for optimistic update
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4"
                        >
                            {comment.user?.photoURL ? (
                                <img src={comment.user.photoURL} alt={comment.user.displayName} className="w-10 h-10 rounded-full object-cover"/>
                            ) : (
                                <UserCircle size={40} className="text-neutral-500"/>
                            )}
                            <div>
                                <p className="font-semibold text-white">{comment.user?.displayName || comment.displayName}</p>
                                <p className="text-neutral-300">{comment.text}</p>
                                <p className="text-xs text-neutral-500 mt-1">Just now</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {comments.length === 0 && (
                    <p className="text-neutral-500 text-center py-8">Be the first to comment on this track.</p>
                )}
            </div>
        </div>
    );
};

export default CommentsSection;
