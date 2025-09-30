import { useState, useRef, useEffect } from 'react';
import { Menu, Search, ShoppingCart, User as UserIcon, Repeat, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ onToggleMobileMenu, onCartClick, cartItems }) => {
    const { user, openAuthModal, viewAsCreator, toggleView, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between bg-black/50 backdrop-blur-md px-4 sm:px-6 py-3">
            <div className="flex items-center gap-4">
                <button onClick={onToggleMobileMenu} className="md:hidden text-white">
                    <Menu />
                </button>
                <div className="relative flex-grow md:flex-grow-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20}/>
                    <input type="text" placeholder="Search for beats, artists, or genres" className="bg-neutral-800 border-transparent rounded-full pl-10 pr-4 py-2 text-white placeholder-neutral-500 w-full md:w-64 lg:w-96" />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button onClick={onCartClick} className="relative text-white p-2 rounded-full hover:bg-neutral-800">
                    <ShoppingCart />
                    {cartItems > 0 && <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartItems}</span>}
                </button>

                {user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 text-white p-1 pr-2 rounded-full hover:bg-neutral-800">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <span className="hidden sm:inline font-semibold">{user.name}</span>
                            <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg overflow-hidden">
                                <button onClick={() => { toggleView(); setDropdownOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-neutral-300 hover:bg-neutral-700">
                                    <Repeat size={16} />
                                    <span>Switch to {viewAsCreator ? 'User' : 'Creator'}</span>
                                </button>
                                <button onClick={() => { logout(); setDropdownOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-neutral-700">
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <button onClick={() => openAuthModal('signin')} className="text-neutral-400 font-bold hover:text-white">Sign In</button>
                        <button onClick={() => openAuthModal('signup')} className="bg-white text-black font-bold py-2 px-4 rounded-full">Sign Up</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
