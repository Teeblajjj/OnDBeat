import { useState } from 'react';
import Layout from '../../components/Layout';
import Frame from '../../components/Frame';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Download, Award, ShieldCheck } from 'lucide-react';

// Mock Data - Replace with actual data fetching
const mockOrders = [
    { id: 'a2d4f', beat: 'Cosmic Drift', artist: 'StellarBeats', price: 29.99, status: 'Completed', date: '2023-10-26', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80' },
    { id: 'b5e8g', beat: 'Neon Dreams', artist: 'SynthWaveKid', price: 49.99, status: 'Completed', date: '2023-10-20', cover: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&q=80' },
    { id: 'c9f2h', beat: 'Future Funk', artist: 'GrooveBot', price: 19.99, status: 'Pending', date: '2023-10-28', cover: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
    { id: 'd3a6j', beat: 'Cybernetic Soul', artist: 'DataDiva', price: 79.99, status: 'Completed', date: '2023-09-15', cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80' },
];

const milestones = [
    { name: 'Bronze Collector', purchases: 1, icon: <Award size={24} className="text-yellow-500" /> },
    { name: 'Silver Collector', purchases: 5, icon: <Award size={24} className="text-slate-400" /> },
    { name: 'Gold Collector', purchases: 10, icon: <Award size={24} className="text-yellow-400" /> },
];

const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState('All');
    const userPurchases = mockOrders.filter(o => o.status === 'Completed').length;

    const filteredOrders = mockOrders.filter(order => {
        if (activeTab === 'All') return true;
        return order.status === activeTab;
    });

    const currentMilestone = milestones.slice().reverse().find(m => userPurchases >= m.purchases);
    const nextMilestone = milestones.find(m => userPurchases < m.purchases);
    const milestoneProgress = nextMilestone ? (userPurchases / nextMilestone.purchases) * 100 : 100;

    const getStatusClass = (status) => {
        switch (status) {
            case 'Completed': return 'text-green-400 bg-green-500/10';
            case 'Pending': return 'text-yellow-400 bg-yellow-500/10';
            default: return 'text-neutral-400 bg-neutral-500/10';
        }
    };

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row gap-8 p-8">
                {/* Main Content */}
                <div className="flex-grow">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">Your Orders</h1>
                        <p className="text-neutral-400">Track your purchases and download your assets.</p>
                    </div>
                    
                    <div className="border-b border-neutral-800 mb-6">
                        {['All', 'Completed', 'Pending'].map(tab => (
                            <button 
                                key={tab}
                                className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === tab ? 'text-green-400 border-b-2 border-green-400' : 'text-neutral-400 hover:text-white'}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredOrders.map((order, index) => (
                            <motion.div 
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Frame className="p-4 h-full flex flex-col group hover:border-green-500/50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
                                            <img src={order.cover} alt={order.beat} className="w-full h-full object-cover"/>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-white truncate">{order.beat}</h3>
                                            <p className="text-sm text-neutral-400">{order.artist}</p>
                                            <div className={`mt-2 inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(order.status)}`}>
                                                {order.status === 'Completed' ? <CheckCircle size={14} /> : <Clock size={14} />}
                                                {order.status}
                                            </div>
                                        </div>
                                        <p className="text-lg font-bold text-white">${order.price}</p>
                                    </div>
                                    {order.status === 'Completed' && (
                                        <button className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500 text-black font-bold py-2 px-4 rounded-lg text-sm hover:bg-green-600 transition-colors">
                                            <Download size={16} />
                                            Download Assets
                                        </button>
                                    )}
                                </Frame>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Sidebar */}
                <aside className="w-full lg:w-80 lg:flex-shrink-0">
                    <Frame className="p-6">
                        <h2 className="text-xl font-bold text-white text-center mb-4">Purchase Journey</h2>
                        <div className="text-center my-4">
                            <div className="inline-block p-4 bg-green-500/10 rounded-full">
                                {currentMilestone?.icon || <Award size={24} className="text-neutral-500" />}
                            </div>
                            <h3 className="text-lg font-bold text-white mt-2">{currentMilestone?.name || 'Newcomer'}</h3>
                            <p className="text-sm text-neutral-400">{userPurchases} completed purchases</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-neutral-300">Progress to {nextMilestone?.name || 'Max Level'}</p>
                            <div className="w-full bg-neutral-800 rounded-full h-2">
                                <motion.div 
                                    className="bg-green-500 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${milestoneProgress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                             <h4 className="font-semibold text-white mb-3">Unlocked Perks</h4>
                             <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm text-neutral-300">
                                    <ShieldCheck size={16} className="text-green-400" />
                                    <span>Priority Support</span>
                                </li>
                                {userPurchases >= 5 && (
                                     <li className="flex items-center gap-3 text-sm text-neutral-300">
                                        <ShieldCheck size={16} className="text-green-400" />
                                        <span>Exclusive Discounts</span>
                                    </li>
                                )}
                             </ul>
                        </div>
                    </Frame>
                </aside>
            </div>
        </Layout>
    );
};

export default OrdersPage;
