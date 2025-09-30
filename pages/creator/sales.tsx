import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import PlayerBar from '../../components/PlayerBar';

const SalesPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sales = [
    { id: 1, beatName: 'Sunset Vibez', customer: 'Michael Scott', license: 'Standard', price: '$25.00', date: '2023-10-26' },
    { id: 2, beatName: 'Drill Sergeant', customer: 'Dwight Schrute', license: 'Exclusive', price: '$250.00', date: '2023-10-24' },
    { id: 3, beatName: 'Ocean Drive', customer: 'Jim Halpert', license: 'Standard', price: '$25.00', date: '2023-10-22' },
  ];

  return (
    <>
      <Head>
        <title>Sales - ONDBeat Marketplace</title>
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
            <h1 className="text-4xl font-bold mb-8">Sales</h1>

            <div className="bg-neutral-900/70 rounded-lg">
                <table className="w-full text-left">
                    <thead className="border-b border-neutral-700">
                        <tr>
                            <th className="p-4 font-semibold">Beat</th>
                            <th className="p-4 font-semibold">Customer</th>
                            <th className="p-4 font-semibold">License</th>
                            <th className="p-4 font-semibold">Price</th>
                            <th className="p-4 font-semibold">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => (
                            <tr key={sale.id} className="border-b border-neutral-800 hover:bg-neutral-800/60">
                                <td className="p-4 font-semibold">{sale.beatName}</td>
                                <td className="p-4 text-neutral-400">{sale.customer}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${sale.license === 'Exclusive' ? 'bg-purple-600/20 text-purple-300' : 'bg-blue-600/20 text-blue-300'}`}>
                                       {sale.license}
                                   </span>
                                </td>
                                <td className="p-4 font-bold">{sale.price}</td>
                                <td className="p-4 text-neutral-400">{sale.date}</td>
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

export default SalesPage;
