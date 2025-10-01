import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import PlayerBar from '../../components/PlayerBar';
import { Plus, Music, Library, Package } from 'lucide-react';
import Link from 'next/link';

// Tab component
const Tab = ({ label, icon, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors duration-200 ${active ? 'border-green-500 text-white' : 'border-transparent text-neutral-400 hover:text-white'}`}>
        {icon}
        <span>{label}</span>
    </button>
);

// Mock data for different content types
const myBeats = [
    { id: 1, name: 'Cloud City', status: 'Published', price: '$29.99', sales: 15 },
    { id: 2, name: 'Night Drive', status: 'Published', price: '$29.99', sales: 8 },
    { id: 3, name: 'Sunset Vibez', status: 'Draft', price: '$29.99', sales: 0 },
];
const myCollections = [
    { id: 1, name: 'Summer Vibes Vol. 1', items: 10, status: 'Published' },
    { id: 2, name: 'Lo-Fi Beats for Studying', items: 15, status: 'Published' },
];
const mySoundKits = [
    { id: 1, name: '808 Mafia Drum Kit', downloads: 1502, price: '$49.99' },
    { id: 2, name: 'Analog Lab V Presets', downloads: 850, price: '$39.99' },
];

const MyContentPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState('beats');

  return (
    <>
      <Head>
        <title>My Content - ONDBeat Marketplace</title>
      </Head>

      <div className="min-h-screen bg-black text-white flex">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="flex-1 md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenu-Open)}
            onCartClick={() => {}}
            cartItems={0}
          />

          <main className="bg-gradient-to-b from-purple-900/30 to-[#121212] p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-0">My Content</h1>
                <Link href="/creator" legacyBehavior>
                    <a className="bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 hover:bg-green-700 transition-colors">
                        <Plus size={20}/>
                        <span>Upload</span>
                    </a>
                </Link>
            </div>

            {/* Tabs */}
            <div className="border-b border-neutral-800 mb-6">
                <div className="flex flex-wrap items-center -mb-px">
                    <Tab label="My Beats" icon={<Music size={18}/>} active={activeTab === 'beats'} onClick={() => setActiveTab('beats')} />
                    <Tab label="My Collections" icon={<Library size={18}/>} active={activeTab === 'collections'} onClick={() => setActiveTab('collections')} />
                    <Tab label="My Sound Kits" icon={<Package size={18}/>} active={activeTab === 'sound-kits'} onClick={() => setActiveTab('sound-kits')} />
                </div>
            </div>

            {/* Content based on active tab */}
            <div className="bg-neutral-900/70 rounded-lg overflow-x-auto">
                {activeTab === 'beats' && (
                    <table className="w-full min-w-max text-left">
                        <thead className="border-b border-neutral-700">
                           <tr>
                               <th className="p-4 font-semibold">Name</th>
                               <th className="p-4 font-semibold">Status</th>
                               <th className="p-4 font-semibold">Price</th>
                               <th className="p-4 font-semibold">Sales</th>
                               <th className="p-4 font-semibold"></th>
                           </tr>
                        </thead>
                        <tbody>
                           {myBeats.map(beat => (
                               <tr key={beat.id} className="border-b border-neutral-800 hover:bg-neutral-800/60">
                                   <td className="p-4 font-semibold">{beat.name}</td>
                                   <td className="p-4"><span className={`px-2 py-1 text-xs font-bold rounded-full ${beat.status === 'Published' ? 'bg-green-600/20 text-green-300' : 'bg-yellow-600/20 text-yellow-300'}`}>{beat.status}</span></td>
                                   <td className="p-4 font-bold">{beat.price}</td>
                                   <td className="p-4 text-neutral-400">{beat.sales}</td>
                                   <td className="p-4"><Link href={`/creator/beats/${beat.id}/edit`} legacyBehavior><a className="font-semibold text-blue-500 hover:underline">Edit</a></Link></td>
                               </tr>
                           ))}
                        </tbody>
                   </table>
                )}
                {activeTab === 'collections' && (
                    <table className="w-full min-w-max text-left">
                        <thead>
                           <tr>
                               <th className="p-4 font-semibold">Name</th>
                               <th className="p-4 font-semibold">Items</th>
                               <th className="p-4 font-semibold">Status</th>
                               <th className="p-4 font-semibold"></th>
                           </tr>
                        </thead>
                        <tbody>
                           {myCollections.map(col => (
                               <tr key={col.id} className="border-b border-neutral-800 hover:bg-neutral-800/60">
                                   <td className="p-4 font-semibold">{col.name}</td>
                                   <td className="p-4 text-neutral-400">{col.items}</td>
                                   <td className="p-4"><span className={`px-2 py-1 text-xs font-bold rounded-full ${col.status === 'Published' ? 'bg-green-600/20 text-green-300' : 'bg-yellow-600/20 text-yellow-300'}`}>{col.status}</span></td>
                                   <td className="p-4"><Link href={`/creator/collections/${col.id}/edit`} legacyBehavior><a className="font-semibold text-blue-500 hover:underline">Edit</a></Link></td>
                               </tr>
                           ))}
                       </tbody>
                    </table>
                )}
                {activeTab === 'sound-kits' && (
                     <table className="w-full min-w-max text-left">
                        <thead>
                           <tr>
                               <th className="p-4 font-semibold">Name</th>
                               <th className="p-4 font-semibold">Price</th>
                               <th className="p-4 font-semibold">Downloads</th>
                               <th className="p-4 font-semibold"></th>
                           </tr>
                        </thead>
                        <tbody>
                           {mySoundKits.map(kit => (
                               <tr key={kit.id} className="border-b border-neutral-800 hover:bg-neutral-800/60">
                                   <td className="p-4 font-semibold">{kit.name}</td>
                                   <td className="p-4 font-bold">{kit.price}</td>
                                   <td className="p-4 text-neutral-400">{kit.downloads}</td>
                                   <td className="p-4"><Link href={`/creator/sound-kits/${kit.id}/edit`} legacyBehavior><a className="font-semibold text-blue-500 hover:underline">Edit</a></Link></td>
                               </tr>
                           ))}
                       </tbody>
                    </table>
                )}
            </div>

          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
        </div>
      </div>
    </>
  );
};

export default MyContentPage;
