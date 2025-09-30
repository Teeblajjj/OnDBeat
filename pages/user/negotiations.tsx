import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import PlayerBar from '../../components/PlayerBar';
import Link from 'next/link';

export default function NegotiationsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const negotiations = [
    { id: 1, beatName: 'Sunset Vibez', producer: 'Synth Samurai', status: 'Offer Made', lastUpdate: '2 days ago' },
    { id: 2, beatName: 'Drill Sergeant', producer: 'Trap Lord', status: 'Counter Offer', lastUpdate: '1 day ago' },
    { id: 3, beatName: 'Ocean Drive', producer: 'Wavey', status: 'Accepted', lastUpdate: '5 days ago' },
  ];

  return (
    <>
      <Head>
        <title>My Negotiations - ONDBeat Marketplace</title>
      </Head>

      <div className="min-h-screen bg-black text-white flex">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="flex-1 md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onCartClick={() => {}}
            cartItems={0}
          />

          <main className="bg-gradient-to-b from-neutral-900/60 to-[#121212] p-8">
            <h1 className="text-4xl font-bold mb-6">My Negotiations</h1>
            
            <div className="bg-neutral-900/70 rounded-lg">
                <table className="w-full text-left">
                    <thead className="border-b border-neutral-700">
                        <tr>
                            <th className="p-4 font-semibold">Beat</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold">Last Update</th>
                            <th className="p-4 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {negotiations.map(neg => (
                            <tr key={neg.id} className="border-b border-neutral-800 hover:bg-neutral-800/60">
                                <td className="p-4">
                                    <p className="font-bold">{neg.beatName}</p>
                                    <p className="text-sm text-neutral-400">by {neg.producer}</p>
                                </td>
                                <td className="p-4">
                                   <span className={`px-2 py-1 text-xs font-bold rounded-full ${neg.status === 'Accepted' ? 'bg-green-600/20 text-green-300' : 'bg-yellow-600/20 text-yellow-300'}`}>
                                       {neg.status}
                                   </span>
                                </td>
                                <td className="p-4 text-neutral-400">{neg.lastUpdate}</td>
                                <td className="p-4">
                                    <Link href={`/user/negotiations/${neg.id}`} legacyBehavior>
                                        <a className="font-semibold text-blue-500 hover:underline">View</a>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
        </div>
      </div>
    </>
  )
}
