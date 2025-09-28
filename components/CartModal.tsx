import { X, Trash2, Minus, ShoppingCart } from "lucide-react";

interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
  cover: string;
  licenses: Array<{
    name: string;
    price: number;
    description: string;
    features: string[];
    limitations: string[];
  }>;
}

interface CartItem {
  beat: Beat;
  licenseIndex: number;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onRemoveItem: (beatId: number, licenseIndex: number) => void;
  onUpdateQuantity: (beatId: number, licenseIndex: number, quantity: number) => void;
  onCheckout: () => void;
}

export default function CartModal({
  isOpen,
  cartItems,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout
}: CartModalProps) {
  if (!isOpen) return null;

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + (item.beat.licenses[item.licenseIndex].price * item.quantity);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6" />
            <span>Shopping Cart ({cartItems.length})</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Your cart is empty</p>
            <p className="text-gray-500 text-sm">Add some beats to get started!</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={`${item.beat.id}-${item.licenseIndex}`} className="flex items-center space-x-4 p-4 bg-neutral-800 rounded-lg">
                  <img
                    src={item.beat.cover}
                    alt={item.beat.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{item.beat.title}</h3>
                    <p className="text-gray-400 text-xs">{item.beat.producer}</p>
                    <p className="text-green-400 text-sm font-medium">
                      {item.beat.licenses[item.licenseIndex].name} License
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.beat.id, item.licenseIndex, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.beat.id, item.licenseIndex, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-500">
                      ${item.beat.licenses[item.licenseIndex].price * item.quantity}
                    </p>
                    <button
                      onClick={() => onRemoveItem(item.beat.id, item.licenseIndex)}
                      className="text-red-400 hover:text-red-300 mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-2xl font-bold text-green-500">${totalPrice}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-green-500 text-black font-bold py-3 rounded-lg hover:bg-green-400 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
