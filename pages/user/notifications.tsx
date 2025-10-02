import { useState } from 'react';
import Head from 'next/head';
import { User, Lock, Share2, Bell } from 'lucide-react';
import Layout from '../../components/Layout';

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
                <title>Notifications | ONDBEAT</title>
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
    );
};

const NotificationToggle = ({ title, description, checked, onChange }) => (
    <div className="flex items-center justify-between bg-neutral-800/50 p-4 rounded-lg">
        <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-neutral-400">{description}</p>
        </div>
        <div onClick={onChange} className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${checked ? 'bg-green-500' : 'bg-neutral-700'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}/>
        </div>
    </div>
);

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState({
        comments: true,
        likes: true,
        newFollower: false,
    });

    const handleToggle = (key) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <SettingsLayout activeTab="notifications">
            <div className="bg-[#121212] border border-neutral-800/80 rounded-xl p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-white mb-2">Notifications</h1>
                <p className="text-neutral-400 mb-6">Manage how you receive notifications.</p>
                <div className="space-y-2">
                    <NotificationToggle title="Comments" description="Notify me when someone comments on my track." checked={notifications.comments} onChange={() => handleToggle('comments')} />
                    <NotificationToggle title="Likes" description="Notify me when someone likes my track." checked={notifications.likes} onChange={() => handleToggle('likes')} />
                    <NotificationToggle title="New Follower" description="Notify me when someone starts following me." checked={notifications.newFollower} onChange={() => handleToggle('newFollower')} />
                </div>
            </div>
        </SettingsLayout>
    );
}
