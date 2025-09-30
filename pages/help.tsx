import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PlayerBar from '../components/PlayerBar';
import { LifeBuoy, ChevronDown } from 'lucide-react';

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-neutral-800">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-neutral-800/50"
            >
                <h3 className="text-lg font-semibold">{title}</h3>
                <ChevronDown
                    className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    size={20}
                />
            </button>
            {isOpen && <div className="p-6 pt-0 text-neutral-400">{children}</div>}
        </div>
    );
};

const HelpCenterPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const faqs = [
        {
            question: "How do I upload my first beat?",
            answer: "To upload a beat, navigate to the 'My Content' page in the Creator Tools section and click the 'Upload' button. You will be prompted to provide audio files, artwork, and details about your beat like title, genre, and pricing."
        },
        {
            question: "How do payouts work?",
            answer: "Once your earnings reach the minimum payout threshold, you can request a payout from the 'Payouts' page. Payouts are typically processed within 3-5 business days to your connected payment method."
        },
        {
            question: "What are the differences between licenses?",
            answer: "A Standard License typically grants the buyer rights to use the beat for non-commercial projects, while an Exclusive License grants them full ownership and rights to use the beat for any purpose, including commercial releases. The beat is removed from the store after an exclusive sale."
        },
        {
            question: "How does beat promotion work?",
            answer: "Our promotion packages boost your visibility on the platform. Depending on the tier, your beats can be featured on the homepage, included in our newsletters, and shared on our social media channels to drive more traffic and sales."
        }
    ];

    return (
        <>
            <Head>
                <title>Help Center - ONDBeat Marketplace</title>
            </Head>

            <div className="min-h-screen bg-black text-white flex">
                <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />

                <div className="flex-1 md:ml-56">
                    <Header
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
                        onCartClick={() => { }}
                        cartItems={0}
                    />

                    <main className="bg-gradient-to-b from-neutral-900/60 to-[#121212] p-8">
                        <div className="flex items-center space-x-4 mb-8">
                            <LifeBuoy size={40} className="text-green-500" />
                            <h1 className="text-4xl font-bold">Help Center</h1>
                        </div>
                        
                        <p className="text-lg text-neutral-400 mb-8 max-w-2xl">
                            Welcome to the ONDBeat Help Center. Here you can find answers to frequently asked questions. If you can't find what you're looking for, feel free to contact our support team.
                        </p>

                        <div className="bg-neutral-900/70 rounded-lg max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold p-6">Frequently Asked Questions</h2>
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} title={faq.question}>
                                    <p>{faq.answer}</p>
                                </AccordionItem>
                            ))}
                        </div>
                    </main>

                    <PlayerBar isPlaying={false} onPlayPause={() => { }} currentTrack={null} progress={0} />
                </div>
            </div>
        </>
    );
};

export default HelpCenterPage;
