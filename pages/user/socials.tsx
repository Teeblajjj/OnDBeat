import Head from 'next/head';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { User, Lock, Share2, Bell, Link as LinkIcon, Twitter, Instagram, Facebook } from 'lucide-react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const InputField = ({ label, type, placeholder, value, onChange, icon: Icon }) => (
    <div className="flex flex-col gap-2">
        <label className="font-semibold text-neutral-300">{label}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20}/>}
            <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full bg-neutral-800/60 border border-neutral-700/80 rounded-lg py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${Icon ? 'pl-10' : 'pl-4'}`}
            />
        </div>
    </div>
);

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
                <title>Settings | ONDBEAT</title>
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

export default function SocialsPage() {
    const { user } = useAuth();
    const [website, setWebsite] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSocials = async () => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setWebsite(data.socials?.website || '');
                    setTwitter(data.socials?.twitter || '');
                    setInstagram(data.socials?.instagram || '');
                    setFacebook(data.socials?.facebook || '');
                }
            }
        };
        fetchSocials();
    }, [user]);

    const handleSaveSocials = async () => {
        setLoading(true);
        if (!user) {
            toast.error("You must be logged in to save your socials.");
            setLoading(false);
            return;
        }

        try {
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, { 
                socials: { website, twitter, instagram, facebook }
            }, { merge: true });
            toast.success('Social links saved successfully!');
        } catch (error) {
            console.error("Error saving socials:", error);
            toast.error("Failed to save social links. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SettingsLayout activeTab="socials">
            <div className="bg-[#121212] border border-neutral-800/80 rounded-xl p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-white mb-6">Socials</h1>
                <div className="space-y-6">
                    <InputField label="Website" type="text" placeholder="https://" icon={LinkIcon} value={website} onChange={(e) => setWebsite(e.target.value)} />
                    <InputField label="Twitter" type="text" placeholder="https://twitter.com/" icon={Twitter} value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                    <InputField label="Instagram" type="text" placeholder="https://instagram.com/" icon={Instagram} value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                    <InputField label="Facebook" type="text" placeholder="https://facebook.com/" icon={Facebook} value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                </div>
                <div className="flex justify-end pt-8">
                    <button onClick={handleSaveSocials} disabled={loading} className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-500 transition-all shadow-md hover:shadow-green-500/20 disabled:bg-neutral-500">
                        {loading ? 'Saving...' : 'Save Socials'}
                    </button>
                </div>
            </div>
        </SettingsLayout>
    );
}
