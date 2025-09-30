import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import PlayerBar from '../../components/PlayerBar';
import { MessageSquare } from 'lucide-react';

const NegotiationsPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const negotiations = [
    { id: 1, beatName: 'Sunset Vibez', customer: 'Michael Scott', offer: '$200.00', status: 'Pending' },
    { id: 2, beatName: 'Drill Sergeant', customer: 'Dwight Schrute', offer: '$150.00', status: 'Accepted' },
    { id: 3, beatName: 'Ocean Drive', customer: 'Jim Halpert', offer: '$100.00', status: 'Rejected' },
  ];

  return (
    <>
      <Head>
        <title>Negotiations - ONDBeat Marketplace</title>
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

          <main className="bg-gradient-to-b from-purple-900/30 to-[#121212] p-8">
            <div className="flex items-center space-x-4 mb-8">
                <MessageSquare size={40} className="text-green-500"/>
                <h1 className="text-4xl font-bold">Negotiations</h1>
            </div>

            <div className="bg-neutral-900/70 rounded-lg">
                <table className="w-full text-left">
                    <thead className="border-b border-neutral-700">
                        <tr>
                            <th className="p-4 font-semibold">Beat</th>
                            <th className="p-4 font-semibold">Customer</th>
                            <th className="p-4 font-semibold">Offer</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {negotiations.map(neg => (
                            <tr key={neg.id} className="border-b border-neutral-800 hover:bg-neutral-800/60">
                                <td className="p-4 font-semibold">{neg.beatName}</td>
                                <td className="p-4 text-neutral-400">{neg.customer}</td>
                                <td className="p-4 font-bold">{neg.offer}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${neg.status === 'Accepted' ? 'bg-green-600/20 text-green-300' : neg.status === 'Rejected' ? 'bg-red-600/20 text-red-300' : 'bg-yellow-600/20 text-yellow-300'}`}>
                                        {neg.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <a href="#" className="font-semibold text-blue-500 hover:underline">View</a>
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
  );
};

export default NegotiationsPage;
