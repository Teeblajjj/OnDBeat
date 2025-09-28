import Head from "next/head";
import { useState } from "react";
import { Rocket, Target, DollarSign, TrendingUp, Users, Calendar, CheckCircle } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlayerBar from "../components/PlayerBar";
import { useAuth } from "../context/AuthContext";
import CartModal from "../components/CartModal";

export default function Promote() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBeat, setSelectedBeat] = useState(null);
  const [promotionType, setPromotionType] = useState("featured");
  const { openAuthModal } = useAuth();
  const [cartItems, setCartItems] = useState(0);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartContents, setCartContents] = useState<any[]>([]);

  const promotionOptions = [
    {
      id: "featured",
      name: "Featured Placement",
      description: "Get your beat featured on the homepage and marketplace",
      price: 29.99,
      duration: "7 days",
      reach: "10,000+ views",
      icon: Target
    },
    {
      id: "social",
      name: "Social Media Boost",
      description: "Promote your beat across our social media channels",
      price: 49.99,
      duration: "3 days",
      reach: "25,000+ impressions",
      icon: Users
    },
    {
      id: "email",
      name: "Email Campaign",
      description: "Send your beat to our subscriber list",
      price: 79.99,
      duration: "1 day",
      reach: "50,000+ subscribers",
      icon: Calendar
    },
    {
      id: "premium",
      name: "Premium Package",
      description: "Complete promotion across all channels",
      price: 149.99,
      duration: "14 days",
      reach: "100,000+ reach",
      icon: Rocket
    }
  ];

  const userBeats = [
    { id: 1, title: "Midnight Trap", plays: 2341, likes: 89 },
    { id: 2, title: "Urban Dreams", plays: 1892, likes: 67 },
    { id: 3, title: "Street Vibes", plays: 1654, likes: 54 },
    { id: 4, title: "City Lights", plays: 1432, likes: 43 }
  ];

  const successStories = [
    {
      producer: "MikeTheProducer",
      beat: "Dark Nights",
      result: "Featured placement increased plays by 300%",
      revenue: "+$1,200"
    },
    {
      producer: "BeatMaker99",
      beat: "Summer Vibes",
      result: "Social boost led to 5 new collaborations",
      revenue: "+$800"
    },
    {
      producer: "SoundWizard",
      beat: "Urban Flow",
      result: "Email campaign generated 50+ downloads",
      revenue: "+$2,100"
    }
  ];

  return (
    <>
      <Head>
        <title>Promote - ONDBeat</title>
        <meta name="description" content="Promote your beats and increase visibility with ONDBeat marketing tools" />
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
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Promote Your Beats</h1>
                <p className="text-gray-400">Increase visibility and reach more potential buyers</p>
              </div>

              {/* Success Stories */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {successStories.map((story, index) => (
                    <div key={index} className="bg-black/20 rounded-lg p-4">
                      <h3 className="font-semibold">{story.producer}</h3>
                      <p className="text-sm text-gray-200 mb-2">"{story.beat}"</p>
                      <p className="text-sm text-green-200">{story.result}</p>
                      <p className="text-sm font-semibold text-green-300">{story.revenue}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beat Selection */}
              <div className="bg-neutral-900 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Select Beat to Promote</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {userBeats.map((beat) => (
                    <div 
                      key={beat.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedBeat === beat.id 
                          ? "border-green-500 bg-green-500/10" 
                          : "border-neutral-700 hover:border-neutral-600"
                      }`}
                      onClick={() => setSelectedBeat(beat.id)}
                    >
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-black font-bold">♪</span>
                      </div>
                      <h3 className="font-semibold mb-2">{beat.title}</h3>
                      <div className="text-sm text-gray-400">
                        <p>{beat.plays.toLocaleString()} plays</p>
                        <p>{beat.likes} likes</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promotion Options */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-6">Choose Promotion Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {promotionOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <div 
                        key={option.id}
                        className={`p-6 rounded-lg border-2 cursor-pointer transition-colors ${
                          promotionType === option.id 
                            ? "border-green-500 bg-green-500/10" 
                            : "border-neutral-700 hover:border-neutral-600"
                        }`}
                        onClick={() => setPromotionType(option.id)}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <IconComponent className="w-8 h-8 text-green-400" />
                          <span className="text-2xl font-bold text-green-400">${option.price}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{option.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{option.description}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Duration:</span>
                            <span>{option.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Reach:</span>
                            <span>{option.reach}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Promotion Summary */}
              {selectedBeat && (
                <div className="bg-neutral-900 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-bold mb-4">Promotion Summary</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Selected Beat</h3>
                      <p className="text-gray-400">
                        {userBeats.find(beat => beat.id === selectedBeat)?.title}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Promotion Type</h3>
                      <p className="text-gray-400">
                        {promotionOptions.find(option => option.id === promotionType)?.name}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Duration</h3>
                      <p className="text-gray-400">
                        {promotionOptions.find(option => option.id === promotionType)?.duration}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Total Cost</h3>
                      <p className="text-green-400 text-xl font-bold">
                        ${promotionOptions.find(option => option.id === promotionType)?.price}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  className="bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  disabled={!selectedBeat}
                >
                  <Rocket className="w-5 h-5" />
                  Start Promotion
                </button>
                <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Save for Later
                </button>
              </div>

              {/* Promotion Tips */}
              <div className="bg-neutral-900 rounded-lg p-6 mt-8">
                <h2 className="text-xl font-bold mb-4">Promotion Tips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Best Times to Promote
                    </h3>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Friday evenings (6-9 PM)</li>
                      <li>• Weekend afternoons</li>
                      <li>• During major music events</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      Maximize Results
                    </h3>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Use engaging beat titles</li>
                      <li>• Include relevant tags</li>
                      <li>• Respond to comments quickly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <PlayerBar />
        </div>
      </div>
    </>
  );
}
