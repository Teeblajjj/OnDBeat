import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, description }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-neutral-900/60 p-4 rounded-lg border border-neutral-800/80 hover:border-green-500/50 transition-colors"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="text-green-400">{icon}</div>
                <h3 className="text-sm font-medium text-neutral-300">{title}</h3>
            </div>
            <p className="text-xl font-bold text-white">{value}</p>
            {description && <p className="text-xs text-neutral-500 mt-1">{description}</p>}
        </motion.div>
    );
};

export default MetricCard;
