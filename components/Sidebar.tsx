import Link from "next/link";
import { HomeIcon, Users, Music, BarChart2Icon, AudioWaveform, HelpCircleIcon, ShoppingBagIcon, Rocket } from "lucide-react";

interface SidebarProps {
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export default function Sidebar({ mobileMenuOpen, onToggleMobileMenu }: SidebarProps) {
  const sidebarItems = [
    { label: "Home", icon: HomeIcon, href: "/" },
    { label: "Store", icon: Music, href: "/store" },
    { label: "Community", icon: Users, href: "/community" },
    { label: "Analytics", icon: BarChart2Icon, href: "/analytics" },
    { label: "Audio Tools", icon: AudioWaveform, href: "/tools" },
    { label: "Help & Tips", icon: HelpCircleIcon, href: "/help" },
    { label: "Promote", icon: Rocket, href: "/promote" },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 md:hidden" onClick={onToggleMobileMenu}>
          <div className="w-64 h-full bg-neutral-950 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-green-500 text-2xl font-bold">ONDBeat</h1>
              <button onClick={onToggleMobileMenu} className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="space-y-4">
              {sidebarItems.map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <Link key={i} href={item.href} className="flex items-center space-x-2 hover:text-green-400 transition-colors">
                    <IconComponent className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="w-56 bg-neutral-950 p-6 hidden md:flex flex-col fixed h-screen">
        <h1 className="text-green-500 text-2xl font-bold mb-8">ONDBeat</h1>
        <nav className="space-y-4">
          {sidebarItems.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <Link key={i} href={item.href} className="flex items-center space-x-2 hover:text-green-400 transition-colors">
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
