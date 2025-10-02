import Layout from '../../components/Layout';
import { useState } from 'react';
import { DollarSign, Plus, Download } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data for payouts
const mockPayouts = [
    { id: '1', date: '2023-10-15', method: 'PayPal', amount: 250.00, status: 'Completed' },
    { id: '2', date: '2023-09-15', method: 'Stripe', amount: 150.00, status: 'Completed' },
];

const PayoutsPage = () => {
    const [payouts, setPayouts] = useState(mockPayouts);
    const currentBalance = 350.75; // Mock data

    return (
        <Layout>
            <div className="p-4 md:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Payouts</h1>
                    <p className="text-neutral-400 mt-1">Withdraw your earnings and view your payout history.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-1">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-green-900/50 to-neutral-900 p-6 rounded-2xl border border-green-800/50"
                        >
                            <p className="text-sm font-semibold text-green-300">Current Balance</p>
                            <p className="text-4xl font-bold text-white mt-2">${currentBalance.toFixed(2)}</p>
                            <button className="w-full mt-6 flex items-center justify-center gap-2 bg-green-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">
                                <Download size={18} /> Withdraw Funds
                            </button>
                        </motion.div>
                         <button className="w-full mt-4 text-sm text-center text-green-400 hover:underline">Manage Payment Methods</button>
                    </div>

                    <div className="md:col-span-2">
                        {payouts.length > 0 ? (
                            <div className="bg-neutral-900/50 rounded-2xl border border-neutral-800/80">
                                <div className="p-4 border-b border-neutral-800">
                                    <h2 className="text-lg font-bold text-white">Payout History</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr>
                                                <th className="p-4 text-sm font-semibold text-neutral-300">Date</th>
                                                <th className="p-4 text-sm font-semibold text-neutral-300">Method</th>
                                                <th className="p-4 text-sm font-semibold text-neutral-300">Amount</th>
                                                <th className="p-4 text-sm font-semibold text-neutral-300">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payouts.map((payout, index) => (
                                                <motion.tr 
                                                    key={payout.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="border-b border-neutral-800 last:border-b-0"
                                                >
                                                    <td className="p-4 text-neutral-300">{payout.date}</td>
                                                    <td className="p-4 text-white font-medium">{payout.method}</td>
                                                    <td className="p-4 text-white font-semibold">${payout.amount.toFixed(2)}</td>
                                                    <td className="p-4"><span className="bg-green-500/10 text-green-400 text-xs font-semibold px-2 py-1 rounded-full">{payout.status}</span></td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                             <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center h-full flex flex-col justify-center items-center py-20 bg-neutral-900/50 rounded-2xl border-2 border-dashed border-neutral-800"
                            >
                                <DollarSign size={48} className="mx-auto text-neutral-600 mb-4" />
                                <h2 className="text-xl font-bold text-white mb-2">No payouts yet</h2>
                                <p className="text-neutral-400">Your payout history will appear here.</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PayoutsPage;
