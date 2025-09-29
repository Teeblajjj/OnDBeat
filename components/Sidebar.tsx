import Link from 'next/link';
import { Home, Search, Library, Plus, ArrowRight, ListMusic, History, Rocket, ShoppingCart, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/router';

const mainNavLinks = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Store", href: "/store" },
    { icon: Rocket, label: "Promote", href: "/promote" },
];

const userLibraryLinks = [
    { icon: Library, label: "Your Library" },
    { icon: Plus, label: "Create Playlist" },
    { icon: ArrowRight, label: "Liked Songs" },
];

const userPlaylists = [
   { name: "My First EP", type: "playlist" },
   { name: "Recently Purchased", type: "playlist" },
   { name: "Trap Bangers", type: "playlist" },
   { name: "Lofi Beats", type: "playlist" },
];

const NavLink = ({ icon: Icon, label, href }) => {
    const router = useRouter();
    const active = router.pathname === href;

    return (
        <Link href={href} className={`flex items-center gap-4 px-6 py-2 text-md font-bold transition-colors ${active ? 'text-white' : 'text-neutral-400 hover:text-white'}`}>
            <Icon size={28} />
            <span>{label}</span>
        </Link>
    );
};

const Sidebar = ({ mobileMenuOpen, onToggleMobileMenu }) => {
    const router = useRouter();
    const isDashboard = router.pathname.startsWith('/user');

    return (
        <aside className={`fixed top-0 left-0 h-full bg-black text-white w-56 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform z-40`}>
            <div className="py-6">
                <div className="px-6 mb-8">
                    <h1 className="text-2xl font-bold text-green-500">ONDBeat</h1>
                </div>
                <nav className="flex flex-col gap-2">
                    {mainNavLinks.map(link => <NavLink key={link.label} {...link} />)}
                     {isDashboard && <NavLink icon={LayoutDashboard} label="Dashboard" href="/user/dashboard" />}
                </nav>
            </div>

            <div className="h-[calc(100%-14rem)] flex flex-col">
                 <div className="px-6 mt-6">
                    <div className="flex items-center justify-between text-neutral-400 mb-4">
                        <div className="flex items-center gap-2 font-bold cursor-pointer hover:text-white">
                            <Library />
                            <span>Your Library</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Plus className="cursor-pointer hover:text-white" />
                            <ArrowRight className="cursor-pointer hover:text-white" />
                        </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                        <button className="bg-neutral-800 text-white text-sm font-semibold px-3 py-1 rounded-full">Playlists</button>
                        <button className="bg-neutral-800 text-white text-sm font-semibold px-3 py-1 rounded-full">Artists</button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 scrollbar-thin scrollbar-thumb-neutral-700">
                    <div className="flex items-center justify-between text-neutral-400 mb-4">
                        <Search size={20}/>
                        <div className="flex items-center gap-1 text-sm font-semibold">
                            <span>Recents</span>
                            <ListMusic size={16}/>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {userPlaylists.map(item => (
                            <div key={item.name} className="flex items-center gap-3 cursor-pointer hover:bg-neutral-800/50 p-1 rounded">
                                <div className="w-12 h-12 bg-neutral-800 rounded-md"></div>
                                <div>
                                    <p className="font-semibold text-white">{item.name}</p>
                                    <p className="text-sm text-neutral-400">Playlist</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
