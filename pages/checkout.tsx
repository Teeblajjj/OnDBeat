import Head from "next/head";
import { useRouter } from "next/router";
import { CreditCard, Lock, ArrowLeft } from "lucide-react";

export default function Checkout() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle payment processing
        // For now, we'll just redirect to the thank you page
        router.push("/thank-you");
    };

    return (
        <>
            <Head>
                <title>Checkout - ONDBeat</title>
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white">
                <div className="max-w-4xl mx-auto p-4 md:p-8">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-neutral-300 hover:text-white mb-8">
                        <ArrowLeft size={20} />
                        Back to Cart
                    </button>

                    <h1 className="text-4xl font-bold mb-8">Checkout</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Order Summary */}
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-neutral-800">
                            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <p className="text-neutral-300">Subtotal:</p>
                                    <p>$129.90</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-neutral-300">Taxes:</p>
                                    <p>$0.00</p>
                                </div>
                                <div className="border-t border-neutral-700 my-4"></div>
                                <div className="flex justify-between text-xl font-bold">
                                    <p>Total:</p>
                                    <p>$129.90</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-neutral-800">
                            <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
                                    <input type="email" id="email" required className="w-full bg-[#2a2a2a] border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="card-details" className="block text-sm font-medium text-neutral-300 mb-2">Card Details</label>
                                    <div className="relative">
                                        <CreditCard className="absolute top-1/2 -translate-y-1/2 left-3 text-neutral-400" size={20} />
                                        <input id="card-details" required placeholder="Card number                                                                              MM / YY / CVC" className="w-full bg-[#2a2a2a] border border-neutral-700 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="cardholder-name" className="block text-sm font-medium text-neutral-300 mb-2">Cardholder Name</label>
                                    <input type="text" id="cardholder-name" required className="w-full bg-[#2a2a2a] border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>

                                <button type="submit" className="w-full flex items-center justify-center gap-3 rounded-full border border-transparent bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-blue-700 transition-colors">
                                    <Lock size={20} />
                                    Pay $129.90
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
