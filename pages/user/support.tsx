import Head from 'next/head';
import { HelpCircle, LifeBuoy, BookOpen } from 'lucide-react';

const SupportCard = ({ icon: Icon, title, description, buttonText }) => (
    <div className="bg-neutral-800/50 border border-neutral-700 p-6 rounded-xl text-center">
        <Icon size={32} className="mx-auto mb-4 text-blue-500" />
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-neutral-400 mb-6">{description}</p>
        <button className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors">{buttonText}</button>
    </div>
);

export default function SupportPage() {
  return (
    <>
      <Head>
        <title>Support | ONDBEAT</title>
      </Head>
      <div className="max-w-4xl mx-auto">
         <div className="text-center mb-12">
            <HelpCircle size={48} className="mx-auto mb-4 text-blue-500"/>
            <h1 className="text-4xl font-bold mb-2">How can we help?</h1>
            <p className="text-lg text-neutral-400">We're here to assist you with any questions or issues.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <SupportCard 
                icon={LifeBuoy} 
                title="Contact Support"
                description="Got a technical issue or a question about your account? Reach out to us."
                buttonText="Open a Ticket"
            />
            <SupportCard 
                icon={BookOpen} 
                title="FAQs &amp; Help Center"
                description="Find answers to common questions about licenses, payments, and more."
                buttonText="Visit Help Center"
            />
        </div>

         <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Send us a Message</h2>
             <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Your Name" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="email" placeholder="Your Email" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <input type="text" placeholder="Subject" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <textarea rows="5" placeholder="How can we help?" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                <div className="text-center pt-4">
                    <button type="submit" className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform hover:scale-105">Submit Request</button>
                </div>
            </form>
        </div>

      </div>
    </>
  );
}
