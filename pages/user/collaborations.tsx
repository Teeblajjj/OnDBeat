import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GitMerge, Clock, CheckCircle, Users, ArrowLeft, Home, MessageSquare, MoreVertical } from 'lucide-react';
import Layout from '../../components/Layout';

const CollaborationItem = ({ collaboration }) => {
    const { from, avatar, track, status, time } = collaboration;

    const statusInfo = {
        pending: { icon: <Clock size={16} />, text: 'Pending', color: 'text-yellow-400' },
        'in-progress': { icon: <Users size={16} />, text: 'In Progress', color: 'text-blue-400' },
        completed: { icon: <CheckCircle size={16} />, text: 'Completed', color: 'text-green-400' },
    };

    const currentStatus = statusInfo[status];

    return (
        <div className="bg-neutral-900 border border-neutral-800/80 rounded-lg p-4 hover:bg-neutral-800/70 transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                     <img src={avatar} alt={`${from}'s avatar`} className="w-12 h-12 rounded-full object-cover" />
                     <div>
                        <p className="text-neutral-200">
                           Collaboration request for <span className="font-semibold text-white">"{track}"</span> with <span className="font-semibold text-white">{from}</span>.
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">{time}</p>
                         <div className={`flex items-center gap-2 mt-3 ${currentStatus.color}`}>
                            {currentStatus.icon}
                            <span className="text-sm font-medium">{currentStatus.text}</span>
                        </div>
                    </div>
                </div>
                <button className="text-neutral-500 hover:text-white">
                    <MoreVertical size={20} />
                </button>
            </div>
             <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t border-neutral-800/80">
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold bg-neutral-700/60 hover:bg-neutral-700 text-white rounded-md transition-colors">
                    <MessageSquare size={16} />
                    <span>Chat</span>
                </button>
                 {status === 'pending' && (
                     <button className="px-3 py-1.5 text-sm font-semibold bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-md transition-colors">
                        Accept
                    </button>
                )}
            </div>
        </div>
    );
};


const CollaborationsPage = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('all');

    const collaborations = [
        { id: 1, from: 'Dina Ayada', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&q=80', track: 'Sunset Groove', status: 'in-progress', time: 'Started 2 days ago' },
        { id: 2, from: 'Kee Nola', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80', track: 'Midnight City', status: 'pending', time: 'Received 5 hours ago' },
        { id: 3, from: 'DatBoiDJ', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', track: 'Ocean Drive', status: 'completed', time: 'Finished last week' },
        { id: 4, from: 'Side Effects', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80', track: 'Retro Waves', status: 'pending', time: 'Received yesterday' },
    ];

    const filteredCollaborations = collaborations.filter(c => {
        if (activeTab === 'all') return true;
        return c.status === activeTab;
    });

     const tabs = [
        { id: 'all', name: 'All' },
        { id: 'pending', name: 'Pending' },
        { id: 'in-progress', name: 'In Progress' },
        { id: 'completed', name: 'Completed' },
    ];


    return (
        <Layout>
            <Head>
                <title>Collaborations | ONDBEAT</title>
            </Head>
            <div className="max-w-6xl mx-auto p-4 sm:p-8">
                 <div className="flex justify-between items-center mb-8">
                     <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-neutral-800 transition-colors">
                            <ArrowLeft size={22} className="text-neutral-300" />
                        </button>
                        <h1 className="text-3xl font-bold text-white">Collaborations</h1>
                    </div>
                    <Link href="/" className="p-2 rounded-full hover:bg-neutral-800 transition-colors">
                        <Home size={22} className="text-neutral-300" />
                    </Link>
                </div>
                 <div className="border-b border-neutral-800 mb-6">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                         {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${ activeTab === tab.id ? 'border-green-500 text-green-400' : 'border-transparent text-neutral-400 hover:text-white hover:border-neutral-500' } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}>
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>


                <div className="space-y-4">
                    {filteredCollaborations.length > 0 ? (
                        filteredCollaborations.map(collab => (
                            <CollaborationItem key={collab.id} collaboration={collab} />
                        ))
                    ) : (
                         <div className="text-center py-16">
                            <GitMerge size={48} className="mx-auto text-neutral-600" />
                            <h3 className="mt-4 text-lg font-semibold text-white">No collaborations yet</h3>
                            <p className="mt-2 text-sm text-neutral-400">When you start or receive collaboration requests, they'll show up here.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CollaborationsPage;
