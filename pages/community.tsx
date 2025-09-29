import Head from 'next/head'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import PlayerBar from '../components/PlayerBar'
import CartModal from '../components/CartModal'
import { Users, MessageCircle, Heart, Share2, Search, Edit, Music, Mic, BarChartHorizontal } from 'lucide-react'

// --- Dummy Data ---
const communityPosts = [
  {
    id: 1, user: "ProducerMike", avatar: "https://randomuser.me/api/portraits/men/32.jpg", time: "2h ago",
    content: "Just dropped a new lofi beat called 'City Sleep'. Really tried to capture that late-night vibe. Would love to hear what you guys think! Link below. #lofi #beats",
    likes: 42, comments: 18, shares: 7,
    beat: { title: "City Sleep", producer: "ProducerMike", cover: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=100&q=80" }
  },
  {
    id: 2, user: "VocalistVibes", avatar: "https://randomuser.me/api/portraits/women/44.jpg", time: "5h ago",
    content: "Looking for a drill beat for a new track. Something with a hard 808 and a dark melody. Anyone got anything? Drop your links! #drill #collaboration",
    likes: 29, comments: 25, shares: 4
  },
  {
    id: 3, user: "Syndrome", avatar: "https://randomuser.me/api/portraits/men/45.jpg", time: "1d ago",
    content: "Quick production tip: Sidechain your kick to your bassline to make the kick punch through the mix. It cleans up the low end massively. #produtciontips",
    likes: 157, comments: 32, shares: 21
  },
];

const trendingTopics = ["#drill", "#ableton", "#collaboration", "#newmusic", "#feedback"];
const whoToFollow = [
    { name: "Metro Boomin", handle: "@metroboomin", avatar: "https://randomuser.me/api/portraits/men/51.jpg" },
    { name: "Tems", handle: "@temsbaby", avatar: "https://randomuser.me/api/portraits/women/62.jpg" },
    { name: "Sarz", handle: "@only1sarz", avatar: "https://randomuser.me/api/portraits/men/63.jpg" },
];

// --- Page Component ---
export default function Community() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartContents] = useState<any[]>([]);

  // --- Sub-components for styling ---
  const PostCard = ({ post }) => (
    <div className="bg-[#181818] p-5 rounded-lg border border-transparent hover:border-neutral-700 transition-colors">
        <div className="flex items-start gap-4">
            <img src={post.avatar} alt={post.user} className="w-11 h-11 rounded-full object-cover" />
            <div className="flex-1">
                <div className="flex items-baseline gap-2">
                    <p className="font-bold text-white hover:underline cursor-pointer">{post.user}</p>
                    <span className="text-gray-500 text-sm">· {post.time}</span>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{post.content}</p>
                {post.beat && (
                    <div className="mt-3 border border-neutral-700 rounded-lg p-3 flex items-center gap-4 hover:bg-neutral-700/50 cursor-pointer">
                        <img src={post.beat.cover} alt={post.beat.title} className="w-12 h-12 rounded object-cover" />
                        <div>
                            <p className="font-semibold text-white">{post.beat.title}</p>
                            <p className="text-sm text-gray-400">{post.beat.producer}</p>
                        </div>
                    </div>
                )}
                <div className="flex items-center gap-6 mt-4 text-gray-500">
                    <button className="flex items-center gap-2 hover:text-red-500 transition-colors"><Heart size={18} /> <span className="text-sm">{post.likes}</span></button>
                    <button className="flex items-center gap-2 hover:text-blue-500 transition-colors"><MessageCircle size={18} /> <span className="text-sm">{post.comments}</span></button>
                    <button className="flex items-center gap-2 hover:text-green-500 transition-colors"><Share2 size={18} /> <span className="text-sm">{post.shares}</span></button>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Community - ONDBeat</title>
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
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- Main Feed --- */}
                <div className="lg:col-span-2">
                    <div className="mb-6">
                        <div className="bg-[#181818] p-4 rounded-lg flex gap-4">
                            <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" className="w-11 h-11 rounded-full" />
                            <div className="flex-1">
                                <textarea className="w-full bg-transparent text-lg text-white placeholder-gray-500 focus:outline-none resize-none" rows={2} placeholder="What's on your mind?"/>
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-700/50">
                                    <div className="flex items-center gap-4 text-green-400">
                                        <button className="hover:bg-neutral-700/50 p-2 rounded-full"><Music size={20} /></button>
                                        <button className="hover:bg-neutral-700/50 p-2 rounded-full"><Mic size={20} /></button>
                                        <button className="hover:bg-neutral-700/50 p-2 rounded-full"><BarChartHorizontal size={20}/></button>
                                    </div>
                                    <button className="bg-green-500 text-black font-bold text-sm py-2 px-5 rounded-full hover:bg-green-600 transition-colors">Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {communityPosts.map(post => <PostCard key={post.id} post={post} />)}
                    </div>
                </div>

                {/* --- Side Bar --- */}
                <aside className="space-y-6">
                    <div className="bg-[#181818] p-5 rounded-lg">
                        <h3 className="text-xl font-bold text-white mb-4">Trending Topics</h3>
                        <div className="space-y-3">
                            {trendingTopics.map(topic => (
                                <a href="#" key={topic} className="block text-gray-300 hover:text-white hover:underline">{topic}</a>
                            ))}
                        </div>
                    </div>
                    <div className="bg-[#181818] p-5 rounded-lg">
                        <h3 className="text-xl font-bold text-white mb-4">Who to Follow</h3>
                        <div className="space-y-4">
                            {whoToFollow.map(user => (
                                <div key={user.handle} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-bold text-white hover:underline cursor-pointer">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.handle}</p>
                                        </div>
                                    </div>
                                    <button className="bg-white/10 text-white text-sm font-bold py-1.5 px-4 rounded-full hover:bg-white/20 transition-colors">Follow</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
          <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} cartItems={cartContents} onRemoveItem={() => {}} onUpdateQuantity={() => {}} onCheckout={() => {}} />
        </div>
      </div>
    </>
  )
}
