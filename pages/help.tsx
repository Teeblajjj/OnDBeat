import Head from 'next/head'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import PlayerBar from '../components/PlayerBar'
import CartModal from '../components/CartModal'
import { Search, ChevronDown, LifeBuoy, MessageSquare, BookOpen } from 'lucide-react'

const faqItems = [
  { q: "How do I upload my beats?", a: "From the sidebar, navigate to the 'Upload' page. You can drag and drop your audio files (MP3, WAV) and cover art, fill in the beat details like title, BPM, and key, set your licensing prices, and then hit 'Publish Beat'." },
  { q: "What are the different licensing options?", a: "We offer several license types, typically including Basic, Premium, and Exclusive. Each license grants the buyer different rights regarding usage, distribution, and ownership. You can set your own prices for each license when you upload a beat." },
  { q: "How do I get paid for my sales?", a: "Connect your preferred payment method (like Stripe or PayPal) in your account settings. Payouts are processed automatically after a sale is confirmed. Our platform fee is deducted from the total sale amount." },
  { q: "Can I promote my beats on ONDBeat?", a: "Yes! We offer promotional tools to help your music reach a wider audience. You can feature your tracks on the homepage, in curated playlists, and in targeted campaigns. Check the 'Promote' page for more details." },
  { q: "How does the community feature work?", a: "The community page is a space to connect with other artists and producers. You can share your work, ask for feedback, find collaborators, and participate in discussions about music production and the industry." },
];

// --- Page Component ---
export default function Help() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartContents] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const AccordionItem = ({ item, index, isActive, onToggle }) => (
    <div className="border-b border-neutral-800">
        <button onClick={() => onToggle(index)} className="w-full flex justify-between items-center text-left py-5 px-2">
            <span className={`text-lg font-medium ${isActive ? 'text-green-400' : 'text-white'}`}>{item.q}</span>
            <ChevronDown className={`w-6 h-6 transform transition-transform ${isActive ? 'rotate-180 text-green-400' : 'text-gray-400'}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-96' : 'max-h-0'}`}>
            <p className="pb-5 px-2 text-gray-300">{item.a}</p>
        </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Help Center - ONDBeat</title>
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onCartClick={() => setCartModalOpen(true)}
            cartItems={cartContents.length}
          />

          <main className="p-4 md:p-8 bg-gradient-to-b from-neutral-900 to-[#121212]">
             {/* --- Hero Section --- */}
            <div className="text-center py-12 md:py-20">
                <LifeBuoy size={48} className="mx-auto text-green-400 mb-4" />
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">How can we help?</h1>
                <p className="text-gray-400 text-lg mb-8">Search our knowledge base or contact us.</p>
                <div className="max-w-xl mx-auto relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text"
                        placeholder="Search for topics, questions..."
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-full py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow"
                    />
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                 {/* --- FAQ Section --- */}
                 <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
                    <div className="bg-[#181818] p-4 md:p-6 rounded-lg">
                       {faqItems.map((item, index) => (
                           <AccordionItem 
                               key={index} 
                               item={item} 
                               index={index} 
                               isActive={activeIndex === index}
                               onToggle={(idx) => setActiveIndex(activeIndex === idx ? null : idx)}
                           />
                       ))}
                    </div>
                 </div>

                {/* --- Contact Section --- */}
                <div className="text-center">
                     <h2 className="text-3xl font-bold text-white mb-6">Still need help?</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <div className="bg-[#181818] p-6 rounded-lg text-left hover:bg-[#282828] transition-colors cursor-pointer">
                            <MessageSquare className="text-green-400 mb-3" size={28} />
                            <h3 className="text-xl font-bold text-white mb-1">Contact Support</h3>
                            <p className="text-gray-400">Get in touch with our team directly for personalized assistance.</p>
                        </div>
                         <div className="bg-[#181818] p-6 rounded-lg text-left hover:bg-[#282828] transition-colors cursor-pointer">
                            <BookOpen className="text-green-400 mb-3" size={28} />
                            <h3 className="text-xl font-bold text-white mb-1">Platform Guides</h3>
                            <p className="text-gray-400">Browse our in-depth guides on using ONDBeat effectively.</p>
                        </div>
                     </div>
                </div>
            </div>
          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
          <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} cartItems={cartContents} onRemoveItem={() => {}} onUpdateQuantity={() => {}} onCheckout={() => {}} />
        </div>
      </div>
    </>
  )
}
