import Link from 'next/link';
import {
    Home, 
    Search, 
    Library, 
    Plus, 
    ArrowRight, 
    Heart, 
    History, 
    Rocket, 
    ShoppingBag, 
    User as UserIcon,
    Briefcase,
    MessageSquare,
    Music,
    TrendingUp,
    DollarSign,
    LifeBuoy,
    Repeat // For the view switcher
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const mainNavLinks = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Store", href: "/store" },
    { icon: LifeBuoy, label: "Help Center", href: "/help" },
];

const userNavLinks = [
    { icon: UserIcon, label: "Profile", href: "/user/profile" },
    { icon: ShoppingBag, label: "My Orders", href: "/user/orders" },
    { icon: Heart, label: "Favorites", href: "/user/favorites" },
    { icon: History, label: "Listing History", href: "/user/history" },
];

const creatorNavLinks = [
    { icon: Briefcase, label: "Dashboard", href: "/creator/dashboard" },
    { icon: Music, label: "My Content", href: "/creator/my-beats" },
    { icon: TrendingUp, label: "Sales", href: "/creator/sales" },
    { icon: DollarSign, label: "Payouts", href: "/creator/payouts" },
    { icon: Rocket, label: "Promote", href: "/creator/promote" },
    { icon: MessageSquare, label: "Negotiations", href: "/creator/negotiations" },
];

const NavLink = ({ icon: Icon, label, href }) => {
    const router = useRouter();
    const active = router.pathname === href;

    return (
        <Link href={href} legacyBehavior>
            <a className={`flex items-center gap-4 px-6 py-2.5 text-md font-bold transition-colors ${active ? 'text-white' : 'text-neutral-400 hover:text-white'}`}>
                <Icon size={24} />
                <span>{label}</span>
            </a>
        </Link>
    );
};

const Sidebar = ({ mobileMenuOpen, onToggleMobileMenu }) => {
    const router = useRouter();
    const { user, viewAsCreator } = useAuth();

    return (
        <aside className={`fixed top-0 left-0 h-full bg-black text-white w-56 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform z-40 flex flex-col`}>
            <div className="py-6 px-6 mb-4">
                <h1 className="text-2xl font-bold text-green-500">ONDBeat</h1>
            </div>

            <nav className="flex flex-col gap-1">
                {mainNavLinks.map(link => <NavLink key={link.label} {...link} />)}
            </nav>
            
            <div className="flex-grow">
                {/* Show Creator Tools if viewing as creator */}
                {user && user.isCreator && viewAsCreator && (
                    <div className="mt-8">
                         <h2 className="px-6 mb-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">Creator Tools</h2>
                         <nav className="flex flex-col gap-1">
                            {creatorNavLinks.map(link => <NavLink key={link.label} {...link} />)}
                         </nav>
                    </div>
                )}
                
                {/* Show User Library if not viewing as creator */}
                {user && !viewAsCreator && (
                    <div className="mt-8">
                        <h2 className="px-6 mb-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">My Library</h2>
                        <nav className="flex flex-col gap-1">
                           {userNavLinks.map(link => <NavLink key={link.label} {...link} />)}
                        </nav>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
