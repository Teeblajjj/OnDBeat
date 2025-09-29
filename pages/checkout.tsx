import Head from 'next/head'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import PlayerBar from '../components/PlayerBar'
import CartModal from '../components/CartModal'
import { ShoppingCart, X, CheckCircle, CreditCard, Download, Lock } from 'lucide-react'

interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
  cover: string;
}

const sampleCart: Beat[] = [
  { id: 1, title: "Sunset Drive", producer: "Metro Boomin", price: 35, cover: "https://images.unsplash.com/photo-1516999654410-482a4c2fee14?w=400&q=80" },
  { id: 2, title: "City Lights", producer: "The Weeknd", price: 55, cover: "https://images.unsplash.com/photo-1519892338195-e1b93931f681?w=400&q=80" },
];

// --- Page Component ---
export default function Checkout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cart, setCart] = useState<Beat[]>(sampleCart);
  const [isPaid, setIsPaid] = useState(false);

  const total = cart.reduce((sum, beat) => sum + beat.price, 0);

  const handleRemove = (id: number) => {
    setCart(cart.filter(beat => beat.id !== id));
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaid(true);
  };
  
  const FormInput = ({ label, placeholder, type = "text" }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
        <input 
            type={type} 
            placeholder={placeholder}
            className="w-full p-3 rounded-md bg-neutral-800 border border-neutral-700 text-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
        />
    </div>
  );

  // --- Main Render ---
  return (
    <>
      <Head>
        <title>Checkout - ONDBeat</title>
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onCartClick={() => setCartModalOpen(true)}
            cartItems={cart.length}
          />

          <main className="p-4 md:p-8 bg-gradient-to-b from-neutral-900 to-[#121212]">
            <div className="max-w-4xl mx-auto">

              {!isPaid ? (
                // --- CHECKOUT FORM --- 
                <>
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-extrabold text-white mb-2">Checkout</h1>
                        <p className="text-gray-400 text-lg">Finalize your order.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* --- Cart Summary --- */}
                        <div className="lg:col-span-3 bg-[#181818] p-6 rounded-lg">
                           <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                           {cart.length > 0 ? (
                               <div className="space-y-4">
                                   {cart.map(beat => (
                                       <div key={beat.id} className="flex items-center justify-between">
                                           <div className="flex items-center gap-4">
                                               <img src={beat.cover} alt={beat.title} className="w-14 h-14 object-cover rounded-md" />
                                               <div>
                                                   <p className="font-semibold text-white">{beat.title}</p>
                                                   <p className="text-gray-400 text-sm">{beat.producer}</p>
                                               </div>
                                           </div>
                                           <div className="flex items-center gap-4">
                                                <p className="font-bold text-white">${beat.price.toFixed(2)}</p>
                                                <button onClick={() => handleRemove(beat.id)} className="text-neutral-500 hover:text-white transition-colors p-1"><X size={18} /></button>
                                           </div>
                                       </div>
                                   ))}
                                   <div className="border-t border-neutral-700 mt-4 pt-4 flex justify-between items-center">
                                       <p className="text-lg font-semibold text-white">Total</p>
                                       <p className="text-2xl font-bold text-white">${total.toFixed(2)}</p>
                                   </div>
                               </div>
                           ) : (
                                <div className="text-center py-10">
                                    <ShoppingCart size={40} className="mx-auto text-neutral-600 mb-4" />
                                    <p className="text-gray-400">Your cart is empty.</p>
                                </div>
                           )}
                        </div>

                        {/* --- Payment Form --- */}
                        <div className="lg:col-span-2 bg-[#181818] p-6 rounded-lg">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><CreditCard size={20} /> Payment</h2>
                            <form onSubmit={handlePay} className="space-y-4">
                                <FormInput label="Cardholder Name" placeholder="John M. Doe" />
                                <FormInput label="Card Number" placeholder="1234 5678 9012 3456" />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput label="Expiry Date" placeholder="MM/YY" />
                                    <FormInput label="CVC" placeholder="123" />
                                </div>
                                <div className="pt-4">
                                    <button 
                                        type="submit" 
                                        disabled={cart.length === 0}
                                        className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <Lock size={16} />
                                        Pay ${total.toFixed(2)}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
              ) : (
                // --- CONFIRMATION SCREEN ---
                <div className="text-center bg-[#181818] p-8 rounded-lg">
                    <CheckCircle size={60} className="mx-auto text-green-500 mb-4" />
                    <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
                    <p className="text-gray-400 mb-8">Your order is complete. Download your files below.</p>

                    <div className="max-w-lg mx-auto space-y-4 mb-8 text-left">
                        {cart.map(beat => (
                            <div key={beat.id} className="flex items-center justify-between bg-neutral-800 p-4 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <img src={beat.cover} alt={beat.title} className="w-14 h-14 object-cover rounded-md" />
                                    <div>
                                        <p className="font-semibold text-white">{beat.title}</p>
                                        <p className="text-gray-400 text-sm">{beat.producer}</p>
                                    </div>
                                </div>
                                <a href="#" download className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-full transition-colors flex items-center gap-2 text-sm">
                                    <Download size={16} />
                                    <span>Download</span>
                                </a>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => window.location.href = '/'} className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-full transition-colors">
                        Continue Browsing
                    </button>
                </div>
              )}
            </div>
          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
          <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} cartItems={[]} onRemoveItem={() => {}} onUpdateQuantity={() => {}} onCheckout={() => {}} />
        </div>
      </div>
    </>
  )
}
