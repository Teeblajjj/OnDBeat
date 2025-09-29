import Head from "next/head";
import { useRouter } from "next/router";
import { ChevronLeft, UserPlus, MessageSquare, Play, Rss } from "lucide-react";
import { useState } from "react";

// NOTE: This is a temporary data structure.
const producerProfile = {
    id: 1,
    name: "Yoka",
    followers: 25000,
    avatar: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
    bio: "Multi-platinum producer. Known for crafting hits for top artists. Focused on Trap, Hip-Hop, and R&B. All beats are made with passion.",
    social: { twitter: "@yokabeats", instagram: "@yokabeats" },
    beats: [
        { id: 1, title: "Sad Boy", price: 29.99, cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80" },
        { id: 2, title: "So Sick", price: 29.99, cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&q=80" },
        { id: 3, title: "Under", price: 9.99, cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
        { id: 4, title: "DG", price: 0, cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80" },
    ],
    soundkits: [
        { id: 1, name: "Yoka Drum Kit Vol. 1", price: 49.99, cover: "https://images.unsplash.com/photo-1593113646773-4627116a537d?w=400&q=80" },
        { id: 2, name: "Yoka Vocal Chops", price: 29.99, cover: "https://images.unsplash.com/photo-1588247866372-de3a1c8b353a?w=400&q=80" },
    ],
     collections: [
        { id: 1, name: "Dark Trap Mood", tracks: 10, cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" }
    ]
};

const TabButton = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
    <button 
        onClick={onClick}
        className={`px-4 py-2 font-semibold border-b-2 transition-colors ${active ? 'border-blue-500 text-white' : 'border-transparent text-neutral-400 hover:text-white'}`}>
        {children}
    </button>
)

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const profile = producerProfile; // Fetch profile by id
  const [activeTab, setActiveTab] = useState("beats");

  return (
    <>
      <Head>
        <title>{profile.name} | ONDBeat</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white">
        <button onClick={() => router.back()} className="absolute top-8 left-8 flex items-center gap-2 text-neutral-300 hover:text-white z-10">
            <ChevronLeft size={20} />
            Back
        </button>

        {/* Header */}
        <div className="h-60 md:h-80 relative">
            <img src={profile.cover} alt="Profile cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 flex items-end gap-6">
                <img src={profile.avatar} alt={profile.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black shadow-lg"/>
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold">{profile.name}</h1>
                    <p className="text-neutral-300">{profile.followers.toLocaleString()} Followers</p>
                </div>
            </div>
             <div className="absolute bottom-8 right-8 flex gap-3">
                <button className="bg-blue-600 font-bold py-2 px-5 rounded-full flex items-center gap-2 hover:bg-blue-700"><UserPlus size={18}/> Follow</button>
                <button className="bg-neutral-800 font-bold py-2 px-5 rounded-full flex items-center gap-2 hover:bg-neutral-700"><MessageSquare size={18}/> Message</button>
            </div>
        </div>

        {/* Main Content */}
        <div className="p-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Bio & Socials */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-neutral-800">
                        <h2 className="text-xl font-bold mb-4">About Me</h2>
                        <p className="text-neutral-300">{profile.bio}</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-neutral-800">
                        <h2 className="text-xl font-bold mb-4">Socials</h2>
                        <div className="space-y-2">
                           <a href="#" className="flex items-center gap-3 text-neutral-300 hover:text-white"><Rss size={20}/> <span>{profile.social.twitter}</span></a>
                           <a href="#" className="flex items-center gap-3 text-neutral-300 hover:text-white"><Rss size={20}/> <span>{profile.social.instagram}</span></a>
                        </div>
                    </div>
                </div>

                {/* Right: Tabs & Content */}
                <div className="lg:col-span-2">
                    <div className="border-b border-neutral-800 mb-6">
                        <TabButton active={activeTab === 'beats'} onClick={() => setActiveTab('beats')}>Beats ({profile.beats.length})</TabButton>
                        <TabButton active={activeTab === 'soundkits'} onClick={() => setActiveTab('soundkits')}>Sound Kits ({profile.soundkits.length})</TabButton>
                        <TabButton active={activeTab === 'collections'} onClick={() => setActiveTab('collections')}>Collections ({profile.collections.length})</TabButton>
                    </div>

                    {activeTab === 'beats' && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                           {profile.beats.map(beat => (
                                <div key={beat.id} className="bg-[#2a2a2a] p-3 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer group">
                                    <div className="relative mb-3">
                                        <img src={beat.cover} alt={beat.title} className="w-full rounded-md"/>
                                         <button className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Play size={20} fill="black" className="ml-1" />
                                        </button>
                                    </div>
                                    <p className="font-bold text-sm truncate">{beat.title}</p>
                                    <p className="text-xs text-green-400 font-semibold">${beat.price}</p>
                                </div>
                           ))}
                        </div>
                    )}
                    {activeTab === 'soundkits' && (
                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                           {profile.soundkits.map(kit => (
                                <div key={kit.name} className="bg-[#2a2a2a] p-3 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer">
                                    <img src={kit.cover} alt={kit.name} className="w-full rounded-md mb-3"/>
                                    <p className="font-bold text-sm truncate">{kit.name}</p>
                                    <p className="text-xs text-green-400 font-semibold">${kit.price}</p>
                                </div>
                           ))}
                        </div>
                    )}
                     {activeTab === 'collections' && (
                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                           {profile.collections.map(col => (
                                <div key={col.name} className="bg-[#2a2a2a] p-3 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer">
                                    <img src={col.cover} alt={col.name} className="w-full rounded-md mb-3"/>
                                    <p className="font-bold text-sm truncate">{col.name}</p>
                                    <p className="text-xs text-neutral-400">{col.tracks} tracks</p>
                                </div>
                           ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
