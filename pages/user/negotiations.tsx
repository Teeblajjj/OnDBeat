import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Handshake, Check, X, Eye, ArrowLeft, Home } from 'lucide-react';
import Layout from '../../components/Layout';

const NegotiationItem = ({ negotiation }) => {
    const { id, from, track, offer, status, time } = negotiation;

    const statusBadge = {
        pending: 'bg-yellow-500/20 text-yellow-400',
        accepted: 'bg-green-500/20 text-green-400',
        declined: 'bg-red-500/20 text-red-400',
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-neutral-900 border border-neutral-800/80 rounded-lg hover:bg-neutral-800/70 transition-colors">
            <div className="flex-grow">
                <div className="flex items-center gap-3">
                    <Handshake size={20} className="text-neutral-400" />
                    <p className="text-neutral-200">
                        <span className="font-semibold text-white">{from}</span> sent a negotiation offer for your track <span className="font-semibold text-white">"{track}"</span>.
                    </p>
                </div>
                <p className="text-sm text-neutral-400 mt-2 ml-8">Offer: <span className="font-semibold text-green-400">{offer}</span></p>
                <p className="text-xs text-neutral-500 mt-2 ml-8">{time}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-center">
                 <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusBadge[status]}`}>{status}</span>
                 <button className="p-2 rounded-full hover:bg-neutral-700 transition-colors" title="View Details">
                    <Eye size={18} />
                </button>
                {status === 'pending' && (
                    <>
                        <button className="p-2 rounded-full bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors" title="Accept">
                            <Check size={18} />
                        </button>
                        <button className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors" title="Decline">
                            <X size={18} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const NegotiationsPage = () => {
    const router = useRouter();

    const negotiations = [
        { id: 1, from: 'Soundwave Records', track: 'Cosmic Echoes', offer: '$5,000 for exclusive rights', status: 'pending', time: '2 hours ago' },
        { id: 2, from: 'SyncMaster Pro', track: 'Neon Dreams', offer: '$1,500 for a 1-year license', status: 'accepted', time: '1 day ago' },
        { id: 3, from: 'Global Music Group', track: 'Ocean Drive', offer: 'Feature in a commercial', status: 'declined', time: '3 days ago' },
        { id: 4, from: 'IndieVibes', track: 'Sunset Groove', offer: 'Collaboration on a new EP', status: 'pending', time: '5 days ago' },
    ];

    const [activeTab, setActiveTab] = useState('all');

    const filteredNegotiations = negotiations.filter(n => {
        if (activeTab === 'all') return true;
        return n.status === activeTab;
    });

    const tabs = [
        { id: 'all', name: 'All' },
        { id: 'pending', name: 'Pending' },
        { id: 'accepted', name: 'Accepted' },
        { id: 'declined', name: 'Declined' },
    ];


    return (
        <Layout>
            <Head>
                <title>Negotiations | ONDBEAT</title>
            </Head>
            <div className="max-w-6xl mx-auto p-4 sm:p-8">
                <div className="flex justify-between items-center mb-8">
                     <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-neutral-800 transition-colors">
                            <ArrowLeft size={22} className="text-neutral-300" />
                        </button>
                        <h1 className="text-3xl font-bold text-white">Negotiations</h1>
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
                    {filteredNegotiations.length > 0 ? (
                        filteredNegotiations.map(negotiation => (
                            <NegotiationItem key={negotiation.id} negotiation={negotiation} />
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <Handshake size={48} className="mx-auto text-neutral-600" />
                            <h3 className="mt-4 text-lg font-semibold text-white">No negotiations here</h3>
                            <p className="mt-2 text-sm text-neutral-400">When you receive new negotiation offers, they will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default NegotiationsPage;
