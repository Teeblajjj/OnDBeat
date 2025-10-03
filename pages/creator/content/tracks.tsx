import Layout from '../../../components/Layout';
import { useState } from 'react';
import { Plus, Music, MoreVertical, Edit, Trash2, Rocket, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock Data for tracks - replace with actual data from Firestore
const mockTracks = [
    { id: '1', title: 'Sunset Drive', plays: '1.2k', sales: 15, cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&q=80' },
    { id: '2', title: 'Ocean Eyes', plays: '890', sales: 8, cover: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=100&q=80' },
    { id: '3', title: 'City Lights', plays: '2.5k', sales: 22, cover: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80' },
];

const TracksPage = () => {
    const [tracks, setTracks] = useState(mockTracks);

    return (
        <Layout>
            <div className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">My Tracks</h1>
                        <p className="text-neutral-400 mt-1">Upload, manage, and organize your beats.</p>
                    </div>
                    <Link href="/creator/upload" passHref legacyBehavior>
                      <a className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors mt-4 md:mt-0">
                          <Plus size={18} /> Upload New Track
                      </a>
                    </Link>
                </div>

                {tracks.length > 0 ? (
                    <>
                        <div className="mb-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                <input 
                                    type="text"
                                    placeholder="Search your tracks..."
                                    className="w-full md:w-1/3 bg-neutral-800 border border-neutral-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <div className="bg-neutral-900/50 rounded-2xl border border-neutral-800/80 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-neutral-800/50">
                                    <tr>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">Track</th>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">Plays</th>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">Sales</th>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tracks.map((track, index) => (
                                        <motion.tr 
                                            key={track.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-neutral-800 hover:bg-neutral-800/30"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <img src={track.cover} alt={track.title} className="w-12 h-12 rounded-md object-cover" />
                                                    <span className="font-semibold text-white">{track.title}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-neutral-300">{track.plays}</td>
                                            <td className="p-4 text-neutral-300">{track.sales}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-neutral-400">
                                                    <button className="hover:text-white p-1"><Edit size={16} /></button>
                                                    <button className="hover:text-red-500 p-1"><Trash2 size={16} /></button>
                                                    <button className="hover:text-green-400 p-1"><Rocket size={16} /></button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-neutral-900/50 rounded-2xl border-2 border-dashed border-neutral-800"
                    >
                        <Music size={48} className="mx-auto text-neutral-600 mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">No tracks uploaded yet</h2>
                        <p className="text-neutral-400 mb-6">Start by uploading your first beat to get it heard.</p>
                        <Link href="/creator/upload" passHref legacyBehavior>
                          <a className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-5 rounded-lg transition-colors mx-auto">
                              <Plus size={18} /> Upload Your First Beat
                          </a>
                        </Link>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
};

export default TracksPage;
