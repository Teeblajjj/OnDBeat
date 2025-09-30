import Head from 'next/head';
import { Users, Link as LinkIcon, Gift, Copy, Check, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const StatCard = ({ icon: Icon, title, value }) => (
    <div className="bg-neutral-800/50 border border-neutral-700 p-6 rounded-xl text-center">
        <Icon size={32} className="mx-auto mb-3 text-blue-500" />
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-neutral-400">{title}</p>
    </div>
);


export default function InviteAFriendPage() {
    const [copied, setCopied] = useState(false);
    const referralLink = "https://ondbeat.com/r/demo-user123";

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };
    
    const referrals = [
        { name: "John Doe", status: "Signed Up", reward: "$5 Credit" },
        { name: "Jane Smith", status: "Purchased a Beat", reward: "$10 Credit" },
        { name: "Mike Johnson", status: "Pending", reward: "-" },
    ];

    return (
        <>
            <Head>
                <title>Invite a Friend | ONDBEAT</title>
            </Head>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <Users size={48} className="mx-auto mb-4 text-blue-500"/>
                    <h1 className="text-4xl font-bold mb-2">Invite Friends, Earn Rewards</h1>
                    <p className="text-lg text-neutral-400">Share your love for ONDBEAT and get rewarded for every friend that joins.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                   <StatCard icon={Gift} title="Total Rewards" value="$15.00" />
                   <StatCard icon={Users} title="Friends Joined" value="2" />
                   <StatCard icon={LinkIcon} title="Clicks" value="48" />
                </div>

                <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-8 mb-12 text-center">
                    <h2 className="text-2xl font-bold mb-4">Your Unique Referral Link</h2>
                    <p className="text-neutral-400 mb-6">Share this link with your friends. When they sign up, you both get rewarded!</p>
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-md">
                            <input 
                                type="text" 
                                readOnly 
                                value={referralLink}
                                className="w-full bg-neutral-900 border border-neutral-700 rounded-full pl-6 pr-28 py-3 text-neutral-300 focus:outline-none"
                            />
                            <button onClick={handleCopy} className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 flex items-center gap-2">
                                {copied ? <><Check size={18}/>Copied!</> : <><Copy size={18}/>Copy</>}
                            </button>
                        </div>
                    </div>
                     <div className="mt-6 flex justify-center gap-4">
                        <button className="p-3 bg-neutral-700 rounded-full hover:bg-blue-800"><Facebook size={20}/></button>
                        <button className="p-3 bg-neutral-700 rounded-full hover:bg-sky-500"><Twitter size={20}/></button>
                        <button className="p-3 bg-neutral-700 rounded-full hover:bg-green-600"><MessageCircle size={20}/></button>
                    </div>
                </div>
                
                <div>
                     <h2 className="text-2xl font-bold mb-6">Your Referrals</h2>
                     <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
                         <table className="w-full text-sm text-left text-neutral-300">
                            <thead className="text-xs text-neutral-400 uppercase bg-neutral-900">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Friend</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3 text-right">Reward</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referrals.map((r, i) => (
                                    <tr key={i} className="border-b border-neutral-700 hover:bg-neutral-800/50">
                                        <td className="px-6 py-4 font-medium">{r.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                r.status === 'Signed Up' ? 'bg-blue-200 text-blue-800' :
                                                r.status === 'Purchased a Beat' ? 'bg-green-200 text-green-800' :
                                                'bg-yellow-200 text-yellow-800'
                                            }`}>{r.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-green-400">{r.reward}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
}
