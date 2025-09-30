import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { X } from 'lucide-react';

export default function NegotiationModal({ isOpen, onClose, beat, onSubmit }) {
    const [offer, setOffer] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        onSubmit({ offer, message });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#1a1a1a] border border-neutral-800 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-white flex justify-between items-center">
                                    Negotiate for Exclusive License
                                    <button onClick={onClose} className="text-neutral-400 hover:text-white">
                                        <X size={24} />
                                    </button>
                                </Dialog.Title>
                                <div className="mt-4">
                                    <p className="text-sm text-neutral-400 mb-2">You are making an offer for the exclusive rights to</p>
                                    <p className='font-bold text-lg text-white mb-4'>{beat.title}</p>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div>
                                        <label htmlFor="offer" className="block text-sm font-medium text-neutral-300 mb-2">Your Offer ($)</label>
                                        <input
                                            type="number"
                                            id="offer"
                                            value={offer}
                                            onChange={(e) => setOffer(e.target.value)}
                                            placeholder="Enter your price"
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">Message (Optional)</label>
                                        <textarea
                                            id="message"
                                            rows="4"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Include a message to the producer..."
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        type="button"
                                        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors disabled:bg-neutral-600"
                                        onClick={handleSubmit}
                                        disabled={!offer}
                                    >
                                        Submit Offer
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
