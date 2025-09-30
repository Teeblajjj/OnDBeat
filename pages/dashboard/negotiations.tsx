import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';

// NOTE: This is a temporary data structure.
// In a real application, you would have a more robust way of associating beats with negotiations.
const sampleBeats = {
    1: { title: "Renfe", producer: "Al Safir Type Beat" },
    2: { title: "City Lights", producer: "The Weeknd" },
    3: { title: "Desert Rose", producer: "Sting" },
    4: { title: "Kentro", producer: "Fireboy DML" },
    5: { title: "Skido", producer: "Victony" },
    6: { title: "Jungle", producer: "Syndrome" },
    7: { title: "Negroni", producer: "Afrobeat x Jorja Smith" },
    8: { title: "i-guide", producer: "Al Safir Type Beat - Ori..." },
    9: { title: "Rolly", producer: "Al Safir Type Beat" },
    10: { title: "Free", producer: "d r i l l p a c k" },
    11: { title: "Narcos", producer: "Narcos Type Beat" },
};


export default function NegotiationsDashboard() {
    const [negotiations, setNegotiations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNegotiations = async () => {
            try {
                const response = await fetch('/api/negotiate');
                if (!response.ok) {
                    throw new Error('Failed to fetch negotiations');
                }
                const data = await response.json();
                setNegotiations(data.negotiations);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNegotiations();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'accepted':
                return 'bg-green-500/20 text-green-400';
            case 'rejected':
                return 'bg-red-500/20 text-red-400';
            case 'countered':
                return 'bg-blue-500/20 text-blue-400';
            default:
                return 'bg-neutral-500/20 text-neutral-400';
        }
    };

    return (
        <>
            <Head>
                <title>Negotiations Dashboard | ONDBEAT</title>
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 text-neutral-300 mb-8">
                        <Link href="/" legacyBehavior>
                            <a className="flex items-center gap-2 hover:text-white">
                                <Home size={20} />
                            </a>
                        </Link>
                        /
                        <Link href="/dashboard" legacyBehavior>
                            <a className="flex items-center gap-2 hover:text-white">
                                <ChevronLeft size={20} />
                                Dashboard
                            </a>
                        </Link>
                    </div>

                    <h1 className="text-4xl font-bold mb-8">Negotiations</h1>

                    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-neutral-800/50 text-sm font-semibold text-neutral-300 uppercase">
                                    <tr>
                                        <th className="px-6 py-4">Beat</th>
                                        <th className="px-6 py-4">Buyer</th>
                                        <th className="px-6 py-4">Offer</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-800">
                                    {isLoading ? (
                                        <tr><td colSpan={6} className="text-center py-8">Loading offers...</td></tr>
                                    ) : error ? (
                                        <tr><td colSpan={6} className="text-center py-8 text-red-400">{error}</td></tr>
                                    ) : negotiations.length === 0 ? (
                                        <tr><td colSpan={6} className="text-center py-8 text-neutral-500">No negotiations found.</td></tr>
                                    ) : (
                                        negotiations.map((neg) => (
                                            <tr key={neg.id} className="hover:bg-neutral-800/40 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className='font-semibold'>{sampleBeats[neg.beatId]?.title || 'Unknown Beat'}</div>
                                                    <div className='text-xs text-neutral-400'>{sampleBeats[neg.beatId]?.producer || 'Unknown Producer'}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{neg.buyerId}</td>
                                                <td className="px-6 py-4 font-semibold whitespace-nowrap">${neg.offerPrice.toFixed(2)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(neg.status)}`}>
                                                        {neg.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-neutral-400 whitespace-nowrap">{new Date(neg.createdAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link href={`/dashboard/negotiation/${neg.id}`} legacyBehavior>
                                                        <a className="font-semibold text-blue-500 hover:text-blue-400">View</a>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
