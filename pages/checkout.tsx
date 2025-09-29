import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Home, ChevronLeft, Lock, CreditCard, AlertTriangle } from "lucide-react";

// NOTE: This is a temporary data structure.
const cartItems = [
    {
        id: 1,
        title: "FALL IN LOVE [KANYE x SAMPLE]",
        producer: "Morgan",
        price: 59.90,
        cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
        license: "Basic"
    },
    {
        id: 2,
        title: "HIGHS & LOWS [KANYE x TRAVIS SCOTT]",
        producer: "K. Lewis Muzik",
        price: 59.90,
        cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&q=80",
        license: "Premium"
    },
];

export default function CheckoutPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const taxes = subtotal * 0.08;
    const total = subtotal + taxes;

    return (
        <>
            <Head>
                <title>Checkout | ONDBEAT</title>
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white">
                <div className="max-w-4xl mx-auto p-4 md:p-8">
                    <div className="flex items-center gap-4 text-neutral-300 mb-8">
                        <Link href="/" legacyBehavior>
                            <a className="flex items-center gap-2 hover:text-white">
                                <Home size={20} />
                            </a>
                        </Link>
                        /
                        <button onClick={() => router.back()} className="flex items-center gap-2 hover:text-white">
                            <ChevronLeft size={20} />
                            Back
                        </button>
                    </div>

                    <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left: Order Summary */}
                        <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-neutral-800">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <img src={item.cover} alt={item.title} className="w-16 h-16 rounded-lg object-cover"/>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.title}</p>
                                            <p className="text-sm text-neutral-400">{item.license} License</p>
                                        </div>
                                        <p className="font-semibold">${item.price.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-neutral-700 space-y-2 text-neutral-300">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>${subtotal.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Taxes</p>
                                    <p>${taxes.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between font-bold text-white text-lg mt-2">
                                    <p>Total</p>
                                    <p>${total.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Payment Information */}
                        <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-neutral-800">
                             <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                             
                             <div className="mb-6">
                                 <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">Email for order confirmation</label>
                                 <input
                                     type="email"
                                     id="email"
                                     value={email}
                                     onChange={(e) => setEmail(e.target.value)}
                                     placeholder="your.email@example.com"
                                     className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                 />
                             </div>

                             <div className="mb-4">
                                 <label className="block text-sm font-medium text-neutral-300 mb-2">Payment Method</label>
                                 <div className="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 flex items-center gap-3">
                                     <CreditCard size={20}/>
                                     <p className="font-semibold">Card</p>
                                 </div>
                             </div>
                             <div className="bg-blue-500/10 text-blue-300 text-sm p-3 rounded-lg flex gap-2 items-start">
                                <AlertTriangle size={18} className="mt-0.5"/>
                                <p>For security reasons, we are not asking for your card details yet. This will be handled by our secure payment provider on the next step.</p>
                            </div>

                            <button className="w-full mt-8 bg-green-500 text-black font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                                <Lock size={18}/>
                                Complete Order
                            </button>

                             <p className="text-xs text-neutral-500 mt-4 text-center">By completing your order, you agree to our Terms of Service.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}