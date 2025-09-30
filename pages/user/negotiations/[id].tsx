import Head from 'next/head';
import { useRouter } from 'next/router';
import { Gavel, ArrowLeft, Paperclip, Send } from 'lucide-react';
import Link from 'next/link';

// Mock data - in a real app, you'd fetch this based on the [id]
const negotiationDetails = {
    id: 'NEG-2023-001',
    beatName: 'Ocean Drive',
    producer: 'Synth Samurai',
    status: 'countered',
    coverArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&q=80',
    history: [
        { by: 'seller', type: 'message', content: 'Thanks for your interest in the exclusive license for Ocean Drive. I can do $350.', timestamp: 'Oct 28, 2023, 2:45 PM' },
        { by: 'user', type: 'offer', content: 'Offered $250.00', timestamp: 'Oct 28, 2023, 1:10 PM' },
        { by: 'user', type: 'message', content: 'Hey, I really love this beat. Would you be willing to part with the exclusive rights for $250?', timestamp: 'Oct 28, 2023, 1:09 PM' },
    ],
    myOffer: 250.00,
    sellerOffer: 350.00,
};

const Message = ({ msg }) => {
    const isUser = msg.by === 'user';
    const isOffer = msg.type === 'offer';

    if (isOffer) {
        return (
            <div className="text-center my-4">
                <p className="text-xs text-neutral-400 bg-neutral-800 inline-block px-3 py-1 rounded-full">{msg.content} by you on {msg.timestamp}</p>
            </div>
        )
    }

    return (
        <div className={`flex gap-3 my-4 ${isUser ? 'flex-row-reverse' : ''}`}>
            {!isUser && <img src="https://randomuser.me/api/portraits/men/34.jpg" alt="producer" className="w-10 h-10 rounded-full"/>}
            <div className={`p-4 rounded-xl max-w-lg ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-[#2a2a2a] rounded-bl-none'}`}>
                <p>{msg.content}</p>
                <p className={`text-xs mt-2 ${isUser ? 'text-blue-200' : 'text-neutral-400'}`}>{msg.timestamp}</p>
            </div>
        </div>
    );
};

export default function NegotiationDetailPage() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <title>Negotiation Details | ONDBEAT</title>
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white p-4 md:p-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                        <Link href="/user/negotiations" legacyBehavior>
                            <a className="flex items-center gap-2 text-neutral-300 hover:text-white mb-4">
                                <ArrowLeft size={18} /> Back to Negotiations
                            </a>
                        </Link>
                        <div className="flex items-center gap-4">
                            <img src={negotiationDetails.coverArt} alt={negotiationDetails.beatName} className="w-20 h-20 rounded-lg"/>
                            <div>
                                <h1 className="text-3xl font-bold">{negotiationDetails.beatName}</h1>
                                <p className="text-neutral-400">Negotiation with {negotiationDetails.producer}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1f1f1f] border border-neutral-800 rounded-xl flex flex-col h-[60vh]">
                        <div className="flex-1 p-6 overflow-y-auto flex flex-col-reverse">
                           <div>
                               {negotiationDetails.history.map((msg, i) => <Message key={i} msg={msg} />)}
                           </div>
                        </div>
                        <div className="p-4 bg-black/30 border-t border-neutral-800">
                             <div className="bg-yellow-500/10 text-yellow-300 p-3 rounded-lg text-center text-sm mb-4">
                                Seller countered with <span className="font-bold">${negotiationDetails.sellerOffer.toFixed(2)}</span>. You can accept, make a new offer, or send a message.
                            </div>
                            <div className="relative">
                                <input 
                                    type="text"
                                    placeholder="Type your message or new offer..."
                                    className="w-full bg-neutral-800 border-neutral-700 rounded-full pl-6 pr-24 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <button className="text-neutral-400 hover:text-white"><Paperclip size={20}/></button>
                                    <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"><Send size={20}/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
