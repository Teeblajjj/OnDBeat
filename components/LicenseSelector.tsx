
import { useState } from 'react';

interface License {
  name: string;
  price: number;
  description: string;
}

interface LicenseSelectorProps {
  licenses: License[];
  onAddToCart: (license: License) => void;
  onBuyNow: (license: License) => void;
}

const LicenseSelector = ({ licenses, onAddToCart, onBuyNow }: LicenseSelectorProps) => {
  const [selectedLicense, setSelectedLicense] = useState(licenses[0]);

  return (
    <div className="bg-[#181818] p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Licensing</h2>
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold">${selectedLicense.price.toFixed(2)}</p>
          <button onClick={() => onAddToCart(selectedLicense)} className="bg-neutral-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-neutral-600">Add to Cart</button>
          <button onClick={() => onBuyNow(selectedLicense)} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">Buy now</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {licenses.map((license) => (
          <div 
            key={license.name}
            onClick={() => setSelectedLicense(license)} 
            className={`p-4 rounded-lg border-2 cursor-pointer ${selectedLicense.name === license.name ? 'border-blue-500 bg-neutral-800' : 'border-transparent bg-neutral-700/50 hover:bg-neutral-700'}`}>
            <h3 className="font-bold text-lg">{license.name}</h3>
            <p className="text-neutral-400 text-sm">{license.price > 0 ? `$${license.price}`: "Negotiate"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LicenseSelector;
