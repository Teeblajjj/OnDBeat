
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { Play, Pause, Heart, Share2, Download, MessageSquare, ChevronLeft, ChevronRight, Home, Star } from "lucide-react";
import PlayerBar from "../../components/PlayerBar";
import BeatCard from "../../components/BeatCard";
import CartModal from "../../components/CartModal";
import LicenseSelector from "../../components/LicenseSelector";



// NOTE: This is a temporary data structure.
const sampleBeat = {
  id: 1,
  title: "Renfe",
  producer: "Al Safir Type Beat",
  price: 9.99,
  bpm: 102,
  key: "F min",
  tags: ["#afro", "#chill"],
  published: "Aug 12, 2025",
  cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
  likes: 12,
  comments: 1,
  shares: 8,
  plays: "1.4k",
  licenses: [
    { name: "Basic", price: 9.99, description: "MP3" },
    { name: "Premium", price: 29.99, description: "MP3, WAV" },
    { name: "Exclusive", price: 0, description: "Negotiate price" },
  ],
  usageTerms: [
    "USE FOR MUSIC RECORDING",
    "DISTRIBUTE UP TO 2,000 COPIES",
    "100,000 ONLINE AUDIO STREAMS",
    "1 MUSIC VIDEO",
    "FOR PROFIT LIVE PERFORMANCES",
    "RADIO BROADCASTING RIGHTS (2 STATIONS)",
  ],
};

