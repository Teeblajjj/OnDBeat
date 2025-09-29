import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import PlayerBar from '../../components/PlayerBar';
import { BarChart, DollarSign, ListMusic, Upload, Music, Tag, FileText, Image as ImageIcon, Briefcase } from 'lucide-react';

// --- Dummy Data ---
const stats = [
    { label: "Total Sales", value: "$1,482", icon: DollarSign },
    { label: "Total Streams", value: "28,921", icon: BarChart },
    { label: "Published Beats", value: "12", icon: ListMusic },
];

// --- Page ---
export default function CreatorDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Head>
        <title>Creator Dashboard - ONDBeat</title>
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onCartClick={() => {}} // No cart on creator dash
            cartItems={0}
          />

          <main className="p-4 md:p-8 bg-gradient-to-b from-purple-900/20 to-[#121212]">
            <div className="max-w-7xl mx-auto">
                 <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tighter">Creator Dashboard</h1>
                    <p className="text-gray-400 text-lg">Welcome back, let's make some hits.</p>
                </div>

                 {/* --- Stats -- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                    {stats.map(stat => (
                        <div key={stat.label} className="bg-[#181818] p-5 rounded-lg flex items-center gap-5 transition-colors hover:bg-[#282828]">
                            <div className="bg-purple-500/10 p-3 rounded-full border-2 border-purple-500/50">
                               <stat.icon size={24} className="text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* --- Upload Form Section -- */}
                <div className="bg-[#181818] rounded-xl p-6 md:p-8 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <Upload size={28} className="text-green-400"/>
                        <h2 className="text-3xl font-bold text-white">Upload New Beat</h2>
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="md:col-span-2 space-y-2">
                           <label htmlFor="title" className="text-sm font-bold text-gray-300">Title</label>
                           <div className="relative">
                                <Music className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                                <input type="text" id="title" placeholder="e.g., Sunset Vibez" className="w-full bg-neutral-700/50 border-2 border-neutral-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"/>
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label htmlFor="tags" className="text-sm font-bold text-gray-300">Tags / Keywords</label>
                           <div className="relative">
                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                                <input type="text" id="tags" placeholder="e.g., Trap, Drake Type Beat, 808" className="w-full bg-neutral-700/50 border-2 border-neutral-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"/>
                           </div>
                        </div>

                         <div className="space-y-2">
                           <label htmlFor="price" className="text-sm font-bold text-gray-300">Price</label>
                           <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                                <input type="number" id="price" placeholder="e.g., 29.99" className="w-full bg-neutral-700/50 border-2 border-neutral-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"/>
                           </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                           <p className="text-sm font-bold text-gray-300 mb-2">Upload Files</p>
                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <FileUploadBox icon={Music} title="Beat Audio" description=".mp3, .wav"/>
                                <FileUploadBox icon={Briefcase} title="Project Stems" description=".zip, .rar"/>
                                <FileUploadBox icon={ImageIcon} title="Cover Art" description=".jpg, .png"/>
                           </div>
                        </div>
                        
                        <div className="md:col-span-2 pt-4">
                            <button type="submit" className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-10 rounded-full transition-colors flex items-center justify-center gap-2 text-lg">
                                <Upload size={20}/>
                                Publish Beat
                            </button>
                        </div>
                    </form>
                </div>
            </div>
          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
        </div>
      </div>
    </>
  )
}

const FileUploadBox = ({icon: Icon, title, description}) => (
    <div className="border-2 border-dashed border-neutral-700 rounded-xl p-6 text-center cursor-pointer hover:bg-neutral-800/50 hover:border-green-500 transition-all">
        <Icon size={32} className="mx-auto text-gray-400 mb-2"/>
        <p className="text-base font-semibold text-white">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
    </div>
);
