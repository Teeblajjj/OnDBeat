import { Search, Menu, ShoppingCart, User, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

// Mocking the auth context for demonstration
// In a real app, you'd import this from your actual context file
const useAuth = () => ({
  user: { name: 'ProducerMike', avatar: 'https://via.placeholder.com/40' }, // or set to null to see logged-out state
  // user: null,
  openAuthModal: (mode) => console.log(`Opening auth modal: ${mode}`),
});

interface HeaderProps {
  onToggleMobileMenu: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCartClick: () => void;
  cartItems: number;
}

export default function Header({ onToggleMobileMenu, searchQuery, onSearchChange, onCartClick, cartItems }: HeaderProps) {
  const { user, openAuthModal } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
        className={`sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 py-3 transition-colors duration-300 ease-in-out 
        ${isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-neutral-800' : 'bg-transparent'}`}>
      
      {/* Left Section: Nav & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onToggleMobileMenu} className="md:hidden text-white">
          <Menu size={24} />
        </button>
        <div className="hidden md:flex items-center gap-2">
            <button className="bg-black/50 p-1.5 rounded-full text-white"><ChevronLeft size={22}/></button>
            <button className="bg-black/50 p-1.5 rounded-full text-white"><ChevronRight size={22}/></button>
        </div>
        <div className="w-full max-w-sm relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search for beats..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-neutral-800/80 border border-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-neutral-700/80 transition-colors"
            />
        </div>
      </div>
      
      {/* Right Section: Actions & User */}
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={onCartClick}
          className="relative text-white bg-black/50 hover:bg-black/80 p-2.5 rounded-full transition-colors"
        >
          <ShoppingCart size={20} />
          {cartItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems}
            </span>
          )}
        </button>

        {user ? (
            <div className="relative">
                <button className="flex items-center gap-2 bg-black/50 hover:bg-black/80 p-1 pr-2 rounded-full transition-colors">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover"/>
                    <span className="text-white font-semibold text-sm hidden lg:block">{user.name}</span>
                    <ChevronDown size={18} className="text-white hidden lg:block"/>
                </button>
                 {/* Dropdown menu can be implemented here */}
            </div>
        ) : (
            <div className="flex items-center gap-2">
                 <button 
                    onClick={() => openAuthModal('signup')}
                    className="text-gray-300 font-bold hover:text-white hover:scale-105 transition-transform px-4 py-2 hidden sm:block"
                >
                    Sign Up
                </button>
                 <button 
                    onClick={() => openAuthModal('signin')}
                    className="bg-white text-black font-bold rounded-full px-6 py-2.5 hover:scale-105 transition-transform"
                >
                    Log In
                </button>
            </div>
        )}
      </div>
    </header>
  );
}