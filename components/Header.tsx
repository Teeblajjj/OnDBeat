
import { Search, Menu, ShoppingCart, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  onToggleMobileMenu: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCartClick: () => void;
  cartItems: number;
}

export default function Header({ 
  onToggleMobileMenu, 
  searchQuery, 
  onSearchChange, 
  onCartClick,
  cartItems 
}: HeaderProps) {
  const { openAuthModal } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-neutral-900 flex items-center justify-between px-4 md:px-8 py-3 border-b border-neutral-800">
      <div className="flex items-center space-x-4">
        <button onClick={onToggleMobileMenu} className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-green-500 text-xl font-bold md:hidden">ONDBeat</h1>
      </div>
      
      <div className="flex-1 mx-4 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search beats, producers..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => openAuthModal('signup')}
          className="px-3 py-1 rounded-md bg-green-500 text-black hover:bg-green-400 text-sm transition-colors"
        >
          Start Selling
        </button>
        <div className="relative">
          <ShoppingCart 
            onClick={onCartClick}
            className="w-5 h-5 cursor-pointer hover:text-green-400 transition-colors" 
          />
          {cartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems}
            </span>
          )}
        </div>
        <button 
          onClick={() => openAuthModal('signin')}
          className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500"
        >
          <User className="w-4 h-4 text-white" />
        </button>
      </div>
    </header>
  );
}