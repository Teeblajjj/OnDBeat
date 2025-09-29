import Head from "next/head";
import { useRouter } from "next/router";
import { ChevronLeft, Download, Heart, Share2, ShoppingCart, Check } from "lucide-react";

// NOTE: This is a temporary data structure. 
const soundkitDetails = {
    id: 1,
    name: "Essential Trap & Drill Drum Kit",
    creator: "ProducerGrind",
    price: 39.99,
    cover: "https://images.unsplash.com/photo-1593113646773-4627116a537d?w=400&q=80",
    likes: 134,
    shares: 22,
    description: "The ultimate drum kit for modern trap and drill production. Contains everything you need to make bangers: punchy kicks, crisp snares, rattling hi-hats, and unique percs and FX.",
    tags: ["#trap", "#drill", "#drums", "#sound kit"],
    contents: [
        "25 808s & Kicks",
        "30 Snares & Claps",
        "40 Hi-Hats & Open-Hats",
        "20 Percs & Rims",
        "15 FX & Transitions",
        "10 Bonus Melody Loops"
    ],
    demoTracks: ["Demo Track 1", "Demo Track 2", "Demo Track 3"]
};

const relatedKits = [
    { id: 2, name: "Analog Dreams Lo-Fi Kit", creator: "Lo-Fi Luke", price: 29.99, cover: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80" },
    { id: 3, name: "Vocal Chop Essentials", creator: "Vocalize", price: 19.99, cover: "https://images.unsplash.com/photo-1588247866372-de3a1c8b353a?w=400&q=80" },
    { id: 4, name: "80s Synths & Retro Waves", creator: "RetrowaveRyan", price: 24.99, cover: "https://images.unsplash.com/photo-1531338700946-76e4c7ba1200?w=400&q=80" },
    { id: 5, name: "R&B Sauce Chord Pack", creator: "SaucyKeys", price: 15.00, cover: "https://images.unsplash.com/photo-1507525428034-b723a9ce6890?w=400&q=80" },
]

export default function SoundkitDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const soundkit = soundkitDetails; // Fetch soundkit by id in a real app

  return (
    <>
      <Head>
        <title>{soundkit.name} by {soundkit.creator} | ONDBeat</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
             <button onClick={() => router.back()} className="flex items-center gap-2 text-neutral-300 hover:text-white mb-8">
                <ChevronLeft size={20} />
                Back
            </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Kit Info */}
            <div className="lg:col-span-1 space-y-6">
                <img src={soundkit.cover} alt="Soundkit cover" className="w-full rounded-xl shadow-lg" />
                 <div className="flex justify-around bg-[#2a2a2a] p-3 rounded-lg">
                  <div className="text-center"><Heart className="mx-auto"/> <span className="text-xs">{soundkit.likes}</span></div>
                  <div className="text-center"><Share2 className="mx-auto"/> <span className="text-xs">{soundkit.shares}</span></div>
              </div>
                <h1 className="text-3xl font-bold">{soundkit.name}</h1>
                <p className="text-lg text-neutral-400">By {soundkit.creator}</p>
                <p className="text-neutral-300">{soundkit.description}</p>
                 <div className="bg-[#1a1a1a] p-4 rounded-xl border border-neutral-800">
                    <h3 className="font-semibold mb-3">TAGS</h3>
                    <div className="flex flex-wrap gap-2">
                        {soundkit.tags.map(tag => <span key={tag} className="px-3 py-1 bg-neutral-700 text-sm rounded-full cursor-pointer hover:bg-neutral-600">{tag}</span>)}
                    </div>
                </div>
            </div>

            {/* Right Column: Purchase, Contents, Demos */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-neutral-800">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <p className="text-4xl font-bold">${soundkit.price.toFixed(2)}</p>
                        <div className="flex gap-4 w-full md:w-auto">
                            <button className="flex-1 bg-neutral-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-neutral-600"><ShoppingCart className="inline-block mr-2"/> Add to Cart</button>
                            <button className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">Buy Now</button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-neutral-800">
                    <h2 className="text-2xl font-bold mb-4">What's Inside?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-neutral-300">
                        {soundkit.contents.map(item => (
                            <div key={item} className="flex items-center gap-3">
                                <Check size={18} className="text-green-500 flex-shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-neutral-800">
                    <h2 className="text-2xl font-bold mb-4">Demo Tracks</h2>
                    <div className="space-y-3">
                        {soundkit.demoTracks.map((track, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 bg-neutral-800 rounded-lg">
                                <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white"><Play size={20} className="ml-1"/></button>
                                <p>{track}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">You Might Also Like</h2>
                    <a href="#" className="text-sm font-bold text-neutral-400 hover:underline">See all</a>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedKits.map(kit => (
                        <div key={kit.id} className="bg-[#2a2a2a] p-3 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer">
                            <img src={kit.cover} alt={kit.name} className="w-full rounded-md mb-2"/>
                            <p className="font-bold text-sm truncate">{kit.name}</p>
                            <p className="text-xs text-neutral-400">${kit.price}</p>
                        </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
