import Head from "next/head";
import { useRouter } from "next/router";
import { CheckCircle, Download, ArrowLeft } from "lucide-react";

export default function ThankYou() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Thank You! - ONDBeat</title>
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white flex items-center justify-center">
                <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-neutral-800 shadow-2xl max-w-lg w-full text-center">
                    <CheckCircle className="mx-auto text-green-500 mb-6" size={80} />
                    <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
                    <p className="text-neutral-300 mb-8">Your purchase was successful. You can now download your files.</p>

                    <div className="space-y-4">
                         <button className="w-full flex items-center justify-center gap-3 rounded-full border border-transparent bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-blue-700 transition-colors">
                            <Download size={20} />
                            Download Your Beats
                        </button>
                        <button onClick={() => router.push('/')} className="w-full flex items-center justify-center gap-2 text-neutral-300 hover:text-white py-3">
                            <ArrowLeft size={20} />
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
