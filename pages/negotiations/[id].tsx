import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronLeft, Send, MessageSquare } from 'lucide-react';

// In a real app, this data would be fetched from your database
const sampleBeats = {
    1: { title: "Renfe", producer: "Al Safir Type Beat", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80" },
    2: { title: "City Lights", producer: "The Weeknd", cover: "https://images.unsplash.com/photo-1519892338195-e1b93931f681?w=100&q=80" },
    3: { title: "Desert Rose", producer: "Sting", cover: "https://images.unsplash.com/photo-1470104432727-99338f45a277?w=100&q=80" },
    4: { title: "Kentro", producer: "Fireboy DML", cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80" },
    5: { title: "Skido", producer: "Victony", cover: "https://images.unsplash.com/photo-1458560871784-56d23406c791?w=400&q=80" },
    6: { title: "Jungle", producer: "Syndrome", cover: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&q=80" },
    7: { title: "Negroni", producer: "Afrobeat x Jorja Smith", cover: "https://images.unsplash.com/photo-1458560871784-56d23406c791?w=400&q=80" },
    8: { title: "i-guide", producer: "Al Safir Type Beat - Ori...", cover: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&q=80" },
    9: { title: "Rolly", producer: "Al Safir Type Beat", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80" },
    10: { title: "Free", producer: "d r i l l p a c k", cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&q=80" },
    11: { title: "Narcos", producer: "Narcos Type Beat", cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
};

export default function BuyerNegotiationPage() {
    const router = useRouter();
    const { id } = router.query;
    const [negotiation, setNegotiation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const fetchNegotiation = async () => {
        if (!id) return;
        try {
            setIsLoading(true);
            const response = await fetch(`/api/negotiate?id=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch negotiation details');
            }
            const data = await response.json();
            setNegotiation(data.negotiation);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNegotiation();
    }, [id]);

    const handleUpdateNegotiation = async (updateData) => {
        try {
            const response = await fetch(`/api/negotiate?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message);
            setNegotiation(result.negotiation);
        } catch (error) {
            console.error("Failed to update negotiation:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            // NOTE: Hardcoded sender as the buyer
            handleUpdateNegotiation({ message, sender: negotiation.buyerId });
            setMessage('');
        }
    };

    const handleAcceptOffer = () => {
        handleUpdateNegotiation({ status: 'accepted' });
        alert('You have accepted the offer!');
        router.push('/beats/' + negotiation.beatId);
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center bg-[#121212] text-red-400">Error: {error}</div>;
    if (!negotiation) return <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">Negotiation not found.</div>;

    const beat = sampleBeats[negotiation.beatId] || { title: 'Unknown Beat', cover: '' };
    const isCountered = negotiation.status === 'countered';

    return (
        <>
            <Head>
                <title>Your Negotiation for {beat.title} | ONDBEAT</title>
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 text-neutral-300 mb-8">
                        <Link href={`/beats/${negotiation.beatId}`} legacyBehavior>
                            <a className="flex items-center gap-2 hover:text-white"><ChevronLeft size={20} /> Back to Beat</a>
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Your Negotiation</h1>
                    <p className='text-neutral-400 mb-8'>Conversation about <span className='font-semibold text-white'>{beat.title}</span> with the producer.</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 space-y-6">
                            <img src={beat.cover} alt={beat.title} className="w-full rounded-lg"/>
                            <div className='bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 text-center'>
                                <h3 className='text-lg font-bold'>Current Offer</h3>
                                <p className="text-4xl font-bold text-blue-500 my-2">${negotiation.offerPrice.toFixed(2)}</p>
                                <p className='text-sm text-neutral-400'>Status: <span className='font-semibold text-yellow-400'>{negotiation.status}</span></p>
                            </div>
                            {isCountered && (
                                <div className="flex flex-col gap-3">
                                    <button onClick={handleAcceptOffer} className='bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg w-full'>Accept Counter-Offer</button>
                                </div>
                            )}
                        </div>
                        <div className="lg:col-span-2 bg-[#1a1a1a] border border-neutral-800 rounded-xl flex flex-col h-[600px]">
                           <div className="p-4 border-b border-neutral-700 flex items-center gap-2">
                                <MessageSquare size={20}/>
                                <h3 className="text-lg font-semibold">Conversation</h3>
                            </div>
                            <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4">
                                {negotiation.history.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.sender === negotiation.buyerId ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%] p-3 rounded-xl ${msg.sender === negotiation.buyerId ? 'bg-blue-600' : 'bg-neutral-700'}`}>
                                            <p className='text-sm'>{msg.text}</p>
                                            <p className='text-xs text-neutral-400 mt-1 text-right'>{new Date(msg.timestamp).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                             <div className="p-4 border-t border-neutral-700">
                                <div className="flex items-center gap-3">
                                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." className="w-full bg-neutral-800 border border-neutral-700 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}/>
                                    <button onClick={handleSendMessage} className="bg-blue-600 p-2.5 rounded-full hover:bg-blue-700"><Send size={20} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
