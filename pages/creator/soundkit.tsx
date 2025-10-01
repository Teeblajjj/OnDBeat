import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/router';
import SoundKitStep1 from '../../components/upload/SoundKitStep1';
import PublishStep from '../../components/upload/PublishStep';

// --- Stepper Navigation --- //
const steps = [
    'Details',
    'Publish',
];

const Stepper = ({ currentStep }) => (
    <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
            {steps.map((step, stepIdx) => (
                <li key={step} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                    {stepIdx < currentStep ? (
                        <>
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="h-0.5 w-full bg-green-500" />
                            </div>
                            <a href="#" className="relative w-8 h-8 flex items-center justify-center bg-green-500 rounded-full hover:bg-green-600">
                                <Check className="w-5 h-5 text-white" aria-hidden="true" />
                                <span className="sr-only">{step}</span>
                            </a>
                        </>
                    ) : stepIdx === currentStep ? (
                        <>
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="h-0.5 w-full bg-neutral-700" />
                            </div>
                            <a href="#" className="relative w-8 h-8 flex items-center justify-center bg-neutral-800 border-2 border-green-500 rounded-full" aria-current="step">
                                <span className="h-2.5 w-2.5 bg-green-500 rounded-full" aria-hidden="true" />
                                <span className="sr-only">{step}</span>
                            </a>
                        </>
                    ) : (
                        <>
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="h-0.5 w-full bg-neutral-700" />
                            </div>
                            <a href="#" className="group relative w-8 h-8 flex items-center justify-center bg-neutral-800 border-2 border-neutral-600 rounded-full hover:border-neutral-400">
                                <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-neutral-500" aria-hidden="true" />
                                <span className="sr-only">{step}</span>
                            </a>
                        </>
                    )}
                </li>
            ))}
        </ol>
    </nav>
);


// --- Main Upload Page --- //
const SoundKitUploadPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: return <SoundKitStep1 />;
            case 1: return <PublishStep assetType="sound kit" />;
            default: return <SoundKitStep1 />;
        }
    };

    return (
        <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <button onClick={() => router.push('/creator')} className="flex items-center gap-2 text-neutral-400 hover:text-white mb-4">
                        <ArrowLeft size={18} />
                        Back to Uploads
                    </button>
                    <h1 className="text-3xl font-bold">Upload a Sound Kit</h1>
                </div>

                {/* Stepper */}
                <div className="mb-10">
                    <Stepper currentStep={currentStep} />
                </div>

                {/* Form Body */}
                <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-8 min-h-[300px]">
                    {renderStepContent()}
                </div>

                {/* Footer Controls */}
                <div className="mt-8 flex justify-between items-center">
                    <div>
                        {currentStep > 0 && (
                            <button onClick={prevStep} className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-2 px-6 rounded-lg">
                                Back
                            </button>
                        )}
                    </div>
                    <div className='flex gap-4'>
                        <button className="border border-neutral-600 hover:border-neutral-400 text-neutral-300 font-bold py-2 px-6 rounded-lg">
                            Save as Draft
                        </button>
                        {currentStep < steps.length - 1 ? (
                             <button onClick={nextStep} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">
                                Next
                            </button>
                        ) : (
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">
                                Publish Sound Kit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoundKitUploadPage;
