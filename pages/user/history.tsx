import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Home, Music, ShoppingCart, DollarSign, User, Activity } from 'lucide-react';

// Mock user role
const isCreator = false;

// Base mock data
const allActivities = [
    { type: 'Listening', title: 'Listened to \"Sunset Drive\" by Metro Boomin', time: '2 hours ago', details: 'Played for 3:15' },
    { type: 'Purchase', title: 'Purchased \"City Lights\" by The Weeknd', time: '1 day ago', details: '$29.99 - Basic License' },
    { type: 'Sale', title: 'Sale of \"Desert Rose\"', time: '3 days ago', details: 'Earned $14.99 - Commission' },
    { type: 'Profile', title: 'Updated your profile bio', time: '5 days ago', details: '' },
    { type: 'Listening', title: 'Listened to \"Forest Gump\" by Frank Ocean', time: '1 week ago', details: 'Played for 4:55' },
    { type: 'Purchase', title: 'Purchased Sound Kit \"Producer Essentials Vol. 3\"', time: '2 weeks ago', details: '$49.99' },
    { type: 'Sale', title: 'Payout of $150.00 processed', time: '1 month ago', details: 'To your Stripe account' },
];

// Filter activities based on user role
const userActivities = isCreator ? allActivities : allActivities.filter(a => a.type !== 'Sale');

const ActivityIcon = ({ type }) => {
    switch (type) {
        case 'Listening': return <Music className="w-5 h-5 text-blue-400" />;
        case 'Purchase': return <ShoppingCart className="w-5 h-5 text-green-400" />;
        case 'Sale': return <DollarSign className="w-5 h-5 text-yellow-400" />;
        case 'Profile': return <User className="w-5 h-5 text-purple-400" />;
        default: return <Activity className="w-5 h-5 text-neutral-400" />;
    }
};

const HistoryPage = () => {
    const router = useRouter();
    const [filter, setFilter] = useState('All');

    const allTabs = ['All', 'Listening', 'Purchase', 'Sale', 'Profile'];
    const tabs = isCreator ? allTabs : allTabs.filter(tab => tab !== 'Sale');

    const filteredActivities = userActivities.filter(activity => 
        filter === 'All' || activity.type === filter
    );

    return (
        <>
            <Head>
                <title>Activity History | ONDBEAT</title>
            </Head>
            <div className="min-h-screen bg-[#121212] text-white p-4 sm:p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Navigation */}
                    <div className="flex items-center gap-6 mb-8">
                        <button onClick={() => router.back()} className="flex items-center gap-2 text-neutral-400 hover:text-white font-medium transition-colors">
                            <ArrowLeft size={20} />
                            Back
                        </button>
                        <Link href="/" legacyBehavior>
                            <a className="flex items-center gap-2 text-neutral-400 hover:text-white font-medium transition-colors">
                                <Home size={20} />
                                Home
                            </a>
                        </Link>
                    </div>

                    {/* Header */}
                    <header className="mb-10">
                        <h1 className="text-3xl font-bold">Activity Monitor</h1>
                        <p className="text-neutral-400 mt-1">A log of your recent activities on the platform.</p>
                    </header>

                    {/* Filter Tabs */}
                    <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
                        {tabs.map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                                    filter === tab 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-[#1a1a1a] border border-neutral-800 hover:bg-neutral-800'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Activity Timeline */}
                    <div className="space-y-6">
                        {filteredActivities.map((activity, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="mt-1 flex-shrink-0 w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700">
                                    <ActivityIcon type={activity.type} />
                                </div>
                                <div className="flex-grow border-b border-neutral-800 pb-6">
                                    <div className="flex justify-between items-center">
                                        <p className="font-medium">{activity.title}</p>
                                        <span className="text-xs text-neutral-500 flex-shrink-0 ml-4">{activity.time}</span>
                                    </div>
                                    {activity.details && <p className="text-sm text-neutral-400 mt-1">{activity.details}</p>}
                                </div>
                            </div>
                        ))}
                        {filteredActivities.length === 0 && (
                            <div className="text-center py-16 bg-[#1a1a1a] border border-neutral-800 rounded-xl">
                                <Activity size={40} className="mx-auto text-neutral-600"/>
                                <h3 className="mt-4 text-xl font-semibold">No Activities Found</h3>
                                <p className="mt-1 text-neutral-400">There are no activities matching your filter.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistoryPage;
