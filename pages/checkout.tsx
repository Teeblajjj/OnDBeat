import Head from "next/head";
import { 
  ShoppingCart, X, CheckCircle, Play, Pause,
  Home, Package, CreditCard, Download, Music2 
} from "lucide-react";
import { useState } from "react";

interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
  cover: string;
}

// This will be replaced with actual cart data from context or props
const sampleCart: Beat[] = [
  { id: 1, title: "lil mosey x nav type beat – 'spaceship'", producer: "LuckyBoy @prodbyluckyboy", price: 10, cover: "https://placehold.co/300x300/1a1a1a/white?text=BEAT" },
  { id: 2, title: "Better with time – Neo Soul Type Beat", producer: "BeatStars @beatstars", price: 15, cover: "https://placehold.co/300x300/1a1a1a/white?text=BEAT" },
];

export default function Checkout() {
  const [cart, setCart] = useState<Beat[]>(sampleCart);
  const [isPaid, setIsPaid] = useState(false);
  const [playingBeat, setPlayingBeat] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const total = cart.reduce((sum, beat) => sum + beat.price, 0);

  const handleRemove = (id: number) => {
    setCart(cart.filter(beat => beat.id !== id));
  };

  const handlePay = () => {
    setIsPaid(true);
  };

  const togglePlay = (id: number) => {
    if (playingBeat === id) setIsPlaying(!isPlaying);
    else { setPlayingBeat(id); setIsPlaying(true); }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] min-h-screen text-[#e6e6e6]">
      <Head>
        <title>Checkout - ONDBeat</title>
        <meta name="description" content="Checkout page for ONDBeat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1ed760]/20 rounded-full mb-6">
            <ShoppingCart className="w-8 h-8 text-[#1ed760]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1ed760] to-[#53c268] bg-clip-text text-transparent mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Secure checkout for your selected beats. All transactions are encrypted and secure.
          </p>
        </div>

        {!isPaid && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Section */}
            <div className="lg:col-span-2">
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl border border-[#222] p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Music2 className="w-5 h-5 text-[#1ed760]" />
                    Your Cart ({cart.length})
                  </h2>
                  {cart.length > 0 && (
                    <span className="text-lg font-bold text-[#1ed760]">
                      ${total}.00
                    </span>
                  )}
                </div>
                
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400 text-lg">Your cart is empty</p>
                    <button 
                      onClick={() => window.location.href = '/'}
                      className="mt-4 bg-[#1ed760] hover:bg-[#53c268] text-black px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105"
                    >
                      Browse Beats
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((beat) => (
                      <div key={beat.id} className="flex items-center justify-between p-4 bg-[#222]/30 rounded-xl border border-[#2a2a2a] hover:border-[#1ed760]/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <img src={beat.cover} alt={beat.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Play className="w-6 h-6 text-[#1ed760]" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white truncate">{beat.title}</p>
                            <p className="text-gray-400 text-sm truncate">by {beat.producer}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#1ed760] whitespace-nowrap">${beat.price}.00</span>
                          <button 
                            onClick={() => handleRemove(beat.id)}
                            className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-full transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Section */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl border border-[#222] p-6 md:p-8 sticky top-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#1ed760]" />
                  Payment Details
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full p-3 rounded-xl bg-[#0f0f0f] border border-[#222] text-[#e6e6e6] focus:ring-2 focus:ring-[#1ed760] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 rounded-xl bg-[#0f0f0f] border border-[#222] text-[#e6e6e6] focus:ring-2 focus:ring-[#1ed760] outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        className="w-full p-3 rounded-xl bg-[#0f0f0f] border border-[#222] text-[#e6e6e6] focus:ring-2 focus:ring-[#1ed760] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">CVC</label>
                      <input 
                        type="text" 
                        placeholder="123"
                        className="w-full p-3 rounded-xl bg-[#0f0f0f] border border-[#222] text-[#e6e6e6] focus:ring-2 focus:ring-[#1ed760] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#222] pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-2xl font-bold text-white">${total}.00</span>
                  </div>
                  <button 
                    onClick={handlePay}
                    disabled={cart.length === 0}
                    className="w-full bg-gradient-to-r from-[#1ed760] to-[#53c268] hover:from-[#53c268] hover:to-[#1ed760] text-black px-6 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isPaid && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#1ed760]/20 rounded-full mb-8">
              <CheckCircle className="w-12 h-12 text-[#1ed760]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Payment Successful!</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Your beats have been purchased successfully. You can now download and use them according to your license terms.
            </p>

            <div className="max-w-2xl mx-auto space-y-6 mb-12">
              {cart.map((beat) => (
                <div key={beat.id} className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl border border-[#222] p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={beat.cover} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="text-left">
                        <p className="font-semibold text-white">{beat.title}</p>
                        <p className="text-gray-400 text-sm">by {beat.producer}</p>
                        <p className="text-[#1ed760] font-bold text-sm mt-1">${beat.price}.00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => togglePlay(beat.id)}
                        className="bg-[#1ed760]/20 hover:bg-[#1ed760]/30 text-[#1ed760] px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        {playingBeat === beat.id && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        Preview
                      </button>
                      <a
                        href={`/downloads/${beat.id}.mp3`}
                        download
                        className="bg-gradient-to-r from-[#1ed760] to-[#53c268] hover:from-[#53c268] hover:to-[#1ed760] text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button 
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-[#1a1a1a] hover:bg-[#222] border border-[#222] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Home className="w-5 h-5" />
                Go to Home
              </button>
              <button 
                onClick={() => window.location.href = '/orders'}
                className="flex-1 bg-gradient-to-r from-[#1ed760] to-[#53c268] hover:from-[#53c268] hover:to-[#1ed760] text-black px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Package className="w-5 h-5" />
                Manage Orders
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}