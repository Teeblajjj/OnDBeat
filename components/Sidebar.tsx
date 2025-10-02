import Link from 'next/link';
import {
    Home, Compass, Users, Library, Heart, ListMusic, UploadCloud,
    LayoutDashboard, Music, Folder, Package, Image as ImageIcon,
    TrendingUp, DollarSign, FileText, Rocket, ChevronDown
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Main navigation links (for all users)
const mainNavLinks = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Compass, label: "Explore", href: "/explore" },
    { icon: Users, label: "Community", href: "/community" },
];

// User-specific library links
const userLibraryLinks = [
    { icon: Library, label: "Purchased", href: "/user/orders" },
    { icon: Heart, label: "Favorites", href: "/user/favorites" },
    { icon: ListMusic, label: "Playlists", href: "/user/playlists" },
];

// Creator-specific dashboard links
const creatorNavLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/creator/dashboard" },
    { 
        icon: Music, 
        label: "Content", 
        href: "/creator/content",
        subItems: [
            { label: "Tracks", href: "/creator/content/tracks" },
            { label: "Collections", href: "/creator/content/collections" },
            { label: "Sound Kits", href: "/creator/content/soundkits" },
            { label: "Media Files", href: "/creator/content/media-files" }, // Changed from Photos
        ]
    },
    { icon: TrendingUp, label: "Sales", href: "/creator/sales" },
    { icon: DollarSign, label: "Payouts", href: "/creator/payouts" },
    { icon: FileText, label: "Contracts", href: "/creator/contracts" },
    { icon: Rocket, label: "Promote", href: "/creator/promote" },
];

const NavLink = ({ icon: Icon, label, href, subItems }) => {
    const router = useRouter();
    const [isContentMenuOpen, setIsContentMenuOpen] = useState(router.pathname.startsWith(href));

    useEffect(() => {
        setIsContentMenuOpen(router.pathname.startsWith(href));
    }, [router.pathname, href]);

    const isActive = router.pathname === href || (subItems && router.pathname.startsWith(href));

    if (subItems) {
        return (
            <div>
                <button 
                    onClick={() => setIsContentMenuOpen(!isContentMenuOpen)}
                    className={`flex items-center justify-between w-full gap-4 px-5 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${isActive ? 'bg-green-600/10 text-green-300' : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-100'}`}
                >
                    <div className="flex items-center gap-4">
                        <Icon size={20} />
                        <span>{label}</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform ${isContentMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {isContentMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-8"
                        >
                            <div className="flex flex-col gap-1 py-2">
                                {subItems.map(subItem => <SubNavLink key={subItem.label} {...subItem} />)}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <Link href={href} legacyBehavior>
            <a className={`flex items-center gap-4 px-5 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${isActive ? 'bg-green-600/10 text-green-300' : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-100'}`}>
                <Icon size={20} />
                <span>{label}</span>
            </a>
        </Link>
    );
};

const SubNavLink = ({ label, href }) => {
    const router = useRouter();
    const isActive = router.pathname === href;
    return (
        <Link href={href} legacyBehavior>
            <a className={`block px-4 py-2 text-sm rounded-md ${isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}>
                {label}
            </a>
        </Link>
    );
}

const Sidebar = ({ mobileMenuOpen, onToggleMobileMenu }) => {
    const { user, viewAsCreator } = useAuth();

    return (
        <aside className={`fixed top-0 left-0 h-full bg-[#121212] text-white w-60 border-r border-neutral-800/50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform z-40 flex flex-col p-4`}>
            <div className="py-4 px-2 mb-4">
                <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
                    ONDBEAT
                </Link>
            </div>

            {user && user.isCreator && viewAsCreator && (
                 <Link href="/creator/upload" legacyBehavior>
                    <a className="flex items-center justify-center gap-2 mb-4 bg-green-500/10 border border-green-500/30 text-green-300 font-medium py-2.5 px-4 rounded-lg hover:bg-green-500/20 hover:text-green-200 transition-all">
                        <UploadCloud size={18}/>
                        <span>Upload</span>
                    </a>
                </Link>
            )}

            <nav className="flex flex-col gap-2">
                <h2 className="px-3 mt-2 mb-1 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Menu</h2>
                {mainNavLinks.map(link => <NavLink key={link.label} {...link} />)}
            </nav>
            
            <div className="flex-grow mt-4 overflow-y-auto">
                {user && !viewAsCreator && (
                    <div>
                        <h2 className="px-3 mt-4 mb-1 text-xs font-semibold text-neutral-500 uppercase tracking-wider">My Library</h2>
                        <nav className="flex flex-col gap-2">
                            {userLibraryLinks.map(link => <NavLink key={link.label} {...link} />)}
                        </nav>
                    </div>
                )}

                {user && user.isCreator && viewAsCreator && (
                    <div>
                         <h2 className="px-3 mt-4 mb-1 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Creator Studio</h2>
                         <nav className="flex flex-col gap-2">
                            {creatorNavLinks.map(link => <NavLink key={link.label} {...link} />)}
                         </nav>
                    </div>
                )}
            </div>

            <div className="mt-auto pb-4">
                 {user && !user?.isCreator && (
                     <Link href="/user/become-a-seller" legacyBehavior>
                        <a className="block p-4 bg-gradient-to-br from-green-900/50 to-neutral-800/50 rounded-lg border border-green-800/50">
                            <h3 className="font-bold text-white">Become a Creator</h3>
                            <p className="text-sm text-neutral-300 mt-1 mb-3">Start selling your beats and sounds to a global audience.</p>
                            <span className="block w-full text-center bg-green-500 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-green-600 transition-colors">
                                Get Started
                            </span>
                        </a>
                     </Link>
                 )}
                 <div className="border-t border-neutral-800/80 my-4"></div>
            </div>
        </aside>
    );
};

export default Sidebar;
