import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import PlayerBar from '../../components/PlayerBar';
import { Rocket } from 'lucide-react';

const PromotePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Head>
        <title>Promote - ONDBeat Marketplace</title>
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
                <Rocket size={40} className="text-green-500"/>
                <h1 className="text-4xl font-bold">Promote Your Music</h1>
            </div>

            <div className="bg-neutral-900/70 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Feature Your Beats</h2>
                <p className="text-neutral-400 mb-6">Get your music in front of more buyers by promoting it on our marketplace. Choose a promotion package below to get started.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Promotion Packages */}
                    <div className="border border-neutral-700 p-6 rounded-lg text-center hover:border-green-500 transition-colors">
                        <h3 className="text-xl font-bold mb-2">Basic</h3>
                        <p className="text-3xl font-bold mb-4">$10</p>
                        <p className="text-neutral-400 text-sm mb-4">7 days on the front page</p>
                        <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full hover:bg-green-700 transition-colors">Select</button>
                    </div>
                    <div className="border-2 border-green-500 p-6 rounded-lg text-center relative">
                        <span className="absolute top-0 -mt-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                        <h3 className="text-xl font-bold mb-2">Pro</h3>
                        <p className="text-3xl font-bold mb-4">$25</p>
                        <p className="text-neutral-400 text-sm mb-4">30 days on the front page + featured in newsletter</p>
                        <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full hover:bg-green-700 transition-colors">Select</button>
                    </div>
                    <div className="border border-neutral-700 p-6 rounded-lg text-center hover:border-green-500 transition-colors">
                        <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                        <p className="text-3xl font-bold mb-4">$50</p>
                        <p className="text-neutral-400 text-sm mb-4">30 days on front page, newsletter, and social media</p>
                        <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full hover:bg-green-700 transition-colors">Select</button>
                    </div>
                </div>
            </div>
          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
        </div>
      </div>
    </>
  );
};

export default PromotePage;
