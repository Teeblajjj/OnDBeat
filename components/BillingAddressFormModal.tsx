import React, { useState, useEffect } from 'react';
import { X, MapPin, Building2, User, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BillingAddressFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: any) => void;
  initialAddress?: any; // Existing address data for editing
}

const BillingAddressFormModal: React.FC<BillingAddressFormModalProps> = ({ isOpen, onClose, onSave, initialAddress }) => {
  const [fullName, setFullName] = useState(initialAddress?.fullName || '');
  const [addressLine1, setAddressLine1] = useState(initialAddress?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(initialAddress?.addressLine2 || '');
  const [city, setCity] = useState(initialAddress?.city || '');
  const [stateProvince, setStateProvince] = useState(initialAddress?.stateProvince || '');
  const [zipPostalCode, setZipPostalCode] = useState(initialAddress?.zipPostalCode || '');
  const [country, setCountry] = useState(initialAddress?.country || '');
  const [phoneNumber, setPhoneNumber] = useState(initialAddress?.phoneNumber || '');
  const [email, setEmail] = useState(initialAddress?.email || '');

  useEffect(() => {
    if (initialAddress) {
      setFullName(initialAddress.fullName || '');
      setAddressLine1(initialAddress.addressLine1 || '');
      setAddressLine2(initialAddress.addressLine2 || '');
      setCity(initialAddress.city || '');
      setStateProvince(initialAddress.stateProvince || '');
      setZipPostalCode(initialAddress.zipPostalCode || '');
      setCountry(initialAddress.country || '');
      setPhoneNumber(initialAddress.phoneNumber || '');
      setEmail(initialAddress.email || '');
    }
  }, [initialAddress]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress = {
      fullName, addressLine1, addressLine2, city, stateProvince, zipPostalCode, country, phoneNumber, email
    };
    onSave(newAddress);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="bg-[#181818] rounded-2xl w-full max-w-2xl border border-neutral-800 overflow-y-auto max-h-[90vh]"
          >
            <div className="flex justify-between items-center p-6 border-b border-neutral-800 sticky top-0 bg-[#181818] z-10">
              <h2 className="text-xl font-bold text-white">{initialAddress ? 'Edit Billing Address' : 'Add Billing Address'}</h2>
              <button onClick={onClose} className="text-neutral-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><User size={20} className="text-green-400"/> Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-neutral-300 mb-1">Full Name</label>
                    <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Email Address</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none" />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-neutral-300 mb-1">Phone Number (Optional)</label>
                    <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none" />
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><MapPin size={20} className="text-green-400"/> Address Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="addressLine1" className="block text-sm font-medium text-neutral-300 mb-1">Address Line 1</label>
                    <input type="text" id="addressLine1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none" />
                  </div>
                  <div>
                    <label htmlFor="addressLine2" className="block text-sm font-medium text-neutral-300 mb-1">Address Line 2 (Optional)</label>
                    <input type="text" id="addressLine2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-neutral-300 mb-1">City</label>
                      <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none" />
                    </div>
                    <div>
                      <label htmlFor="stateProvince" className="block text-sm font-medium text-neutral-300 mb-1">State/Province</label>
                      <input type="text" id="stateProvince" value={stateProvince} onChange={(e) => setStateProvince(e.target.value)} required className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none" />
                    </div>
                    <div>
                      <label htmlFor="zipPostalCode" className="block text-sm font-medium text-neutral-300 mb-1">Zip/Postal Code</label>
                      <input type="text" id="zipPostalCode" value={zipPostalCode} onChange={(e) => setZipPostalCode(e.target.value)} required className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-neutral-300 mb-1">Country</label>
                    <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center gap-4 pt-4 border-t border-neutral-800">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-neutral-300 hover:text-white rounded-lg">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-bold bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors">
                  Save Address
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BillingAddressFormModal;