const relatedTracks = [
    { id: 7, title: "Negroni", producer: "Afrobeat x Jorja Smith", price: 24.95, cover: "https://images.unsplash.com/photo-1458560871784-56d23406c791?w=400&q=80" },
    { id: 8, title: "i-guide", producer: "Al Safir Type Beat - Ori...", price: 20.00, cover: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&q=80" },
    { id: 9, title: "Rolly", producer: "Al Safir Type Beat", price: 9.99, cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80" },
    { id: 10, title: "Free", producer: "d r i l l p a c k", price: 0, cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&q=80" },
    { id: 11, title: "Narcos", producer: "Narcos Type Beat", price: 15.50, cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
];

export default function BeatDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const beat = sampleBeat;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [cartContents, setCartContents] = useState([]);

  const addToCart = (license) => {
    const item = { beat, license, quantity: 1 };
    setCartContents(prev => [...prev, item]);
    setCartModalOpen(true);
  };

  const handleBuyNow = (license) => {
      addToCart(license);
      router.push("/checkout");
  }
  
    const handleRemoveItem = (beatId) => {
      setCartContents(prev => prev.filter(item => item.beat.id !== beatId));
  }

  const handleUpdateQuantity = (beatId, quantity) => {
      setCartContents(prev => prev.map(item => item.beat.id === beatId ? { ...item, quantity } : item));
  }


  return (
    <>
      <Head>
        <title>{beat.title} - {beat.producer} | ONDBeat</title>
      </Head>
      <div className="min-h-screen bg-[#121212] text-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6 lg:sticky top-8 self-start">
               <div className="relative">
                 <div className="aspect-w-1 aspect-h-1">
                    <img src={beat.cover} alt="Beat cover" className="w-full h-full object-cover rounded-xl shadow-lg" />
                 </div>
                <button onClick={() => setIsPlaying(!isPlaying)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                    {isPlaying ? <Pause size={40}/> : <Play size={40} className="ml-2"/>}
                </button>
              </div>
                <div>
                  <h1 className="text-4xl font-extrabold">{beat.title}</h1>
                  <p className="text-xl text-neutral-400">{beat.producer}</p>
              </div>
              <div className="flex justify-around bg-[#181818] p-4 rounded-xl">
                  <div className="text-center cursor-pointer text-neutral-300 hover:text-white"><Heart className="mx-auto mb-1"/> <span className="text-sm font-bold">{beat.likes}</span></div>
                  <div className="text-center cursor-pointer text-neutral-300 hover:text-white"><Share2 className="mx-auto mb-1"/> <span className="text-sm font-bold">{beat.shares}</span></div>
                  <div className="text-center cursor-pointer text-neutral-300 hover:text-white"><Download className="mx-auto mb-1"/> <span className="text-sm font-bold">Free</span></div>
              </div>
                <button className="w-full flex items-center justify-center gap-2 bg-[#181818] hover:bg-[#282828] p-3 rounded-lg text-sm font-semibold text-neutral-200">
                    <Download size={18}/>
                    Download for free
                </button>
              <div className="bg-[#181818] p-5 rounded-xl">
                  <h3 className="font-bold mb-3 text-neutral-400 text-sm tracking-wider">INFORMATION</h3>
                  <div className="text-sm text-neutral-200 space-y-2">
                      <div className="flex justify-between"><span className="text-neutral-400">Published</span> <span>{beat.published}</span></div>
                      <div className="flex justify-between"><span className="text-neutral-400">BPM</span> <span>{beat.bpm}</span></div>
                      <div className="flex justify-between"><span className="text-neutral-400">Key</span> <span>{beat.key}</span></div>
                       <div className="flex justify-between"><span className="text-neutral-400">Plays</span> <span>{beat.plays}</span></div>
                  </div>
              </div>
               <div className="bg-[#181818] p-5 rounded-xl">
                    <h3 className="font-bold mb-3 text-neutral-400 text-sm tracking-wider">TAGS</h3>
                    <div className="flex flex-wrap gap-2">
                        {beat.tags.map(tag => <span key={tag} className="px-3 py-1 bg-neutral-700/50 text-sm rounded-full cursor-pointer hover:bg-neutral-700">{tag}</span>)}
                    </div>
                </div>
                 <button className="w-full text-left p-3.5 bg-[#181818] hover:bg-[#282828] rounded-lg text-sm font-semibold text-neutral-400">Report Track</button>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-8 mt-16 lg:mt-0">
              <LicenseSelector licenses={beat.licenses} onAddToCart={addToCart} onBuyNow={handleBuyNow} />

              {/* Usage Terms */}
              <div className="bg-[#181818] p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Usage Terms</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-neutral-300">
                    {beat.usageTerms.map(term => (
                        <div key={term} className="flex items-center gap-3">
                            <Star size={18} className="text-green-400 flex-shrink-0"/>
                            <span>{term}</span>
                        </div>
                    ))}
                </div>
              </div>
                {/* Comments */}
              <div className="bg-[#181818] p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                <div className="flex gap-4">
                    <img src="/path-to-user-avatar.png" alt="Your avatar" className="w-10 h-10 rounded-full bg-neutral-700"/>
                    <input type="text" placeholder="Share your thoughts..." className="w-full bg-neutral-800/50 border border-neutral-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                 <div className="mt-8 text-center text-neutral-500">
                    <p className="font-semibold">No comments yet.</p>
                    <p className="text-sm">Be the first to share some love!</p>
                </div>
              </div>


              {/* More from Producer */}
              <div>
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">More from {beat.producer}</h2>
                    <a href="#" className="text-sm font-bold text-neutral-400 hover:underline">See all</a>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedTracks.slice(0, 4).map(track => (
                         <BeatCard key={track.id} beat={track}/>
                    ))}
                 </div>
              </div>
              

              {/* Related Tracks */}
               <div>
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Related Tracks</h2>
                     <div className="flex items-center gap-2">
                        <button className="bg-black/50 rounded-full p-1 hover:bg-white/20 transition-colors"><ChevronLeft size={22} /></button>
                        <button className="bg-black/50 rounded-full p-1 hover:bg-white/20 transition-colors"><ChevronRight size={22} /></button>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {relatedTracks.map(track => (
                        <BeatCard key={track.id} beat={track}/>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <PlayerBar isPlaying={isPlaying} onPlayPause={() => setIsPlaying(!isPlaying)} currentTrack={beat} progress={30} />
    <CartModal isOpen={isCartModalOpen} onClose={() => setCartModalOpen(false)} cartItems={cartContents} onRemoveItem={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity} onCheckout={() => router.push("/checkout")} />
    </>
  );
}
