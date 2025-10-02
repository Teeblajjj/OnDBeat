
import { Play, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface Beat {
  id: number;
  title: string;
  producer: string;
  price: number;
  cover: string;
}

const BeatCard = ({ beat }: { beat: Beat }) => {
  return (
    <div className="bg-[#181818] rounded-lg p-4 w-full max-w-sm mx-auto group transition-all duration-300 hover:bg-[#282828]">
      <div className="relative mb-4">
        <Link href={`/beats/${beat.id}`} legacyBehavior>
            <a className="block">
                <img src={beat.cover} alt={`${beat.title} cover art`} className="w-full h-auto rounded-md aspect-square object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
                    <button className="text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300">
                        <Play size={48} fill="white" />
                    </button>
                </div>
            </a>
        </Link>
      </div>
      <div>
        <Link href={`/beats/${beat.id}`} legacyBehavior>
            <a className='hover:underline'>
                <h3 className="text-white font-semibold truncate text-lg">{beat.title}</h3>
            </a>
        </Link>
        <p className="text-neutral-400 text-sm">{beat.producer}</p>
        <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
                <button className="text-neutral-400 hover:text-green-400 transition-colors"><Heart size={20} /></button>
                <p className="text-white font-bold text-lg">${beat.price.toFixed(2)}</p>
            </div>
            <button className="bg-green-500 text-black rounded-full px-4 py-2 text-sm font-bold hover:bg-green-400 transition-colors flex items-center gap-2">
                <ShoppingCart size={16} />
                Add
            </button>
        </div>
      </div>
    </div>
  );
};

export default BeatCard;
