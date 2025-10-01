import { useState } from 'react';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import CollectionStep1 from '../../components/upload/CollectionStep1';
import CollectionStep2 from '../../components/upload/CollectionStep2';
import CollectionStep3 from '../../components/upload/CollectionStep3';
import CollectionStep4 from '../../components/upload/CollectionStep4';
import PublishStep from '../../components/upload/PublishStep';

const UploadCollectionPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [step, setStep] = useState(1);
    const [collectionData, setCollectionData] = useState({});

    const totalSteps = 5;

    const updateCollectionData = (newData) => {
        setCollectionData(prev => ({ ...prev, ...newData }));
    };

    const renderStep = () => {
        switch (step) {
            case 1: return <CollectionStep1 onUpdate={updateCollectionData} data={collectionData} />;
            case 2: return <CollectionStep2 onUpdate={updateCollectionData} data={collectionData} />;
            case 3: return <CollectionStep3 onUpdate={updateCollectionData} data={collectionData} />;
            case 4: return <CollectionStep4 onUpdate={updateCollectionData} data={collectionData} />;
            case 5: return <PublishStep assetType="Collection" data={collectionData} />;
            default: return <CollectionStep1 onUpdate={updateCollectionData} data={collectionData} />;
        }
    };

    const stepTitles = ['Details', 'Add Tracks', 'Pricing', 'Visibility', 'Review & Publish'];

    return (
        <>
            <Head>
                <title>Upload Collection - ONDBeat Marketplace</title>
            </Head>
            <div className="min-h-screen bg-black text-white flex">
                <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
                <div className="flex-1 md:ml-64">
                    <Header
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
                        onCartClick={() => {}} // Placeholder
                        cartItems={0} // Placeholder
                    />
                    <main className="bg-gradient-to-b from-green-900/20 to-[#121212] p-4 sm:p-8">
                        <div className="max-w-5xl mx-auto">
                            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Upload Collection</h1>
                            <p className="text-neutral-400 mb-8">Follow the steps to create and publish your new collection.</p>

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-medium text-neutral-300">Step {step} of {totalSteps} - <span className="font-bold text-white">{stepTitles[step - 1]}</span></span>
                                    <span className="text-sm font-medium text-green-400">{Math.round((step / totalSteps) * 100)}%</span>
                                </div>
                                <div className="w-full bg-neutral-800 rounded-full h-2.5">
                                    <div 
                                        className="bg-gradient-to-r from-green-500 to-green-400 h-2.5 rounded-full transition-all duration-300"
                                        style={{ 
                                            width: `${(step / totalSteps) * 100}%`,
                                            boxShadow: '0 0 10px rgba(49, 196, 141, 0.7)'
                                        }}
                                    ></div>
                                </div>
                            </div>

                            {/* Step Content */}
                            <div className="bg-neutral-900/50 p-6 sm:p-8 rounded-2xl border border-neutral-800/80">
                                {renderStep()}
                            </div>

                            {/* Navigation & Action Buttons */}
                            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div>
                                    {step > 1 && (
                                        <button onClick={() => setStep(step - 1)} className="bg-neutral-800 text-white font-bold py-3 px-6 rounded-lg hover:border-neutral-600 transition-colors border border-neutral-700">
                                            Back
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center gap-4">
                                     <button className="text-neutral-400 hover:text-white font-semibold py-3 px-6 rounded-lg hover:bg-neutral-800/50 transition-colors">
                                        Save as Draft
                                    </button>
                                    {step < totalSteps ? (
                                        <button onClick={() => setStep(step + 1)} className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-8 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-[0_0_12px_rgba(49,196,141,0.6)] border border-green-700">
                                            Continue
                                        </button>
                                    ) : (
                                        <button className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:from-green-500 hover:to-teal-600 transition-all shadow-[0_0_15px_rgba(22,200,160,0.7)] border border-teal-600">
                                            Publish Collection
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default UploadCollectionPage;
