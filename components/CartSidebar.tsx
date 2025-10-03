import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function CartSidebar() {
  const { cartItems, removeFromCart, updateQuantity, isCartOpen, closeCart } = useCart();

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const license = item.beat.licenses[item.licenseIndex];
      return total + (license.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-0 right-0 h-full w-full max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl z-50 flex flex-col"
        >
          <div className="flex justify-between items-center p-6 border-b border-neutral-800 flex-shrink-0">
            <h2 className="text-2xl font-bold text-white">Your Cart</h2>
            <button onClick={closeCart} className="text-gray-400 hover:text-white transition-colors">
              <X size={28} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
              <p className="text-neutral-400">Find some beats you love and add them to the cart!</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-6">
              <div className="space-y-4">
                {cartItems.map(item => {
                  const license = item.beat.licenses[item.licenseIndex];
                  return (
                    <div key={`${item.beat.id}-${item.licenseIndex}`} className="flex items-start gap-4 bg-neutral-800/50 p-4 rounded-lg">
                      <img src={item.beat.coverImage || 'https://placehold.co/80x80/181818/22c55e'} alt={item.beat.title} className="w-20 h-20 object-cover rounded-md" />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-white">{item.beat.title}</h3>
                        <p className="text-sm text-neutral-400">{license.name} License</p>
                        <p className="text-lg font-bold text-green-400 mt-1">${license.price?.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between h-full">
                        <button onClick={() => removeFromCart(item.beat.id)} className="text-neutral-500 hover:text-red-500 transition-colors">
                          <Trash2 size={20} />
                        </button>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.beat.id, item.quantity - 1)} className="p-1 rounded-full bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50" disabled={item.quantity <= 1}>
                            <Minus size={14} />
                          </button>
                          <span className="font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.beat.id, item.quantity + 1)} className="p-1 rounded-full bg-neutral-700 hover:bg-neutral-600">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="p-6 border-t border-neutral-800 flex-shrink-0 bg-neutral-900/50">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg text-neutral-300">Subtotal</p>
                <p className="text-2xl font-bold text-white">${getSubtotal().toFixed(2)}</p>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 px-6 rounded-full transition-colors text-lg shadow-lg hover:shadow-green-500/30">
                Proceed to Checkout
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
