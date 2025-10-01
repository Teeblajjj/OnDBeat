import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Copy, Check, Users, DollarSign, BarChart2, Gift, ArrowLeft, Home } from 'lucide-react';

const AffiliateDashboardPage = () => {
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const referralLink = "https://ondbeat.com/r/demo-user123";
    const earnings = 75.50;
    const threshold = 100;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const referrals = [
        { user: 'user1.jpg', name: 'Alex Johnson', date: '2024-07-21', status: 'First Purchase', commission: '+' },
        { user: 'user2.jpg', name: 'Maria Garcia', date: '2024-07-20', status: 'Signed Up', commission: '+' },
        { user: 'user3.jpg', name: 'David Chen', date: '2024-07-18', status: 'Signed Up', commission: '+' },
    ];

    return (
        <>
            <Head>
                <title>Affiliate Dashboard | ONDBEAT</title>
            </Head>
            <div className="min-h-screen bg-[#121212] text-white p-4 sm:p-8">
                <div className="max-w-7xl mx-auto">
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
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                        <div>
                            <h1 className="text-3xl font-bold">Affiliate Dashboard</h1>
                            <p className="text-neutral-400 mt-1">Track your referrals and manage your earnings.</p>
                        </div>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <span className="text-sm font-medium">Affiliate Rank: <span className="font-bold text-green-400">Pro</span></span>
                            <div className="h-8 w-px bg-neutral-700"></div>
                            <div className="text-right">
                                <p className="text-sm text-neutral-400">Total Earnings</p>
                                <p className="font-bold text-xl text-green-400">$2,180.50</p>
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Referral Link & Stats */}
                            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-8">
                                <h2 className="text-xl font-semibold mb-4">Your Referral Link</h2>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input type="text" readOnly value={referralLink} className="flex-grow bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500" />
                                    <button onClick={handleCopy} className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                                        {copied ? <Check size={18} /> : <Copy size={18} />} 
                                        {copied ? 'Copied!' : 'Copy Link'}
                                    </button>
                                </div>
                                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                                    <div className="p-4 bg-neutral-900/50 rounded-lg">
                                        <BarChart2 size={24} className="mx-auto text-neutral-400 mb-2" />
                                        <p className="text-2xl font-bold">1,204</p>
                                        <p className="text-sm text-neutral-500">Clicks</p>
                                    </div>
                                    <div className="p-4 bg-neutral-900/50 rounded-lg">
                                        <Users size={24} className="mx-auto text-neutral-400 mb-2" />
                                        <p className="text-2xl font-bold">82</p>
                                        <p className="text-sm text-neutral-500">Sign-ups</p>
                                    </div>
                                    <div className="p-4 bg-neutral-900/50 rounded-lg">
                                        <DollarSign size={24} className="mx-auto text-neutral-400 mb-2" />
                                        <p className="text-2xl font-bold">$2.1k</p>
                                        <p className="text-sm text-neutral-500">Total Earned</p>
                                    </div>
                                </div>
                            </div>

                            {/* Referrals Table */}
                            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl">
                                <h2 className="text-xl font-semibold p-6">Recent Referrals</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="border-b border-t border-neutral-800 text-sm text-neutral-400">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">User</th>
                                                <th className="px-6 py-4 font-medium">Date</th>
                                                <th className="px-6 py-4 font-medium">Status</th>
                                                <th className="px-6 py-4 font-medium text-right">Commission</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {referrals.map((ref, i) => (
                                                <tr key={i} className="border-b border-neutral-800 hover:bg-neutral-800/40">
                                                    <td className="px-6 py-4 flex items-center gap-3">
                                                        <img src={`https://i.pravatar.cc/40?u=${ref.user}`} alt={ref.name} className="w-8 h-8 rounded-full" />
                                                        <span className="font-medium">{ref.name}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-neutral-400">{ref.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                                                            ref.status === 'First Purchase' ? 'bg-green-500/10 text-green-400' :
                                                            'bg-blue-500/10 text-blue-400'
                                                        }`}>{ref.status}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-bold text-green-400">{ref.commission}$25.00</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            {/* Earnings & Cash Out */}
                            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-8">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-semibold">Your Balance</h2>
                                    <DollarSign size={20} className="text-neutral-500" />
                                </div>
                                <p className="text-4xl font-bold text-green-400 mb-4">${earnings.toFixed(2)}</p>
                                <div className="w-full bg-neutral-700 rounded-full h-2.5 mb-2">
                                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(earnings / threshold) * 100}%` }}></div>
                                </div>
                                <p className="text-sm text-neutral-400 mb-6">${(threshold - earnings).toFixed(2)} more to cash out</p>
                                <button 
                                    disabled={earnings < threshold}
                                    className="w-full bg-green-600 text-white font-bold py-3 rounded-lg transition-all disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed hover:bg-green-700"
                                >
                                    Cash Out to Main Balance
                                </button>
                            </div>

                            {/* How it Works */}
                            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">How it Works</h2>
                                    <Gift size={20} className="text-neutral-500" />
                                </div>
                                <ul className="space-y-4 text-neutral-400 text-sm">
                                    <li className="flex gap-3">
                                        <span className="font-bold text-green-400">1.</span>
                                        <span>Share your unique link with friends, followers, or anyone interested in music production.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-bold text-green-400">2.</span>
                                        <span>When someone signs up using your link, they're officially your referral.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-bold text-green-400">3.</span>
                                        <span>Earn a <span className="font-bold text-white">20% commission</span> on their first purchase of beats or sound kits.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-bold text-green-400">4.</span>
                                        <span>Once you reach the $100 threshold, cash out your earnings to your main ONDBEAT balance.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AffiliateDashboardPage;
