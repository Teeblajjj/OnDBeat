import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import { ArrowUpRight, Music, TrendingUp, FileText, DollarSign, Upload, Folder, Package, Download, Award } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock Data
const user = {
    name: 'StellarBeats',
    avatar: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&q=80',
    totalEarnings: 1250.75,
    totalPlays: 7850,
    totalUploads: 25,
};

const keyMetrics = [
    { title: 'Tracks Uploaded', value: 12, growth: '+5%', icon: <Music /> },
    { title: 'Total Sales', value: '$850.50', growth: '+12%', icon: <TrendingUp /> },
    { title: 'Active Contracts', value: 3, growth: '+1', icon: <FileText /> },
    { title: 'Payout Balance', value: '$350.75', action: 'Withdraw', icon: <DollarSign /> },
];

const revenueData = [
    { name: 'Jan', revenue: 120 }, { name: 'Feb', revenue: 200 }, { name: 'Mar', revenue: 150 },
    { name: 'Apr', revenue: 300 }, { name: 'May', revenue: 250 }, { name: 'Jun', revenue: 400 },
];

const trackPerformanceData = [
    { name: 'Cosmic Drift', sales: 90 }, { name: 'Neon Dreams', sales: 75 },
    { name: 'Future Funk', sales: 60 }, { name: 'Cybernetic Soul', sales: 45 },
    { name: 'Starlight', sales: 30 },
];

const geoData = [{ name: 'USA', value: 400 }, { name: 'UK', value: 150 }, { name: 'Canada', value: 100 }, { name: 'Germany', value: 80 }];
const COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534'];

const activityFeed = [
    { type: 'sale', text: 'Sold Exclusive License for "Cosmic Drift"', time: '2 hours ago' },
    { type: 'upload', text: 'Uploaded new beat: "Starlight"', time: '1 day ago' },
    { type: 'payout', text: 'Payout request of $150 processed', time: '3 days ago' },
];

const achievements = [
    { name: 'First Sale', unlocked: true }, { name: '10K Plays', unlocked: false }, { name: '5 Contracts Signed', unlocked: true },
];

const quickActions = [
    { label: 'Upload New Track', icon: <Upload /> }, { label: 'Create Collection', icon: <Folder /> },
    { label: 'Add Sound Kit', icon: <Package /> }, { label: 'Withdraw Funds', icon: <Download /> },
    { label: 'Create Contract', icon: <FileText /> },
];

const DashboardPage = () => {
    return (
        <Layout>
            <div className="p-4 md:p-8 space-y-8">
                {/* Welcome & Overview */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="flex items-center gap-4">
                        <img src={user.avatar} alt="Creator Avatar" className="w-16 h-16 rounded-full border-2 border-green-500" />
                        <div>
                            <h1 className="text-2xl font-bold text-white">Welcome, {user.name}</h1>
                            <p className="text-neutral-400">Keep building your legacy.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <div className="text-right">
                            <p className="text-sm text-neutral-400">Total Earnings</p>
                            <p className="font-bold text-white">${user.totalEarnings.toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-neutral-400">Total Plays</p>
                            <p className="font-bold text-white">{user.totalPlays}</p>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {keyMetrics.map((metric, i) => (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800/80 hover:border-green-500/50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="text-green-400">{metric.icon}</div>
                                <span className={`text-xs font-bold ${metric.growth?.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{metric.growth}</span>
                            </div>
                            <p className="text-sm text-neutral-400 mt-2">{metric.title}</p>
                            <p className="text-2xl font-bold text-white">{metric.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Analytics & Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ChartCard title="Monthly Revenue">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenueData}>
                                <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} />
                                <YAxis stroke="#a3a3a3" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: '#181818', border: '1px solid #404040' }} />
                                <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>
                    <ChartCard title="Top 5 Tracks (Sales)">
                         <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={trackPerformanceData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" stroke="#a3a3a3" fontSize={12} width={80} />
                                <Tooltip cursor={{ fill: '#ffffff10' }} contentStyle={{ backgroundColor: '#181818', border: '1px solid #404040' }} />
                                <Bar dataKey="sales" fill="#22c55e" radius={[0, 5, 5, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                 {/* Activity, Gamification, Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <ChartCard title="Activity Feed">
                            <div className="space-y-4">
                                {activityFeed.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="text-green-400">
                                            {item.type === 'sale' ? <DollarSign size={20}/> : item.type === 'upload' ? <Music size={20}/> : <Download size={20}/>}
                                        </div>
                                        <div>
                                            <p className="text-sm text-white">{item.text}</p>
                                            <p className="text-xs text-neutral-500">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ChartCard>
                    </div>
                    <div>
                        <ChartCard title="Achievements">
                            <div className="space-y-4">
                                <p className="text-sm text-neutral-400">You've uploaded 12/20 tracks this month.</p>
                                <div className="w-full bg-neutral-800 rounded-full h-2.5">
                                    <div className="bg-green-500 h-2.5 rounded-full" style={{width: '60%'}}></div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {achievements.map((ach, i) => (
                                        <div key={i} className={`p-3 rounded-full ${ach.unlocked ? 'bg-green-500/20 text-green-400' : 'bg-neutral-800 text-neutral-600'}`}>
                                            <Award size={24}/>
                                        </div>
                                    ))}
                                </div>
                                <button className="text-sm text-green-400 hover:underline">View All Achievements</button>
                            </div>
                        </ChartCard>
                    </div>
                </div>

                <div>
                     <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {quickActions.map((action, i) => (
                            <button key={i} className="flex flex-col items-center justify-center p-4 bg-neutral-900/60 rounded-lg border border-neutral-800/80 hover:bg-neutral-800/60 hover:border-green-500/50 transition-colors">
                                <div className="text-green-400 mb-2">{action.icon}</div>
                                <span className="text-sm text-white font-semibold text-center">{action.label}</span>
                            </button>
                        ))}
                     </div>
                </div>
            </div>
        </Layout>
    );
};

const ChartCard = ({ title, children }) => (
    <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800/80">
        <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
        <div>{children}</div>
    </div>
);

export default DashboardPage;
