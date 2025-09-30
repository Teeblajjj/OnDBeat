import Head from 'next/head';
import { useRouter } from 'next/router';
import { Users, ArrowLeft, Paperclip, Send, Music, FileText, Share2, PlusCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data for a single collaboration project
const collaborationDetails = {
    id: 'COL-001',
    projectName: 'Late Night Drive',
    collaborators: [
        { name: 'ProducerX', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }, 
        { name: 'Beatmaster Flex', avatar: 'https://randomuser.me/api/portraits/men/34.jpg' }
    ],
    status: 'In Progress',
    coverArt: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=100&q=80',
    messages: [
        { by: 'Beatmaster Flex', avatar: 'https://randomuser.me/api/portraits/men/34.jpg', content: 'Just dropped the new stem for the bassline. Let me know what you think.', timestamp: 'Oct 29, 2023, 5:14 PM' },
        { by: 'You', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&q=80', content: 'Sounds dope! I will add some synth pads on top of that tonight.', timestamp: 'Oct 29, 2023, 3:30 PM' },
    ],
    files: [
        { name: 'bassline_v3.wav', type: 'audio', uploader: 'Beatmaster Flex', date: 'Oct 29, 2023' },
        { name: 'synth_idea.mp3', type: 'audio', uploader: 'You', date: 'Oct 28, 2023' },
        { name: 'Project Notes.txt', type: 'document', uploader: 'You', date: 'Oct 27, 2023' },
    ]
};

const getFileIcon = (type) => {
    if (type === 'audio') return <Music className="text-blue-400" />;
    if (type === 'document') return <FileText className="text-green-400" />;
    return <Paperclip />;
};

export default function CollaborationDetailPage() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <title>Collaboration: {collaborationDetails.projectName} | ONDBEAT</title>
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-white p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <Link href="/user/collaborations" legacyBehavior>
                            <a className="flex items-center gap-2 text-neutral-300 hover:text-white mb-6">
                                <ArrowLeft size={18} /> Back to Collaborations
                            </a>
                        </Link>
                        <div className="flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                <img src={collaborationDetails.coverArt} alt={collaborationDetails.projectName} className="w-24 h-24 rounded-lg object-cover"/>
                                <div>
                                    <h1 className="text-4xl font-bold">{collaborationDetails.projectName}</h1>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Users size={16} className="text-neutral-400"/>
                                        <p className="text-neutral-300">Collaboration with {collaborationDetails.collaborators.map(c => c.name).join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 bg-neutral-800/80 border border-neutral-700 py-2 px-4 rounded-full hover:bg-neutral-700">
                                <Share2 size={16}/> Invite
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Chat / Messages Column */}
                        <div className="lg:col-span-2 bg-[#1a1a1a] border border-neutral-800 rounded-xl flex flex-col h-[70vh]">
                             <div className="p-4 border-b border-neutral-700"><h2 className="text-xl font-bold">Project Chat</h2></div>
                            <div className="flex-1 p-6 overflow-y-auto flex flex-col-reverse">
                                <div className="space-y-6">
                                    {collaborationDetails.messages.map((msg, i) => (
                                        <div key={i} className={`flex gap-3 items-start ${msg.by === 'You' ? 'flex-row-reverse' : ''}`}>
                                            <img src={msg.avatar} alt={msg.by} className="w-10 h-10 rounded-full"/>
                                            <div className={`p-4 rounded-xl max-w-md ${msg.by === 'You' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-[#2a2a2a] rounded-bl-none'}`}>
                                                <p className="font-bold">{msg.by}</p>
                                                <p className="text-sm mt-1">{msg.content}</p>
                                                <p className={`text-xs mt-2 ${msg.by === 'You' ? 'text-blue-200' : 'text-neutral-400'}`}>{msg.timestamp}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-black/30 border-t border-neutral-800">
                                <div className="relative">
                                    <input type="text" placeholder="Send a message..." className="w-full bg-neutral-800 border-neutral-700 rounded-full pl-6 pr-24 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <button className="text-neutral-400 hover:text-white"><Paperclip size={20}/></button>
                                        <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"><Send size={20}/></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Files Column */}
                        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-6 h-fit">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Shared Files</h2>
                                <button className="flex items-center gap-2 text-sm bg-blue-600 py-2 px-3 rounded-full hover:bg-blue-700"><PlusCircle size={16}/> Upload</button>
                            </div>
                            <div className="space-y-4">
                                {collaborationDetails.files.map((file, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-neutral-800/50 p-3 rounded-lg">
                                        {getFileIcon(file.type)}
                                        <div className="flex-1">
                                            <p className="font-semibold text-white">{file.name}</p>
                                            <p className="text-xs text-neutral-400">by {file.uploader} on {file.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
