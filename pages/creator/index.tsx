import { useRouter } from 'next/router';
import { Music, Layers, Archive, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const UploadOption = ({ icon, title, description, href, color }) => {
    return (
        <Link href={href} className="block h-full">
            <div
                className={`bg-neutral-900/50 hover:bg-neutral-800/60 border border-neutral-800 p-8 rounded-2xl cursor-pointer transition-all duration-300 group relative overflow-hidden h-full flex flex-col`}
            >
                <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-${color}-500 to-transparent transition-all duration-500 transform -translate-x-full group-hover:translate-x-0`}></div>
                <div className="flex-grow">
                    <div className="mb-4">{icon}</div>
                    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                    <p className="text-neutral-400 text-base">{description}</p>
                </div>
            </div>
        </Link>
    );
}

const UploadSelectionPage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Navigation */}
                <div className="flex items-center justify-between mb-12">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-neutral-800/60">
                        <ArrowLeft size={20} />
                        <span className="font-medium">Back</span>
                    </button>
                    <Link href="/" className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-neutral-800/60">
                         <Home size={20} />
                         <span className="font-medium">Home</span>
                    </Link>
                </div>

                {/* Main Content */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500 pb-2">
                        Share Your Sound
                    </h1>
                    <p className="text-lg text-neutral-400 mt-3 max-w-2xl mx-auto">
                        Choose the type of content you want to upload and start your creator journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <UploadOption
                        icon={<Music size={32} className="text-green-400"/>}
                        title="Upload Beat"
                        description="Upload a single beat with multiple file versions (MP3, WAV, Stems), set your price & licenses."
                        href="/creator/upload"
                        color="green"
                    />
                    <UploadOption
                        icon={<Layers size={32} className="text-sky-400"/>}
                        title="Create Collection"
                        description="Bundle your existing beats into an album or a special-themed collection to offer more value."
                        href="/creator/collection"
                        color="sky"
                    />
                    <UploadOption
                        icon={<Archive size={32} className="text-amber-400"/>}
                        title="Upload Sound Kit"
                        description="Sell your drum kits, loop packs, preset banks, and other digital assets to fellow producers."
                        href="/creator/soundkit"
                        color="amber"
                    />
                </div>
            </div>
        </div>
    );
}

export default UploadSelectionPage;
