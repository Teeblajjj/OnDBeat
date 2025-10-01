import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Play, Pause, ShoppingCart, Heart, MessageCircle, Upload, MoreVertical, UserCircle, Compass, Star, Users, Music } from "lucide-react";
import Layout from "../components/Layout";
import BeatModal from "../components/BeatModal";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { usePlayer } from "../context/PlayerContext";

// --- Interfaces ---
interface License { name: string; price: number; files: string; recommended?: boolean; features: string[]; }
interface Beat { id: number; title: string; producer: string; producerHandle: string; price: number; cover: string; bpm: number; tags: string[]; description: string; isFree?: boolean; licenses: License[]; likes: number; comments: number; shares: number; released: string; postedAt: string; isSponsored?: boolean;}
interface Creator { id: number; name: string; handle: string; image: string; followers: number; isVerified: boolean; isAd?: boolean; }

// --- Component ---
export default function Home() {
  // --- State & Hooks ---
  const [isLicenseModalOpen, setLicenseModalOpen] = useState(false);
  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<number | null>(0);
  const router = useRouter();
  const { addToCart } = useCart();
  const { playTrack, currentTrack, isPlaying } = usePlayer();
  const { user } = useAuth();

  // --- Dummy Data ---
  const feedItems: Beat[] = [
    { id: 1, title: "SPIN BOUT U | DINA AYADA, KEE NOLA, DA...", producer: "DatBoiDJ", producerHandle: "datboidj", price: 14.99, cover: "", bpm: 142, tags: ["afro", "drill", "hard"], description: "BUY 2 GET 8 FREE - \"TAKE10\" FOR 10% OFF...", licenses: [], likes: 18, comments: 1, shares: 0, released: "Jul 15, 2025", postedAt: "4m", isSponsored: true },
    { id: 2, title: "Attitude (Central Cee x Sexy Drill)", producer: "Side Effects", producerHandle: "sideeffectsbeats", price: 47.00, cover: "", bpm: 110, tags: ["pop", "chill", "upbeat"], description: "...", licenses: [], likes: 4, comments: 1, shares: 0, released: "Aug 31, 2025", postedAt: "7m" },
    { id: 3, title: "Lagos City Lights", producer: "Olamide", producerHandle: "olamide", price: 29.95, cover: "", bpm: 120, tags: ["r&b", "soul", "smooth"], description: "...", licenses: [], likes: 150, comments: 23, shares: 12, released: "Jan 10, 2025", postedAt: "2h" },
  ];

  const topProducers: Creator[] = [
    { id: 1, name: "Dakota Parker", handle: "dkota", image: "", followers: 99600, isVerified: true, isAd: true },
    { id: 2, name: "Loudestro R...", handle: "loudestro", image: "", followers: 97100, isVerified: true, isAd: true },
    { id: 3, name: "Fantom", handle: "fantom", image: "", followers: 516300, isVerified: false, isAd: true },
    { id: 4, name: "Encore", handle: "encore", image: "", followers: 148600, isVerified: false, isAd: true },
    { id: 5, name: "BigBadBeats", handle: "bigbad", image: "", followers: 246000, isVerified: true, isAd: true },
    { id: 6, name: "Mazz Music", handle: "mazzmusic", image: "", followers: 51700, isVerified: false, isAd: true },
  ];

  // --- Handlers ---
  const openLicenseModal = (beat: Beat) => { setSelectedBeat(beat); setLicenseModalOpen(true); };
  const closeLicenseModal = () => { setLicenseModalOpen(false); setSelectedBeat(null); };
  const handleAddToCart = () => { /* addToCart logic */ closeLicenseModal(); };
  const handleBuyNow = () => { /* addToCart and redirect logic */ router.push("/checkout"); };

  // --- Components ---
  const FeedItem = ({ beat }: { beat: Beat }) => (
    <div className="bg-[#1c1c1c] border border-neutral-800 rounded-lg p-4 sm:p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <UserCircle size={40} className="text-neutral-500" />
          <div>
            <p className="font-bold text-white">{beat.producer} <span className="font-normal text-neutral-400 text-sm">@{beat.producerHandle}</span></p>
            <p className="text-sm text-neutral-500">{beat.postedAt} ago {beat.isSponsored && <span className="text-xs text-neutral-500">• Sponsored</span>}</p>
          </div>
        </div>
        <button className="text-neutral-400 hover:text-white">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-40 h-40 bg-neutral-800 rounded-md flex-shrink-0 flex items-center justify-center">
            <Music size={60} className="text-neutral-600" />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-3">
            <button onClick={() => playTrack(beat)} className="text-white">
              {currentTrack?.id === beat.id && isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>
            <h3 className="text-xl sm:text-2xl font-bold text-white flex-grow">{beat.title}</h3>
          </div>
          <p className="text-neutral-400 mt-2">Released on {beat.released}</p>
          <p className="text-neutral-300 my-3 text-sm">{beat.description}</p>
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
            <ShoppingCart size={16} />
            <span>${beat.price}</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 text-neutral-400 mt-4 pt-4 border-t border-neutral-800">
        <div className="flex items-center gap-2"><Heart size={20} /> <span>{beat.likes}</span></div>
        <div className="flex items-center gap-2"><MessageCircle size={20} /> <span>{beat.comments}</span></div>
        <div className="flex items-center gap-2"><Upload size={20} /> <span>{beat.shares}</span></div>
      </div>
    </div>
  );

  const TopProducersList = ({ producers }: { producers: Creator[] }) => (
    <section className="bg-neutral-900/70 border border-neutral-800/80 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Top Producers</h3>
      <div className="space-y-4">
        {producers.map(p => (
          <div key={p.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <UserCircle size={44} className="text-neutral-500" />
                <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">{p.name}</p>
                      {p.isAd && <span className="bg-neutral-700 text-neutral-300 text-xs font-bold px-1.5 py-0.5 rounded-sm">AD</span>}
                    </div>
                    <p className="text-sm text-neutral-400">{(p.followers / 1000).toFixed(1)}k followers</p>
                </div>
            </div>
            <button className="bg-blue-600 text-white text-sm font-bold px-4 py-1.5 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">Follow</button>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <Layout>
      <Head>
        <title>Feed - ONDBEAT</title>
      </Head>
      <div className="p-4 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold text-white">Feed</h2>
            {feedItems.map(beat => <FeedItem key={beat.id} beat={beat} />)}
          </div>

          {/* Sidebar Content */}
          <div className="space-y-8">
            <TopProducersList producers={topProducers} />
            <section className="bg-neutral-900/70 border border-neutral-800/80 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Discover More</h3>
              <div className="flex flex-col gap-3">
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800/60 transition-colors"><Compass size={20} className="text-green-400"/><span>Browse Genres</span></Link>
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800/60 transition-colors"><Star size={20} className="text-yellow-400"/><span>Top Charts</span></Link>
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800/60 transition-colors"><Users size={20} className="text-blue-400"/><span>Community Picks</span></Link>
              </div>
            </section>
          </div>
        </div>
      </div>
      <BeatModal isOpen={isLicenseModalOpen} onClose={closeLicenseModal} beat={selectedBeat} selectedLicense={selectedLicense} onLicenseSelect={setSelectedLicense} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
    </Layout>
  );
}
