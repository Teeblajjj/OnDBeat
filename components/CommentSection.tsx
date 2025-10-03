
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { Send, UserCircle } from 'lucide-react';

export const CommentSection = ({ beatId, comments: initialComments, collectionName }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState(initialComments || []);
    const [newComment, setNewComment] = useState('');
    const [commentUserDetails, setCommentUserDetails] = useState({});

    useEffect(() => {
        const fetchCommentUserDetails = async () => {
            const userIds = comments.map(comment => comment.userId).filter(Boolean);
            const uniqueUserIds = [...new Set(userIds)];
            const userDetails = {};

            for (const userId of uniqueUserIds) {
                if (!commentUserDetails[userId]) { // Fetch only if not already fetched
                    const userRef = doc(db, 'users', userId);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        userDetails[userId] = userSnap.data();
                    }
                }
            }
            setCommentUserDetails(prevDetails => ({...prevDetails, ...userDetails}));
        };

        if (comments.length > 0) {
            fetchCommentUserDetails();
        }
    }, [comments]);

    const handleAddComment = async () => {
        if (!user || !newComment.trim()) return;

        const comment = {
            userId: user.uid,
            text: newComment.trim(),
            createdAt: new Date(),
        };

        const itemRef = doc(db, collectionName, beatId);
        try {
            await updateDoc(itemRef, {
                comments: arrayUnion(comment),
            });
            setComments([...comments, comment]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const formatTimeAgo = (date) => {
        if (!date) return '';
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "y ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "m ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m ago";
        return "just now";
    };

    return (
        <div className="mt-4 p-4 bg-[#202020] rounded-lg">
            <h4 className="text-lg font-bold text-white mb-3">Comments ({comments.length})</h4>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {[...comments].sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).map((comment, index) => {
                    const userDetail = commentUserDetails[comment.userId];
                    const commentDate = comment.createdAt?.toDate ? comment.createdAt.toDate() : new Date(comment.createdAt);
                    return (
                        <div key={index} className="flex items-start gap-3">
                            {userDetail?.photoURL ? (
                                <img src={userDetail.photoURL} alt={userDetail.displayName} className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                                <UserCircle size={32} className="text-neutral-500" />
                            )}
                            <div className="flex-1 bg-[#2a2a2a] p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-sm text-white">{userDetail?.displayName || 'Anonymous'}</p>
                                    <p className="text-xs text-neutral-400">
                                        {formatTimeAgo(commentDate)}
                                    </p>
                                </div>
                                <p className="text-sm text-neutral-300 mt-1">{comment.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {user && (
                <div className="mt-4 flex items-center gap-3">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                        placeholder="Add a comment..."
                        className="flex-grow bg-[#2a2a2a] border border-neutral-700 rounded-full py-2 px-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition"
                    />
                    <button 
                        onClick={handleAddComment} 
                        disabled={!newComment.trim()}
                        className="bg-green-600 hover:bg-green-500 text-white rounded-full p-2 disabled:bg-neutral-600 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};
