import Head from 'next/head';
import { User, Lock, Share2, Bell } from 'lucide-react';
import Layout from '../../components/Layout';

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

export default function PasswordPage() {
    return (
        <SettingsLayout activeTab="password">
            <div className="bg-[#121212] border border-neutral-800/80 rounded-xl p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-white mb-6">Password</h1>
                <div className="space-y-6">
                    <InputField label="Current Password" type="password" placeholder="Enter your current password" icon={Lock} />
                    <InputField label="New Password" type="password" placeholder="Enter your new password" icon={Lock} />
                    <InputField label="Confirm New Password" type="password" placeholder="Confirm your new password" icon={Lock} />
                </div>
                 <div className="flex justify-end pt-8">
                    <button className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-500 transition-all shadow-md hover:shadow-green-500/20">Update Password</button>
                </div>
            </div>
        </SettingsLayout>
    );
}
