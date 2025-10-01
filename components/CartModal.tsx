import { X, Trash2, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface CartItem {
  beat: {
    id: number;
    title: string;
    producer: string;
    cover: string;
    licenses: {
        name: string;
        price: number;
    }[];
  };
  licenseIndex: number;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems?: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onCheckout: () => void;
}

export default function CartModal({ isOpen, onClose, cartItems = [], onRemoveItem, onUpdateQuantity, onCheckout }: CartModalProps) {
    const subtotal = cartItems.reduce((acc, item) => acc + item.beat.licenses[item.licenseIndex].price * item.quantity, 0);

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-[#121212] border-l border-neutral-800 shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-2xl font-bold text-white flex items-center gap-2">
                                                    <ShoppingCart size={24} /> My Cart
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button type="button" className="-m-2 p-2 text-gray-400 hover:text-white" onClick={onClose}>
                                                        <X size={24} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                {cartItems.length === 0 ? (
                                                    <div className="text-center py-16">
                                                        <ShoppingCart size={48} className="mx-auto text-neutral-600"/>
                                                        <h3 className="mt-4 text-xl font-semibold text-white">Your cart is empty</h3>
                                                        <p className="mt-1 text-neutral-400">Find something to add!</p>
                                                    </div>
                                                ) : (
                                                    <ul role="list" className="-my-6 divide-y divide-neutral-800">
                                                        {cartItems.map((item, index) => (
                                                            <li key={index} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                                                    <img src={item.beat.cover} alt={item.beat.title} className="h-full w-full object-cover object-center" />
                                                                </div>
                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-white">
                                                                            <h3>{item.beat.title}</h3>
                                                                            <p className="ml-4">${item.beat.licenses[item.licenseIndex].price.toFixed(2)}</p>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-neutral-400">by {item.beat.producer}</p>
                                                                        <p className="mt-1 text-sm text-green-400">{item.beat.licenses[item.licenseIndex].name} License</p>                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                         <div className="flex items-center gap-2 border border-neutral-700 rounded-full px-2 py-0.5">
                                                                            <button onClick={() => onUpdateQuantity(item.beat.id, item.quantity - 1)} disabled={item.quantity <= 1}><Minus size={16} className="text-neutral-400 hover:text-white"/></button>
                                                                            <p className="text-white font-semibold w-4 text-center">{item.quantity}</p>
                                                                            <button onClick={() => onUpdateQuantity(item.beat.id, item.quantity + 1)}><Plus size={16} className="text-neutral-400 hover:text-white"/></button>
                                                                         </div>
                                                                        <div className="flex">
                                                                            <button type="button" onClick={() => onRemoveItem(item.beat.id)} className="font-medium text-red-500 hover:text-red-400 flex items-center gap-1">
                                                                                <Trash2 size={16} /> Remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>

                                        {cartItems.length > 0 && (
                                            <div className="border-t border-neutral-800 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-lg font-bold text-white">
                                                    <p>Subtotal</p>
                                                    <p>${subtotal.toFixed(2)}</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-neutral-400">Shipping and taxes calculated at checkout.</p>
                                                <div className="mt-6">
                                                    <button onClick={onCheckout} className="w-full flex items-center justify-center rounded-full border border-transparent bg-green-500 px-6 py-3 text-base font-bold text-black shadow-sm hover:bg-green-600 transition-colors">
                                                        Checkout
                                                    </button>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-neutral-500">
                                                    <p>
                                                        or <button type="button" className="font-medium text-green-400 hover:text-green-300" onClick={onClose}> Continue Shopping <span aria-hidden="true"> &rarr;</span></button>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
