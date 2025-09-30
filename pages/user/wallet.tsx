import { useState } from 'react';
import Head from 'next/head';
import { CreditCard, DollarSign, List } from 'lucide-react';

const TabButton = ({ active, onClick, children }) => (
    <button 
        onClick={onClick} 
        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors 
            ${active 
                ? 'bg-neutral-800 text-white border-b-2 border-blue-500' 
                : 'text-neutral-400 hover:bg-neutral-800/50'}`}>
        {children}
    </button>
);

const FundWalletTab = () => (
    <div className="bg-neutral-800 p-8 rounded-b-xl rounded-r-xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <DollarSign size={28}/>
            Add Funds to Your Wallet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
                <p className="text-neutral-300 mb-4">Select an amount to add to your wallet balance. You can use this balance to purchase beats and other services on ONDBEAT.</p>
                <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Amount (USD)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20}/>
                            <input type="number" defaultValue="20" className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <button className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors">Add Funds</button>
                </div>
            </div>
             <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-700 text-center">
                <p className="text-lg text-neutral-400 mb-2">Current Balance</p>
                <p className="text-4xl font-bold text-blue-400">$125.50</p>
            </div>
        </div>
    </div>
);

const TransactionHistoryTab = () => {
    const transactions = [
        { id: '#1234', date: '2023-10-26', type: 'Purchase', amount: -25.00, details: 'License for \'Sunset Vibez\'' },
        { id: '#1233', date: '2023-10-24', type: 'Funding', amount: 50.00, details: 'Added to wallet' },
        { id: '#1232', date: '2023-10-22', type: 'Purchase', amount: -19.99, details: 'License for \'City Lights\'' },
        { id: '#1231', date: '2023-10-20', type: 'Withdrawal', amount: -100.00, details: 'Bank Transfer' },
        { id: '#1230', date: '2023-10-18', type: 'Funding', amount: 100.00, details: 'Added to wallet' },
    ];

    return (
        <div className="bg-neutral-800 p-8 rounded-b-xl rounded-r-xl">
             <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <List size={28}/>
                Transaction History
            </h2>
            <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left text-neutral-300">
                    <thead className="text-xs text-neutral-400 uppercase bg-neutral-900">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Details</th>
                            <th scope="col" className="px-6 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(t => (
                            <tr key={t.id} className="border-b border-neutral-700 hover:bg-neutral-700/50">
                                <td className="px-6 py-4 font-medium">{t.id}</td>
                                <td className="px-6 py-4">{t.date}</td>
                                <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${t.type === 'Funding' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>{t.type}</span></td>
                                <td className="px-6 py-4">{t.details}</td>
                                <td className={`px-6 py-4 text-right font-bold ${t.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {t.amount > 0 ? `+$${t.amount.toFixed(2)}` : `-$${Math.abs(t.amount).toFixed(2)}`}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default function FundWalletPage() {
    const [activeTab, setActiveTab] = useState('fund');

    return (
        <>
            <Head>
                <title>Fund Wallet | ONDBEAT</title>
            </Head>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <CreditCard size={32} />
                    <h1 className="text-3xl font-bold">Fund Wallet</h1>
                </div>

                <div>
                    <div className="border-b border-neutral-700">
                        <nav className="-mb-px flex gap-4" aria-label="Tabs">
                            <TabButton active={activeTab === 'fund'} onClick={() => setActiveTab('fund')}>Fund Wallet</TabButton>
                            <TabButton active={activeTab === 'history'} onClick={() => setActiveTab('history')}>Transaction History</TabButton>
                        </nav>
                    </div>
                    
                    {activeTab === 'fund' && <FundWalletTab />}
                    {activeTab === 'history' && <TransactionHistoryTab />}
                </div>
            </div>
        </>
    );
}
