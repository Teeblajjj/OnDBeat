import { Music } from 'lucide-react';

const footerLinks = {
    "Company": ["About", "Jobs", "For the Record"],
    "Communities": ["For Artists", "Developers", "Advertising", "Investors", "Vendors"],
    "Useful links": ["Support", "Free Mobile App"],
}

export default function Footer() {
  return (
    <footer className="bg-[#121212] border-t border-neutral-800/50 text-white md:ml-56">
        <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <Music className="text-green-500" size={32}/>
                        <span className="text-2xl font-bold">ONDBeat</span>
                    </div>
                    <p className="text-neutral-400 text-sm">The #1 marketplace for producers and artists to connect.</p>
                </div>

                {Object.entries(footerLinks).map(([title, links]) => (
                     <div key={title}>
                        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">{title}</h3>
                        <ul className="space-y-3">
                            {links.map(link => (
                                <li key={link}>
                                    <a href="#" className="text-white hover:text-green-400 font-medium transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-12 pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row justify-between items-center">
                <p className="text-neutral-500 text-sm">
                    &copy; {new Date().getFullYear()} ONDBeat. All Rights Reserved.
                </p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm">Legal</a>
                    <a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm">Privacy Center</a>
                    <a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm">Cookies</a>
                </div>
            </div>
        </div>
    </footer>
  )
}
