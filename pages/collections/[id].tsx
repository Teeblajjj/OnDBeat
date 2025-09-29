import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { Play, Pause, Heart, Share2, MoreVertical, MessageSquare, ChevronLeft, ChevronRight, ListMusic, Grid } from "lucide-react";
import PlayerBar from "../../components/PlayerBar";
import BeatModal from "../../components/BeatModal";
import CartModal from "../../components/CartModal";

// NOTE: This is a temporary data structure. We will fetch this from a database later.
const collectionDetails = {
    id: 1,
    name: "(70% OFF) TOP 7 KANYE BEATS WITH BEAT...",
    creator: "Morgan",
    published: "Sep 15, 2025",
    about: "A bundle of 7 top-selling Kanye beats! 3 beats include best switches.",
    tags: ["#beat switch", "#experimental", "#kanye west"],
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80",
    price: 149.00,
    likes: 18,
    comments: 0,
    shares: 0,
    tracks: [
        { id: 1, title: "FALL IN LOVE [KANYE x SAMPLE]", bpm: 144, tags: ["#playboi carti", "#kanye west"], price: 59.90, isFree: true, cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80" },
        { id: 2, title: "HIGHS & LOWS [KANYE x TRAVIS SCOTT]", bpm: 165, tags: ["#kanye west type be...", "#travis scott"], price: 59.90, isFree: false, cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&q=80" },
        { id: 3, title: "MANY TIMES [BUY 2 GET 1 FREE] $40 Unlimited", bpm: 125, tags: ["#ty dolla $ign", "#kanye west"], price: 59.90, isFree: true, cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
        { id: 4, title: "GIVE IT ALL [KANYE x CARTI]", bpm: 122, tags: ["#beat switch", "#playboi carti"], price: 59.90, isFree: true, cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80" },
        { id: 5, title: "SEE THE LIGHT [SAMPLE]", bpm: 154, tags: ["#playboi carti", "#the weeknd"], price: 59.90, isFree: false, cover: "https://images.unsplash.com/photo-1458560871784-56d23406c791?w=400&q=80" },
        { id: 6, title: "ALL FOR YOU [KANYE x CARTI]", bpm: 155, tags: ["#playboi carti", "#experimental"], price: 59.90, isFree: false, cover: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&q=80" },
        { id: 7, title: "CARRY YOU HOME [KANYE x CINEMATIC]", bpm: 90, tags: ["#james blake", "#kanye west"], price: 59.90, isFree: false, cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80" },
    ]
}

const relatedCollections = [
    { id: 1, name: "Post Punk Type Beats", creator: "Center Kiddo", tracks: 3, price: 299.99, cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80"},
    { id: 2, name: "Trap Beats & Melodies Vol. 1", creator: "K. Lewis Muzik", tracks: 23, price: 249.99, cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80"},
    { id: 3, name: "#1 BEST SELLING KANYE W...", creator: "producerX", tracks: 45, price: 25.00, cover: "https://images.unsplash.com/photo-1542360291-a888d36a5b7c?w=400&q=80"},
    { id: 4, name: "*Best* Future Type Be...", creator: "Prod1399", tracks: 35, price: 25.00, cover: "https://images.unsplash.com/photo-1588247866372-de3a1c8b353a?w=400&q=80"},
]

export default function CollectionDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const collection = collectionDetails; // Fetch collection by id in a real app
  
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBeatModalOpen, setBeatModalOpen] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [selectedBeat, setSelectedBeat] = useState(null);
  const [cartContents, setCartContents] = useState([]);

  const togglePlay = (trackId) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
    }
  };

  const openBeatModal = (beat) => {
    setSelectedBeat(beat);
    setBeatModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>{collection.name} by {collection.creator} | ONDBeat</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-neutral-300 hover:text-white mb-8">
                <ChevronLeft size={20} />
                Back
            </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6 lg:sticky top-8 self-start">
              <img src={collection.cover} alt="Collection cover" className="w-full rounded-xl shadow-lg" />
                <div className="flex justify-around bg-[#2a2a2a] p-3 rounded-lg">
                  <div className="text-center cursor-pointer"><Heart className="mx-auto"/> <span className="text-xs">{collection.likes}</span></div>
                  <div className="text-center cursor-pointer"><MessageSquare className="mx-auto"/> <span className="text-xs">{collection.comments}</span></div>
                  <div className="text-center cursor-pointer"><Share2 className="mx-auto"/> <span className="text-xs">{collection.shares}</span></div>
              </div>
              <button className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">Buy from ${collection.price.toFixed(2)}</button>
              <div className="bg-[#1a1a1a] p-4 rounded-xl border border-neutral-800">
                  <h3 className="font-semibold mb-2">INFORMATION</h3>
                  <p className="text-sm text-neutral-300">Published: {collection.published}</p>
              </div>
               <div className="bg-[#1a1a1a] p-4 rounded-xl border border-neutral-800">
                    <h3 className="font-semibold mb-3">TAGS</h3>
                    <div className="flex flex-wrap gap-2">
                        {collection.tags.map(tag => <span key={tag} className="px-3 py-1 bg-neutral-700 text-sm rounded-full cursor-pointer hover:bg-neutral-600">{tag}</span>)}
                    </div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-neutral-800">
                    <h3 className="font-semibold mb-3">ABOUT</h3>
                    <p className="text-sm text-neutral-300">{collection.about}</p>
                </div>
                 <button className="w-full text-left p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-neutral-400">Report Album</button>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{collection.tracks.length} Tracks</h2>
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-neutral-800 rounded-md"><ListMusic size={20}/></button>
                        <button className="p-2 bg-neutral-700 rounded-md"><Grid size={20}/></button>
                    </div>
                </div>

                <div className="space-y-2">
                    {collection.tracks.map((track, index) => (
                        <div key={track.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-neutral-800/80 transition-colors group">
                            <button onClick={() => togglePlay(track.id)} className="w-12 h-12 flex-shrink-0 bg-cover bg-center rounded-md flex items-center justify-center" style={{backgroundImage: `url(${track.cover})`}}>
                               <div className="w-full h-full bg-black/50 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                 {isPlaying && currentTrack === track.id ? <Pause/> : <Play />}
                               </div>
                            </button>
                            <Link href={`/beats/${track.id}`} legacyBehavior><a className="flex-grow">
                                <p className="font-bold text-white">{index + 1}. {track.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    {track.tags.map(tag => <span key={tag} className="text-xs bg-neutral-700 px-2 py-0.5 rounded">{tag}</span>)}
                                    <span className="text-xs text-neutral-400">- {track.bpm} BPM</span>
                                </div>
                            </a></Link>
                            <div className="flex items-center gap-4">
                                {track.isFree && <span className="text-xs font-bold uppercase bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Free</span>}
                                <button onClick={() => openBeatModal(track)} className={`font-bold py-1 px-4 rounded-full text-sm ${track.isFree ? 'bg-transparent border border-blue-500 text-blue-500' : 'bg-blue-600 text-white'}`}>
                                    ${track.price.toFixed(2)}
                                </button>
                                <button className="text-neutral-400 hover:text-white"><MoreVertical size={20} /></button>
                            </div>
                        </div>
                    ))}
                </div>
                
              <div>
                 <div className="flex justify-between items-center mb-4 mt-12">
                    <h2 className="text-2xl font-bold">Related Collections</h2>
                     <div className="flex items-center gap-2">
                        <button className="bg-black/50 rounded-full p-1 hover:bg-white/20"><ChevronLeft size={20} /></button>
                        <button className="bg-black/50 rounded-full p-1 hover:bg-white/20"><ChevronRight size={20} /></button>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {relatedCollections.map(item => (
                        <Link href={`/collections/${item.id}`} key={item.id} legacyBehavior>
                            <a className="bg-[#2a2a2a] p-3 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer">
                                <img src={item.cover} alt={item.name} className="w-full rounded-md mb-2"/>
                                <p className="font-bold text-sm truncate">{item.name}</p>
                                <p className="text-xs text-neutral-400">By {item.creator}</p>
                            </a>
                        </Link>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    {/* <PlayerBar isPlaying={isPlaying} onPlayPause={() => setIsPlaying(!isPlaying)} currentTrack={collection.tracks.find(t => t.id === currentTrack)} progress={30} />
    <BeatModal isOpen={isBeatModalOpen} onClose={() => setBeatModalOpen(false)} beat={selectedBeat} onAddToCart={() => {}} onBuyNow={() => {}} />
    <CartModal isOpen={isCartModalOpen} onClose={() => setCartModalOpen(false)} cartItems={cartContents} onCheckout={() => {}} /> */}
    </>
  );
}
