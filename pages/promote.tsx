import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout'; // Use the main Layout component
import { Rocket, Target, BarChart, Check, CheckCircle, Lock } from 'lucide-react';

// --- Data ---
const userBeats = [
  { id: 1, title: "Sunset Drive", producer: "Metro Boomin", cover: "https://images.unsplash.com/photo-1516999654410-482a4c2fee14?w=100&q=80", plays: "1.2k", likes: "98" },
  { id: 2, title: "City Lights", producer: "The Weeknd", cover: "https://images.unsplash.com/photo-1519892338195-e1b93931f681?w=100&q=80", plays: "890", likes: "72" },
  { id: 3, title: "Desert Rose", producer: "Sting", cover: "https://images.unsplash.com/photo-1470104432727-99338f45a277?w=100&q=80", plays: "2.5k", likes: "150" },
  { id: 4, title: "Forest Gump", producer: "Frank Ocean", cover: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&q=80", plays: "980", likes: "88" },
];

const promotionPackages = [
    { id: "starter", name: "Starter Boost", price: 10, icon: BarChart, features: ["Homepage placement for 24 hours", "Basic analytics"] },
    { id: "pro", name: "Pro Campaign", price: 25, icon: Target, features: ["Homepage placement for 3 days", "Playlist inclusion", "Advanced analytics"] },
    { id: "max", name: "Max Reach", price: 50, icon: Rocket, features: ["Homepage & Explore page feature", "Top playlist placement", "Social media shoutout"] },
];

// --- Page ---
export default function Promote() {
  const [selectedBeatId, setSelectedBeatId] = useState<number | null>(userBeats[0].id);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('pro');

  const selectedBeat = userBeats.find(b => b.id === selectedBeatId);
  const selectedPackage = promotionPackages.find(p => p.id === selectedPackageId);

  const StepCard = ({ number, title, children }) => (
    <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800/80 shadow-lg">
        <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-10 rounded-full bg-green-500/20 border-2 border-green-500 text-white flex items-center justify-center font-bold text-xl">{number}</div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        {children}
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>Promote Your Music - ONDBeat</title>
      </Head>

      <div className="p-4 md:p-8">
          <div className="relative text-center mb-12 py-10 px-6 bg-neutral-900/50 rounded-2xl border border-neutral-800/80 overflow-hidden">
              <div className="absolute inset-0 bg-grid-green-500/10 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
              <div className="relative">
                  <div className="inline-block bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full mb-4 shadow-[0_0_20px_rgba(49,196,141,0.4)]">
                      <Rocket size={40} className="text-white"/>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 tracking-tighter">Promote Your Music</h1>
                  <p className="text-green-300/80 text-lg max-w-2xl mx-auto">Get your music in front of thousands of potential buyers by featuring it across the ONDBEAT marketplace.</p>
              </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-8">
                  <StepCard number="1" title="Select a Beat to Promote">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {userBeats.map(beat => (
                              <div 
                                  key={beat.id} 
                                  onClick={() => setSelectedBeatId(beat.id)}
                                  className={`p-3 rounded-lg flex items-center gap-4 cursor-pointer transition-all border-2 ${selectedBeatId === beat.id ? 'bg-green-500/10 border-green-500' : 'bg-neutral-800/60 border-transparent hover:bg-neutral-700/80'}`}>
                                  <img src={beat.cover} alt={beat.title} className="w-16 h-16 rounded-md object-cover" />
                                  <div className="flex-grow">
                                      <p className="font-bold text-white">{beat.title}</p>
                                      <p className="text-sm text-neutral-400">{beat.producer}</p>
                                  </div>
                                  {selectedBeatId === beat.id && <CheckCircle className="text-green-500 flex-shrink-0" />}
                              </div>
                          ))}
                      </div>
                  </StepCard>

                  <StepCard number="2" title="Choose Promotion Package">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {promotionPackages.map(pkg => (
                              <div 
                                  key={pkg.id}
                                  onClick={() => setSelectedPackageId(pkg.id)}
                                  className={`p-5 rounded-lg border-2 text-center cursor-pointer transition-all flex flex-col items-center ${selectedPackageId === pkg.id ? 'bg-green-500/10 border-green-500' : 'bg-neutral-800/60 border-transparent hover:bg-neutral-700/80'}`}>
                                  <pkg.icon size={28} className="mb-3 text-green-400" />
                                  <h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3>
                                  <p className="text-3xl font-extrabold text-white mb-4">${pkg.price}</p>
                                  <ul className="space-y-2 text-sm text-left w-full">
                                      {pkg.features.map(feature => (
                                          <li key={feature} className="flex items-start gap-2 text-neutral-400">
                                              <Check size={16} className="flex-shrink-0 text-green-500 mt-1" />
                                              <span>{feature}</span>
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          ))}
                      </div>
                  </StepCard>
              </div>

              <aside className="lg:col-span-1 sticky top-8">
                  <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800/80 shadow-lg">
                     <h2 className="text-2xl font-bold text-white mb-6">Promotion Summary</h2>
                     {selectedBeat && selectedPackage && (
                          <div className="space-y-6">
                              <div>
                                  <p className="text-sm font-bold text-neutral-400 mb-2 tracking-wider">BEAT</p>
                                  <div className="flex items-center gap-4">
                                      <img src={selectedBeat.cover} alt={selectedBeat.title} className="w-16 h-16 rounded-md object-cover" />
                                      <div>
                                          <p className="font-bold text-lg text-white">{selectedBeat.title}</p>
                                          <p className="text-sm text-neutral-400">by {selectedBeat.producer}</p>
                                      </div>
                                  </div>
                              </div>
                              <div>
                                  <p className="text-sm font-bold text-neutral-400 mb-2 tracking-wider">PACKAGE</p>
                                  <div className="flex items-center gap-4">
                                       <div className="w-16 h-16 bg-neutral-700 rounded-md flex items-center justify-center">
                                          <selectedPackage.icon size={32} className="text-green-400" />
                                       </div>
                                      <div>
                                          <p className="font-bold text-lg text-white">{selectedPackage.name}</p>
                                          <p className="text-sm text-neutral-400">${selectedPackage.price} one-time fee</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="border-t border-neutral-700 pt-5 space-y-4">
                                  <div className="flex justify-between items-center">
                                      <p className="text-lg text-neutral-300">Total Cost</p>
                                      <p className="text-3xl font-extrabold text-white">${selectedPackage.price}</p>
                                  </div>
                                  <button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2 text-lg">
                                      <Lock size={18} />
                                      Proceed to Payment
                                  </button>
                              </div>
                          </div>
                     )}
                  </div>
              </aside>
          </div>
      </div>
    </Layout>
  );
}
