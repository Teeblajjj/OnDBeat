import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import PlayerBar from '../../components/PlayerBar';

export default function FavoritesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for favorite beats
  const favoriteBeats = [
      { id: 1, name: 'Cloud City', producer: 'Beatle', coverArt: 'https://images.unsplash.com/photo-1516442439369-dc83b33142d3?w=100&q=80' },
      { id: 2, name: 'Night Drive', producer: 'Rhythm Raider', coverArt: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=100&q=80' },
  ];

  return (
    <>
      <Head>
        <title>My Favorites - ONDBeat Marketplace</title>
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
            <h1 className="text-4xl font-bold mb-6">My Favorites</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {favoriteBeats.map(beat => (
                    <div key={beat.id} className="bg-neutral-900/70 p-4 rounded-lg hover:bg-neutral-800 transition-colors group">
                        <img src={beat.coverArt} alt={beat.name} className="w-full h-auto rounded-md mb-4 object-cover" />
                        <h3 className="font-bold truncate">{beat.name}</h3>
                        <p className="text-sm text-neutral-400 truncate">{beat.producer}</p>
                    </div>
                ))}
            </div>

          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
        </div>
      </div>
    </>
  )
}
