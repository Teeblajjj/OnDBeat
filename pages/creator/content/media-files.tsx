import Layout from '../../../components/Layout';
import { useState } from 'react';
import { Plus, Image as ImageIcon, Music, Video, File, MoreVertical, Trash2, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data for media files
const mockMediaFiles = [
    { id: '1', name: 'Cover Art v1.png', type: 'image', size: '2.5 MB', url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80' },
    { id: '2', name: 'Track Stems.zip', type: 'zip', size: '58 MB', url: '' },
    { id: '3', name: 'Music Video Final.mp4', type: 'video', size: '120 MB', url: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4' },
];

const MediaFileCard = ({ file }) => {
    const getIcon = () => {
        switch (file.type) {
            case 'image': return <ImageIcon size={32} className="text-neutral-400" />;
            case 'audio': return <Music size={32} className="text-neutral-400" />;
            case 'video': return <Video size={32} className="text-neutral-400" />;
            default: return <File size={32} className="text-neutral-400" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/60 rounded-2xl border border-neutral-800/80 p-4 flex flex-col group"
        >
            <div className="relative aspect-square w-full bg-neutral-800 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                {file.type === 'image' ? (
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                    getIcon()
                )}
            </div>
            <p className="font-semibold text-white text-sm truncate">{file.name}</p>
            <p className="text-xs text-neutral-400">{file.size}</p>
            <div className="mt-auto pt-4 flex justify-end gap-2">
                <button className="p-2 text-neutral-400 hover:text-white"><LinkIcon size={16} /></button>
                <button className="p-2 text-neutral-400 hover:text-red-500"><Trash2 size={16} /></button>
            </div>
        </motion.div>
    );
};

const MediaFilesPage = () => {
    const [mediaFiles, setMediaFiles] = useState(mockMediaFiles);

    return (
        <Layout>
            <div className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">My Media Files</h1>
                        <p className="text-neutral-400 mt-1">Manage your cover art, audio, and other files.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors mt-4 md:mt-0">
                        <Plus size={18} /> Upload File
                    </button>
                </div>

                {mediaFiles.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {mediaFiles.map((file, index) => (
                            <MediaFileCard key={file.id} file={file} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-neutral-900/50 rounded-2xl border-2 border-dashed border-neutral-800"
                    >
                        <ImageIcon size={48} className="mx-auto text-neutral-600 mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">No media uploaded yet</h2>
                        <p className="text-neutral-400 mb-6">Upload your first file to get started.</p>
                        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-5 rounded-lg transition-colors mx-auto">
                            <Plus size={18} /> Upload File
                        </button>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
};

export default MediaFilesPage;
