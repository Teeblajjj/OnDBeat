import { Search, ChevronDown, User, Menu, History, Settings, UserPlus, LogOut, Bell, Handshake, GitMerge } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const Header = () => {
    const { user, viewAsCreator, toggleView, openAuthModal, logout } = useAuth();
    const { openCart, cartItems } = useCart();
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
    const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const notificationDropdownRef = useRef<HTMLDivElement>(null);

    const handleAuthClick = () => {
        openAuthModal('signin');
    };

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

    // Mock notifications data
    const notifications = [
        { id: 1, type: 'like', text: 'Someone liked your track "Sunset Groove".', time: '2 minutes ago' },
        { id: 2, type: 'comment', text: 'John Doe commented on your track.', time: '1 hour ago' },
        { id: 3, type: 'follow', text: 'Jane Smith is now following you.', time: '3 hours ago' },
    ];

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

            <div className="flex items-center gap-6">
                {user && user.isCreator && (
                     <div className="flex items-center gap-2">
                        <label htmlFor="view-toggle" className="text-sm font-medium text-neutral-300">Creator Mode</label>
                        <div onClick={toggleView} className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${viewAsCreator ? 'bg-green-500' : 'bg-neutral-700'}`}>
                            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${viewAsCreator ? 'translate-x-6' : 'translate-x-1'}`}/>
                        </div>
                    </div>
                )}
               
                {user ? (
                     <div className="flex items-center gap-4">
                         <Link href="/user/negotiations" className="relative text-neutral-300 hover:text-white">
                            <Handshake size={22} />
                        </Link>
                        <Link href="/user/collaborations" className="relative text-neutral-300 hover:text-white">
                            <GitMerge size={22} />
                        </Link>

                        <button onClick={openCart} className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300 hover:text-white"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                            {cartItemCount > 0 && 
                                <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            }
                        </button>

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
                                <div className="absolute right-0 mt-2 w-48 bg-[#1c1c1c] border border-neutral-800 rounded-lg shadow-lg py-1 z-50">
                                    <Link href="/user/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700/60"><User size={16}/>My Profile</Link>
                                    <Link href="/user/history" className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700/60"><History size={16}/>History</Link>
                                    <Link href="/user/edit-profile" className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700/60"><Settings size={16}/>Settings</Link>
                                    <Link href="/user/invite-a-friend" className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700/60"><UserPlus size={16}/>Invite a Friend</Link>
                                    <div className="border-t border-neutral-800 my-1"></div>
                                    <button onClick={logout} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"><LogOut size={16}/>Logout</button>
                                </div>
                            )}
                        </div>
                        <div className="relative self-end" ref={notificationDropdownRef}>
                            <button onClick={toggleNotificationDropdown} className="relative text-neutral-300 hover:text-white">
                                <Bell size={22} />
                                {notifications.length > 0 && 
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                        {notifications.length}
                                    </span>
                                }
                            </button>
                            {isNotificationDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-80 bg-[#1c1c1c] border border-neutral-700 rounded-lg shadow-lg z-50">
                                    <div className="flex justify-between items-center px-4 py-2 border-b border-neutral-700/80">
                                        <h3 className="font-semibold text-white">Notifications</h3>
                                        <Link href="/user/notifications" className="text-sm text-green-400 hover:underline">Settings</Link>
                                    </div>
                                    <div className="py-1 max-h-80 overflow-y-auto">
                                        {notifications.map(notif => (
                                            <div key={notif.id} className="px-4 py-2.5 text-sm text-neutral-300 hover:bg-neutral-700/60 cursor-pointer border-b border-neutral-800/60">
                                                <p>{notif.text}</p>
                                                <p className="text-xs text-neutral-500 mt-1">{notif.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                     <Link href="/user/notifications-all" className="block w-full text-center px-4 py-2.5 text-sm text-green-400 hover:bg-neutral-700/70 font-semibold">
                                        View all notifications
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <button onClick={() => openAuthModal('signup')} className="hidden md:block bg-transparent text-neutral-300 font-bold py-2 px-4 rounded-full hover:text-white transition-colors">
                            Sign Up
                        </button>
                        <button onClick={handleAuthClick} className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-neutral-200 transition-colors">
                            Sign In
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
