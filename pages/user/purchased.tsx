import Head from 'next/head';
import Link from 'next/link';
import { ShoppingCart, Download, FileText } from 'lucide-react';

const purchasedBeats = [
    {
        id: 1,
        name: 'Sunset Vibez',
        producer: 'Synth Samurai',
        license: 'Standard License',
        purchaseDate: '2023-10-26',
        coverArt: 'https://images.unsplash.com/photo-1597334796279-5f1d07b4c1a8?w=100&q=80',
    },
    {
        id: 2,
        name: 'City Lights',
        producer: 'Beatmaster Flex',
        license: 'Premium License',
        purchaseDate: '2023-10-22',
        coverArt: 'https://images.unsplash.com/photo-1526702534509-1a06a461b2a9?w=100&q=80',
    },
    {
        id: 3,
        name: 'Midnight Drive',
        producer: 'Rhythm Architect',
        license: 'Premium License',
        purchaseDate: '2023-10-15',
        coverArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&q=80',
    },
];

const PurchasedBeatRow = ({ beat }) => (
    <div className="grid grid-cols-5 items-center gap-4 p-3 rounded-lg hover:bg-neutral-800/50 text-neutral-300">
        <div className="flex items-center gap-4 col-span-2">
            <img src={beat.coverArt} alt={beat.name} className="w-12 h-12 rounded-lg"/>
            <div>
                <p className="font-semibold text-white">{beat.name}</p>
                <p className="text-sm">{beat.producer}</p>
            </div>
        </div>
        <div className="text-sm">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${beat.license === 'Premium License' ? 'bg-purple-200 text-purple-800' : 'bg-green-200 text-green-800'}`}>
                {beat.license}
            </span>
        </div>
        <div className="text-sm">{beat.purchaseDate}</div>
        <div className="flex items-center gap-2 justify-end">
            <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 flex items-center gap-2">
                <Download size={18}/> Download Files
            </button>
             <button className="p-2 hover:bg-neutral-700 rounded-full">
                <FileText size={18}/> 
            </button>
        </div>
    </div>
);

export default function PurchasedBeatsPage() {
    return (
        <>
            <Head>
                <title>Purchased Beats | ONDBEAT</title>
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <ShoppingCart size={32} />
                        <h1 className="text-3xl font-bold">Purchased Beats</h1>
                    </div>
                     <div className="space-y-2">
                        {purchasedBeats.map(beat => (
                            <PurchasedBeatRow key={beat.id} beat={beat} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
