import Head from 'next/head';
import { useState } from 'react';
import { User, Lock, Share2, Bell } from 'lucide-react';
import Layout from '../../components/Layout';

const proSocieties = [
    { abbr: 'ASCAP', name: 'American Society of Composers, Authors and Publishers' },
    { abbr: 'BMI', name: 'Broadcast Music, Inc.' },
    { abbr: 'SESAC', name: 'Society of European Stage Authors and Composers' },
    { abbr: 'SOCAN', name: 'Society of Composers, Authors and Music Publishers of Canada' },
    { abbr: 'PRS for Music', name: 'Performing Right Society' },
    { abbr: 'GEMA', name: 'Gesellschaft für musikalische Aufführungs- und mechanische Vervielfältigungsrechte' },
    { abbr: 'SACEM', name: 'Société des Auteurs, Compositeurs et Éditeurs de Musique' },
    { abbr: 'APRA AMCOS', name: 'Australasian Performing Right Association and Australasian Mechanical Copyright Owners Society' },
    { abbr: 'JASRAC', name: 'Japanese Society for Rights of Authors, Composers and Publishers' },
    { abbr: 'SGAE', name: 'Sociedad General de Autores y Editores' },
    { abbr: 'STIM', name: 'Swedish Performing Rights Society' },
];

const SettingsLayout = ({ children, activeTab }) => {
    const tabs = [
        { id: 'profile', name: 'Edit Profile', icon: User, href: '/user/edit-profile' },
        { id: 'password', name: 'Password', icon: Lock, href: '/user/password' },
        { id: 'socials', name: 'Socials', icon: Share2, href: '/user/socials' },
        { id: 'notifications', name: 'Notifications', icon: Bell, href: '/user/notifications' },
    ];

    return (
        <Layout>
             <Head>
                <title>Edit Profile | ONDBEAT</title>
            </Head>
            <div className="max-w-6xl mx-auto p-4 sm:p-8 flex flex-col md:flex-row gap-8">
                <aside className="md:w-1/4">
                    <h2 className="text-xl font-bold text-white mb-6">Settings</h2>
                    <nav className="flex flex-col gap-2">
                        {tabs.map(tab => (
                            <a href={tab.href} key={tab.id} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-base font-medium ${activeTab === tab.id ? 'bg-green-500/10 text-green-400' : 'text-neutral-400 hover:bg-neutral-800/70'}`}>
                                <tab.icon size={20} />
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </aside>
                <main className="md:w-3/4">
                    {children}
                </main>
            </div>
        </Layout>
    )
}

export default function EditProfilePage() {
    const [pro, setPro] = useState('');
    const [ipi, setIpi] = useState('');

    const handleClearPro = () => {
        setPro('');
        setIpi('');
    };

    return (
        <SettingsLayout activeTab="profile">
            <div className="bg-neutral-900 border border-neutral-800/80 rounded-xl p-6 sm:p-8">
                <div className="space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-neutral-800 flex items-center justify-center">
                            <User className="text-neutral-500" size={48} />
                        </div>
                        <button className="bg-green-500 text-white font-bold py-2.5 px-5 rounded-lg hover:bg-green-600 transition-all text-sm">Upload New Image</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="font-medium text-neutral-300">First name</label>
                            <input type="text" className="w-full bg-neutral-800 border-transparent rounded-md py-3 px-4 text-white placeholder-neutral-500"/>
                        </div>
                        <div className="space-y-2">
                            <label className="font-medium text-neutral-300">Last name</label>
                            <input type="text" className="w-full bg-neutral-800 border-transparent rounded-md py-3 px-4 text-white placeholder-neutral-500"/>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="font-medium text-neutral-300">Display name</label>
                        <input type="text" value="Blajjjbeatz" className="w-full bg-neutral-800 border-transparent rounded-md py-3 px-4 text-white placeholder-neutral-500"/>
                    </div>

                    <div className="bg-neutral-800/50 p-5 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-white">Performing Rights Organisation info</h3>
                            <button onClick={handleClearPro} className="text-sm text-green-500 hover:underline">Clear all</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="font-medium text-neutral-300 text-sm">PRO</label>
                                <select value={pro} onChange={(e) => setPro(e.target.value)} className="w-full bg-neutral-700 border-transparent rounded-md py-3 px-4 text-white">
                                    <option value="">Select PRO society</option>
                                    {proSocieties.map(society => (
                                        <option key={society.abbr} value={society.abbr}>{society.abbr}</option>
                                    ))}
                                </select>
                            </div>
                             <div className="space-y-2">
                                <label className="font-medium text-neutral-300 text-sm">IPI</label>
                                <input type="text" value={ipi} onChange={(e) => setIpi(e.target.value)} className="w-full bg-neutral-700 border-transparent rounded-md py-3 px-4 text-white"/>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="font-medium text-neutral-300">Location</label>
                        <input type="text" placeholder="City, State (e.g. San Francisco, CA)" className="w-full bg-neutral-800 border-transparent rounded-md py-3 px-4 text-white placeholder-neutral-500"/>
                    </div>

                     <div className="space-y-2">
                        <label className="font-medium text-neutral-300">Biography</label>
                        <textarea rows="5" className="w-full bg-neutral-800 border-transparent rounded-md py-3 px-4 text-white placeholder-neutral-500"></textarea>
                    </div>

                    <div className="flex justify-start pt-4">
                        <button className="bg-green-500 text-white font-bold py-2.5 px-8 rounded-lg hover:bg-blue-500 transition-all shadow-md">Save Changes</button>
                    </div>
                </div>
            </div>
        </SettingsLayout>
    );
}
