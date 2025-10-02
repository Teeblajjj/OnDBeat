import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, ArrowLeft, Heart, MessageSquare, UserPlus as FollowIcon, Bell, MoreHorizontal } from 'lucide-react';
import Layout from '../../components/Layout';

const notificationIcons = {
    like: <Heart className="text-red-500" size={24} />,
    comment: <MessageSquare className="text-blue-500" size={24} />,
    follow: <FollowIcon className="text-green-500" size={24} />,
    default: <Bell className="text-neutral-400" size={24} />,
};

const NotificationItem = ({ notification }) => {
    const { type, text, time } = notification;
    const icon = notificationIcons[type] || notificationIcons.default;

    return (
        <div className="flex items-start gap-4 p-4 bg-neutral-900 border border-neutral-800/80 rounded-lg hover:bg-neutral-800/70 transition-colors">
            <div className="flex-shrink-0 mt-1">{icon}</div>
            <div className="flex-grow">
                <p className="text-neutral-200">{text}</p>
                <p className="text-xs text-neutral-400 mt-1">{time}</p>
            </div>
            <button className="text-neutral-500 hover:text-white">
                <MoreHorizontal size={20} />
            </button>
        </div>
    );
};

export default function AllNotificationsPage() {
    const router = useRouter();

    const allNotifications = [
        { id: 1, type: 'like', text: 'Someone liked your track "Sunset Groove".', time: '2 minutes ago' },
        { id: 2, type: 'comment', text: 'John Doe commented on your track "Midnight City".', time: '1 hour ago' },
        { id: 3, type: 'follow', text: 'Jane Smith is now following you.', time: '3 hours ago' },
        { id: 4, type: 'like', text: 'Your track "Ocean Drive" just passed 1,000 plays!', time: '1 day ago' },
        { id: 5, type: 'comment', text: 'Alice left feedback on your latest upload.', time: '2 days ago' },
        { id: 6, type: 'follow', text: 'DJ Beatmaker started following you.', time: '2 days ago' },
        { id: 7, type: 'like', text: 'Someone liked your track "Retro Waves".', time: '3 days ago' },
    ];

    return (
        <Layout>
            <Head>
                <title>All Notifications | ONDBEAT</title>
            </Head>
            <div className="max-w-3xl mx-auto p-4 sm:p-8">
                 <div className="flex justify-between items-center mb-8">
                     <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-neutral-800 transition-colors">
                            <ArrowLeft size={22} className="text-neutral-300" />
                        </button>
                        <h1 className="text-3xl font-bold text-white">All Notifications</h1>
                    </div>
                    <Link href="/" className="p-2 rounded-full hover:bg-neutral-800 transition-colors">
                        <Home size={22} className="text-neutral-300" />
                    </Link>
                </div>

                <div className="space-y-3">
                    {allNotifications.map(notification => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
