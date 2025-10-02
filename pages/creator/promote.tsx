import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import MetricCard from '../../components/MetricCard';
import { Rocket, Sparkles, TrendingUp, DollarSign, Download, Users, Heart, Play, Search, LayoutGrid, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PromotePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contentType, setContentType] = useState('Everything');

  // Mock data for global performance metrics
  const globalMetrics = [
    { icon: <Play size={20} />, title: 'Plays', value: '-' },
    { icon: <Sparkles size={20} />, title: 'Impressions', value: '-' },
    { icon: <TrendingUp size={20} />, title: 'Sales Conversions', value: '-' },
    { icon: <DollarSign size={20} />, title: 'Earnings', value: '-' },
    { icon: <Download size={20} />, title: 'Free Downloads', value: '-' },
    { icon: <Users size={20} />, title: 'Followers Gained', value: '-' },
    { icon: <Heart size={20} />, title: 'Likes', value: '-' },
    { icon: <LayoutGrid size={20} />, title: 'Campaigns Created', value: 0, description: 'Click below to start.' },
  ];

  // Mock campaigns data (empty for now, to show empty state)
  const campaigns: any[] = []; // This array would be populated with actual campaign data

  return (
    <Layout>
      <Head>
        <title>Promote - ONDBEAT Creator Studio</title>
      </Head>

      <div className="p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Promote</h1>
          <Link href="/creator/create-campaign" legacyBehavior>
            <a className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors">
              <Rocket size={18} /> Create campaign
            </a>
          </Link>
        </div>

        {/* Global Performance Section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Campaigns global performance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {globalMetrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
        </section>

        {/* Campaigns Management Section */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Campaigns</h2>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full sm:w-auto flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="text"
                placeholder="Start typing to search..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative w-full sm:w-auto">
              <select
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none pr-8"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
              >
                <option value="Everything">Content type: Everything</option>
                <option value="Beat">Content type: Beat</option>
                <option value="SoundKit">Content type: SoundKit</option>
                <option value="Collection">Content type: Collection</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {campaigns.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-neutral-900/50 p-10 rounded-2xl border border-neutral-800/80 flex flex-col items-center justify-center text-center mt-8"
            >
              <Rocket size={60} className="text-neutral-600 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No campaigns created yet</h3>
              <p className="text-neutral-400 mb-6">You haven't launched any promotion campaigns. Click below to start getting your music heard!</p>
              <Link href="/creator/create-campaign" legacyBehavior>
                <a className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-5 rounded-lg transition-colors">
                  <Rocket size={18} /> Create new campaign
                </a>
              </Link>
            </motion.div>
          ) : (
            // Campaign listings would go here
            <div>
              {/* Map over campaigns to display them */}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default PromotePage;