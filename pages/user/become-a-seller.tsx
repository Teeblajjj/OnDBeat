import Head from 'next/head';
import { Briefcase, CheckCircle, ArrowRight } from 'lucide-react';

const FeaturePoint = ({ children }) => (
  <div className="flex items-start gap-3">
    <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
    <span className="text-neutral-300">{children}</span>
  </div>
);

export default function BecomeaSellerPage() {
  return (
    <>
      <Head>
        <title>Become a Seller | ONDBEAT</title>
      </Head>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <Briefcase size={48} className="mx-auto mb-4 text-blue-500"/>
            <h1 className="text-4xl font-bold mb-2">Join the ONDBEAT Marketplace</h1>
            <p className="text-lg text-neutral-400">Start selling your beats and grow your music career today.</p>
        </div>

        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Why Sell on ONDBEAT?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
                <FeaturePoint>Reach a global audience of artists and creators.</FeaturePoint>
                <FeaturePoint>Keep up to 80% of your sales revenue.</FeaturePoint>
                <FeaturePoint>Secure and automated payment processing.</FeaturePoint>
                <FeaturePoint>Powerful tools to manage your beat store.</FeaturePoint>
                <FeaturePoint>Set your own prices and licensing terms.</FeaturePoint>
                <FeaturePoint>Collaborate with other talented producers.</FeaturePoint>
            </div>

            <div className="text-center">
                <p className="text-neutral-300 mb-6">Ready to take the next step? Applying is simple and fast.</p>
                <button className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform hover:scale-105 flex items-center justify-center mx-auto gap-2">
                    <span>Start Your Application</span>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
      </div>
    </>
  );
}
