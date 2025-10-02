import Layout from '../../components/Layout';
import { useState } from 'react';
import { Plus, FileText, Search } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data for contracts
const mockContracts = [
    { id: '1', name: 'Exclusive License Agreement', linkedTrack: 'Sunset Drive', buyer: 'John Doe', status: 'Signed' },
    { id: '2', name: 'Basic Lease Agreement', linkedTrack: 'Ocean Eyes', buyer: 'Jane Smith', status: 'Pending' },
];

const ContractsPage = () => {
    const [contracts, setContracts] = useState(mockContracts);

    return (
        <Layout>
            <div className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Contracts</h1>
                        <p className="text-neutral-400 mt-1">Manage and generate licensing agreements for your beats.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors mt-4 md:mt-0">
                        <Plus size={18} /> Create New Contract
                    </button>
                </div>

                {contracts.length > 0 ? (
                    <div className="bg-neutral-900/50 rounded-2xl border border-neutral-800/80">
                         <div className="p-4 border-b border-neutral-800">
                            <h2 className="text-lg font-bold text-white">Your Contracts</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-neutral-800/50">
                                    <tr>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">Contract Name</th>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">Linked Track</th>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">Buyer</th>
                                        <th className="p-4 text-sm font-semibold text-neutral-300">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contracts.map((contract, index) => (
                                        <motion.tr 
                                            key={contract.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-neutral-800 last:border-b-0 hover:bg-neutral-800/30"
                                        >
                                            <td className="p-4 text-white font-medium">{contract.name}</td>
                                            <td className="p-4 text-neutral-300">{contract.linkedTrack}</td>
                                            <td className="p-4 text-neutral-300">{contract.buyer}</td>
                                            <td className="p-4">
                                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${contract.status === 'Signed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                                    {contract.status}
                                                </span>
                                            </td>
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
                        <FileText size={48} className="mx-auto text-neutral-600 mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">No contracts created yet</h2>
                        <p className="text-neutral-400 mb-6">Create and manage your licensing agreements here.</p>
                        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-5 rounded-lg transition-colors mx-auto">
                            <Plus size={18} /> Create a Contract
                        </button>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
};

export default ContractsPage;
