import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import PlayerBar from '../../components/PlayerBar';
import { DollarSign } from 'lucide-react';

const PayoutsPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const balance = "$2,500.00";
  const payoutHistory = [
    { id: 1, amount: "$500.00", date: '2023-10-15', status: 'Paid' },
    { id: 2, amount: "$350.00", date: '2023-09-15', status: 'Paid' },
    { id: 3, amount: "$420.00", date: '2023-08-15', status: 'Paid' },
  ];

  return (
    <>
      <Head>
        <title>Payouts - ONDBeat Marketplace</title>
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
            <h1 className="text-4xl font-bold mb-8">Payouts</h1>

            <div className="bg-neutral-800/60 p-6 rounded-lg mb-8 flex justify-between items-center">
                <div>
                    <p className="text-sm text-neutral-400">Available for Payout</p>
                    <p className="text-3xl font-bold">{balance}</p>
                </div>
                <button className="bg-green-600 text-white font-bold py-3 px-6 rounded-full flex items-center space-x-2 hover:bg-green-700 transition-colors">
                    <DollarSign size={20}/>
                    <span>Request Payout</span>
                </button>
            </div>

            <h2 className="text-2xl font-bold mb-4">Payout History</h2>
            <div className="bg-neutral-900/70 rounded-lg">
                <table className="w-full text-left">
                    <thead className="border-b border-neutral-700">
                        <tr>
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold">Amount</th>
                            <th className="p-4 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payoutHistory.map(payout => (
                            <tr key={payout.id} className="border-b border-neutral-800 hover:bg-neutral-800/60">
                                <td className="p-4 text-neutral-400">{payout.date}</td>
                                <td className="p-4 font-bold">{payout.amount}</td>
                                <td className="p-4">
                                   <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-600/20 text-green-300">
                                       {payout.status}
                                   </span>
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

export default PayoutsPage;
