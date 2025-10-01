import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { Rocket, Flame, Sparkles, CheckCircle } from 'lucide-react';

const PromotionCard = ({ title, price, features, isPopular, icon }) => (
    <div className={`relative bg-neutral-900/60 p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 ${isPopular ? 'border-2 border-green-500 bg-gradient-to-br from-green-900/30 via-neutral-900 to-neutral-900 shadow-[0_0_20px_rgba(49,196,141,0.2)]' : 'border-neutral-800 hover:border-green-600/50'}`}>
        {isPopular && (
            <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">Most Popular</span>
        )}
        <div className="flex flex-col items-center text-center">
            <div className="mb-4 text-green-400">{icon}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 mb-4">{price}</p>
            <ul className="space-y-3 text-neutral-300 text-sm mb-6">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button className={`w-full mt-auto font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${isPopular ? 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white shadow-[0_4px_15px_rgba(49,196,141,0.3)]' : 'bg-green-600/20 hover:bg-green-600/40 text-green-300 border border-green-600/50'}`}>
                Select Plan
            </button>
        </div>
    </div>
);

const PromotePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const packages = [
      {
          title: 'Basic',
          price: '$10',
          features: ['7 days on the homepage', 'Basic analytics', 'Standard support'],
          isPopular: false,
          icon: <Flame size={32}/>
      },
      {
          title: 'Pro',
          price: '$25',
          features: ['30 days on homepage', 'Featured in newsletter', 'Detailed analytics', 'Priority support'],
          isPopular: true,
          icon: <Rocket size={32}/>
      },
      {
          title: 'Enterprise',
          price: '$50',
          features: ['30 days on homepage & socials', 'Dedicated newsletter feature', 'Full analytics suite', '24/7 dedicated support'],
          isPopular: false,
          icon: <Sparkles size={32}/>
      }
  ];

  return (
    <>
      <Head>
        <title>Promote - ONDBEAT</title>
      </Head>

      <div className="min-h-screen bg-[#101010] text-white flex">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="flex-1 md:ml-60">
          <Header 
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

          <main className="p-4 md:p-8">
            <div className="relative text-center mb-12 py-10 px-6 bg-neutral-900/50 rounded-2xl border border-neutral-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-grid-green-500/10 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
                <div className="relative">
                    <div className="inline-block bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full mb-4 shadow-[0_0_20px_rgba(49,196,141,0.4)]">
                        <Rocket size={40} className="text-white"/>
                    </div>
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400 mb-2">Amplify Your Sound</h1>
                    <p className="text-lg text-neutral-300 max-w-2xl mx-auto">Get your music in front of thousands of potential buyers by featuring it across the ONDBEAT marketplace.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {packages.map(pkg => <PromotionCard key={pkg.title} {...pkg} />)}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PromotePage;
