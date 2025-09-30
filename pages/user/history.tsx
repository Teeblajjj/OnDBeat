import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import PlayerBar from '../../components/PlayerBar';

export default function HistoryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const listeningHistory = [
      { id: 1, name: 'Lo-Fi Dreams', producer: 'Chillhop Cafe', playedAt: '2 hours ago' },
      { id: 2, name: '80s Synthwave', producer: 'Neon Nights', playedAt: 'Yesterday' },
  ];

  return (
    <>
      <Head>
        <title>Listening History - ONDBeat Marketplace</title>
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
            <h1 className="text-4xl font-bold mb-6">Listening History</h1>
            
            <ul className="space-y-4">
                {listeningHistory.map(item => (
                    <li key={item.id} className="bg-neutral-800/50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-bold">{item.name}</p>
                            <p className="text-sm text-neutral-400">by {item.producer}</p>
                        </div>
                        <span className="text-sm text-neutral-500"> {item.playedAt}</span>
                    </li>
                ))}
            </ul>
          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
        </div>
      </div>
    </>
  )
}
