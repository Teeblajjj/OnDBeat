import { Search, ChevronDown, User, Menu, History, Settings, UserPlus, LogOut, Upload, Bell, Handshake, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
    const { user, viewAsCreator, toggleView, logout } = useAuth();
    const { openCart, cartItems } = useCart();
    const { openModal } = useModal();
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
    const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const notificationDropdownRef = useRef<HTMLDivElement>(null);

    const toggleUserDropdown = () => setUserDropdownOpen(!isUserDropdownOpen);
    const toggleNotificationDropdown = () => setNotificationDropdownOpen(!isNotificationDropdownOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setUserDropdownOpen(false);
            }
            if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
                setNotificationDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="bg-gradient-to-b from-neutral-900/60 to-transparent h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 backdrop-blur-sm">
            <div className="flex items-center gap-4">
                <button className="md:hidden" >
                    <Menu />
                </button>
                <div className="hidden md:flex items-center gap-2 bg-neutral-800/50 rounded-full px-4 py-2 border border-transparent focus-within:border-green-500">
                    <Search className="text-neutral-400" size={20}/>
                    <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none text-white"/>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                     <div className="flex items-center gap-4">
                        {user.isCreator && viewAsCreator && (
                            <button onClick={() => openModal('upload')} className="hidden md:flex items-center gap-2 bg-neutral-800/80 hover:bg-neutral-700/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                <Upload size={18} />
                                <span>Upload</span>
                            </button>
                        )}
                        <button onClick={openCart} className="relative p-2 rounded-full hover:bg-neutral-800/60">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300 hover:text-white"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                            {cartItemCount > 0 && 
                                <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            }
                        </button>
                        <div className="relative" ref={notificationDropdownRef}>
                            <button onClick={toggleNotificationDropdown} className="relative p-2 rounded-full hover:bg-neutral-800/60">
                                <Bell size={24} className="text-neutral-300 hover:text-white"/>
                            </button>
                            <NotificationDropdown isOpen={isNotificationDropdownOpen} />
                        </div>
     
                        <div className="relative" ref={userDropdownRef}>
                            <button onClick={toggleUserDropdown} className="flex items-center gap-2 bg-neutral-800/80 rounded-full p-1 pr-3 hover:bg-neutral-700/80 transition-colors">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt={user.displayName || 'User Avatar'} className="w-7 h-7 rounded-full object-cover" />
                                ) : (
                                    <User size={28} className="bg-neutral-600 text-white rounded-full p-1"/>
                                )}
                                <span className="font-semibold text-sm hidden sm:block">{user.displayName}</span>
                                <ChevronDown size={18} className={`text-neutral-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`}/>
                            </button>
                            {isUserDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-[#1c1c1c] border border-neutral-800 rounded-lg shadow-lg py-1 z-50">
                                    <Link href="/user/profile" legacyBehavior><a className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700/60"><User size={16}/>My Profile</a></Link>
                                    <Link href="/user/history" legacyBehavior><a className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700/60"><History size={16}/>History</a></Link>
                                    <Link href="/user/negotiations" legacyBehavior><a className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700/60"><Handshake size={16}/>Negotiations</a></Link>
                                    <div className="border-t border-neutral-800 my-1"></div>
                                    <Link href="/user/edit-profile" legacyBehavior><a className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700/60"><Settings size={16}/>Settings</a></Link>
                                    <Link href="/help" legacyBehavior><a className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700/60"><HelpCircle size={16}/>Help & Support</a></Link>
                                    {user.isCreator && (
                                        <>
                                            <div className="border-t border-neutral-800 my-1"></div>
                                            <div className="px-4 py-2 flex items-center justify-between">
                                                <label htmlFor="view-toggle" className="text-sm font-medium text-neutral-300">Creator Mode</label>
                                                <div onClick={toggleView} className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${viewAsCreator ? 'bg-green-500' : 'bg-neutral-700'}`}>
                                                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${viewAsCreator ? 'translate-x-6' : 'translate-x-1'}`}/>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div className="border-t border-neutral-800 my-1"></div>
                                    <button onClick={logout} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"><LogOut size={16}/>Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <button onClick={() => openModal('auth', { initialMode: 'signup' })} className="hidden md:block bg-transparent text-neutral-300 font-bold py-2 px-4 rounded-full hover:text-white transition-colors">
                            Sign Up
                        </button>
                        <button onClick={() => openModal('auth', { initialMode: 'signin' })} className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-neutral-200 transition-colors">
                            Sign In
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
