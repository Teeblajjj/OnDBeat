import Head from "next/head";
import { useState } from "react";
import { Users, MessageCircle, Heart, Share2, Search, Filter } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlayerBar from "../components/PlayerBar";
import { useAuth } from "../context/AuthContext";
import CartModal from "../components/CartModal";

export default function Community() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { openAuthModal } = useAuth();
  const [cartItems, setCartItems] = useState(0);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartContents, setCartContents] = useState<any[]>([]);

  const communityPosts = [
    {
      id: 1,
      user: "ProducerMike",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      time: "2 hours ago",
      content: "Just dropped a new trap beat! Check it out and let me know what you think 🔥",
      beatTitle: "Midnight Trap",
      beatUrl: "/api/audio",
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      user: "BeatMaker99",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      time: "4 hours ago",
      content: "Looking for a rapper to collaborate on this beat. Hit me up if you're interested!",
      beatTitle: "Urban Dreams",
      beatUrl: "/api/audio",
      likes: 18,
      comments: 12,
      shares: 5
    },
    {
      id: 3,
      user: "SoundWizard",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      time: "6 hours ago",
      content: "Sharing some production tips: Always layer your drums for that punchy sound!",
      beatTitle: "Production Tips",
      beatUrl: "/api/audio",
      likes: 31,
      comments: 15,
      shares: 8
    }
  ];

  return (
    <>
      <Head>
        <title>Community - ONDBeat</title>
        <meta name="description" content="Connect with producers, artists, and music creators in the ONDBeat community" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CartModal 
        isOpen={cartModalOpen} 
        onClose={() => setCartModalOpen(false)}
        cartItems={cartContents}
        onRemoveItem={() => {}}
        onUpdateQuantity={() => {}}
        onCheckout={() => {}}
      />

      <div className="min-h-screen bg-black text-white">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onCartClick={() => setCartModalOpen(true)}
            cartItems={cartItems}
          />

          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Community</h1>
                <p className="text-gray-400">Connect with producers, artists, and music creators</p>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search posts, users, beats..."
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="bg-neutral-800 hover:bg-neutral-700 px-4 py-3 rounded-lg flex items-center gap-2 transition-colors">
                  <Filter className="w-5 h-5" />
                  <span>Filter</span>
                </button>
              </div>

              {/* Community Posts */}
              <div className="space-y-6">
                {communityPosts.map((post) => (
                  <div key={post.id} className="bg-neutral-900 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={post.avatar}
                        alt={post.user}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{post.user}</h3>
                          <span className="text-gray-400 text-sm">{post.time}</span>
                        </div>
                        <p className="text-gray-300 mb-4">{post.content}</p>
                        
                        {/* Beat Preview */}
                        <div className="bg-neutral-800 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                              <span className="text-black font-bold">♪</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{post.beatTitle}</h4>
                              <p className="text-gray-400 text-sm">Beat Preview</p>
                            </div>
                            <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors">
                              Play
                            </button>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
                            <Heart className="w-5 h-5" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
                            <Share2 className="w-5 h-5" />
                            <span>{post.shares}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          <PlayerBar />
        </div>
      </div>
    </>
  );
}
