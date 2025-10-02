import Layout from '../../components/Layout';
import { useState } from 'react';
import { DollarSign, Music, TrendingUp, Filter } from 'lucide-react';
import MetricCard from '../../components/MetricCard'; // Reusing MetricCard
import { motion } from 'framer-motion';

// Mock Data for sales
const mockSales = [
    { id: '1', date: '2023-10-27', buyer: 'John Doe', item: 'Sunset Drive', license: 'Basic', price: 29.99, status: 'Completed' },
    { id: '2', date: '2023-10-26', buyer: 'Jane Smith', item: 'Ocean Eyes', license: 'Premium', price: 59.99, status: 'Completed' },
];

const SalesPage = () => {
    const [sales, setSales] = useState(mockSales);

    const overviewStats = [
        { icon: <DollarSign size={20} />, title: 'Total Revenue', value: '$' + sales.reduce((acc, sale) => acc + sale.price, 0).toFixed(2) },
        { icon: <TrendingUp size={20} />, title: 'Total Sales', value: sales.length },
        { icon: <Music size={20} />, title: 'Top Selling Track', value: 'Sunset Drive' },
    ];

    return (
        <Layout>
            <div className="p-4 md:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Sales</h1>
                    <p className="text-neutral-400 mt-1">Track your sales, orders, and revenue.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {overviewStats.map((stat, index) => (
                        <MetricCard key={index} {...stat} />
                    ))}
                </div>

                {sales.length > 0 ? (
                    <div className="bg-neutral-900/50 rounded-2xl border border-neutral-800/80">
                        <div className="p-4 flex justify-between items-center border-b border-neutral-800">
                            <h2 className="text-lg font-bold text-white">Sales History</h2>
                            <button className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white"><Filter size={16} /> Filter</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-neutral-800/50">
                                    <tr>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">Date</th>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">Buyer</th>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">Item</th>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">License</th>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">Price</th>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sales.map((sale, index) => (
                                        <motion.tr 
                                            key={sale.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-neutral-800 last:border-b-0 hover:bg-neutral-800/30"
                                        >
                                            <td className="p-4 text-neutral-300">{sale.date}</td>
                                            <td className="p-4 text-white font-medium">{sale.buyer}</td>
                                            <td className="p-4 text-neutral-300">{sale.item}</td>
                                            <td className="p-4 text-neutral-300">{sale.license}</td>
                                            <td className="p-4 text-green-400 font-semibold">${sale.price.toFixed(2)}</td>
                                            <td className="p-4"><span className="bg-green-500/10 text-green-400 text-xs font-semibold px-2 py-1 rounded-full">{sale.status}</span></td>
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
                        className="text-center py-20 bg-neutral-900/50 rounded-2xl border-2 border-dashed border-neutral-800"
                    >
                        <DollarSign size={48} className="mx-auto text-neutral-600 mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">No sales yet</h2>
                        <p className="text-neutral-400">Your sales history will appear here once you make your first sale.</p>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
};

export default SalesPage;
