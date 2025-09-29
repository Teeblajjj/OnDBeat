import Head from 'next/head'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import PlayerBar from '../components/PlayerBar'
import CartModal from '../components/CartModal'
import { UploadCloud, Music, FileText, Tag, DollarSign, CheckCircle } from 'lucide-react'

// --- Page Component ---
export default function Upload() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartContents] = useState<any[]>([]);

  // --- Form State ---
  const [beatTitle, setBeatTitle] = useState("");
  const [tags, setTags] = useState("");
  const [bpm, setBpm] = useState("");
  const [key, setKey] = useState("");
  const [genre, setGenre] = useState("Hip Hop");
  const [description, setDescription] = useState("");
  const [coverArt, setCoverArt] = useState<File | null>(null);
  const [mp3File, setMp3File] = useState<File | null>(null);
  const [wavFile, setWavFile] = useState<File | null>(null);

  const [licenses, setLicenses] = useState([
      { name: "Basic", price: "29.99", included: true },
      { name: "Premium", price: "49.99", included: true },
      { name: "Exclusive", price: "299.99", included: false },
  ]);

  // --- Sub-components for styling ---
  const Input = ({ label, placeholder, value, onChange, icon: Icon, type = "text" }) => (
    <div>
      <label className="text-sm font-medium text-gray-400 mb-2 flex items-center">
          <Icon size={16} className="mr-2 text-gray-500" />
          {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-3 text-white focus:ring-2 focus:ring-green-500 transition-shadow focus:outline-none"
      />
    </div>
  );

  const FileInput = ({ title, file, onFileChange, acceptedTypes }) => (
    <div className="bg-neutral-800/50 border-2 border-dashed border-neutral-700 rounded-lg p-6 text-center cursor-pointer hover:bg-neutral-700/50 transition-colors">
        <UploadCloud className="mx-auto text-gray-500 mb-2" size={24}/>
        {!file ? (
            <>
                 <p className="text-white font-semibold">{title}</p>
                <p className="text-xs text-gray-400 mt-1">Drag & drop or click to upload</p>
            </>
        ) : (
            <div className="flex items-center justify-center text-green-400">
                <CheckCircle size={20} className="mr-2" />
                <p className="text-sm font-medium">{file.name}</p>
            </div>
        )}
        <input type="file" className="hidden" onChange={e => onFileChange(e.target.files[0])} accept={acceptedTypes} />
    </div>
  );

  return (
    <>
      <Head>
        <title>Upload Beat - ONDBeat</title>
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Sidebar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="md:ml-56">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onCartClick={() => setCartModalOpen(true)}
            cartItems={cartContents.length}
          />

          <main className="p-4 md:p-8 bg-gradient-to-b from-neutral-900 to-[#121212]">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-white mb-2">Upload Your Beat</h1>
                <p className="text-gray-400 text-lg">Fill out the details below to get your beat published.</p>
              </div>

               <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                   {/* --- Main Details --- */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="md:col-span-1">
                           <label className="text-sm font-medium text-gray-400 mb-2 block">Cover Art</label>
                           <div className="aspect-square bg-neutral-800/50 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-700 text-center cursor-pointer hover:bg-neutral-700/50 transition-colors relative">
                               <UploadCloud className="text-gray-500" size={32} />
                               <input type="file" className="absolute inset-0 w-full h-full opacity-0" />
                           </div>
                       </div>
                       <div className="md:col-span-2 space-y-6">
                           <Input label="Title" placeholder="e.g., Sunset Vibes" value={beatTitle} onChange={e => setBeatTitle(e.target.value)} icon={Music} />
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                               <Input label="BPM" placeholder="140" value={bpm} onChange={e => setBpm(e.target.value)} icon={Tag} />
                               <Input label="Key" placeholder="C# Minor" value={key} onChange={e => setKey(e.target.value)} icon={Tag} />
                                <div>
                                  <label className="text-sm font-medium text-gray-400 mb-2 flex items-center"><Music size={16} className="mr-2 text-gray-500"/>Genre</label>
                                  <select className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-3 text-white focus:ring-2 focus:ring-green-500 transition-shadow focus:outline-none">
                                      <option>Hip Hop</option>
                                      <option>R&B</option>
                                      <option>Drill</option>
                                      <option>Afrobeats</option>
                                      <option>Lofi</option>
                                  </select>
                                </div>
                           </div>
                           <Input label="Tags" placeholder="Chill, dark, Travis Scott type beat" value={tags} onChange={e => setTags(e.target.value)} icon={Tag} />
                       </div>
                   </div>

                  {/* --- File Uploads --- */}
                   <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Files</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FileInput title="Untagged MP3" file={mp3File} onFileChange={setMp3File} acceptedTypes=".mp3"/>
                        <FileInput title="Untagged WAV / Stems" file={wavFile} onFileChange={setWavFile} acceptedTypes=".wav,.zip"/>
                      </div>
                   </div>

                   {/* --- Pricing --- */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Pricing</h2>
                      <div className="bg-[#181818] rounded-lg p-6 space-y-4">
                        {licenses.map((lic, index) => (
                             <div key={lic.name} className="grid grid-cols-3 gap-4 items-center">
                                <div className="col-span-1 flex items-center">
                                     <input type="checkbox" id={`include-${lic.name}`} className="h-4 w-4 bg-neutral-700 border-neutral-600 rounded text-green-500 focus:ring-green-500" checked={lic.included} onChange={e => {
                                         const newLicenses = [...licenses];
                                         newLicenses[index].included = e.target.checked;
                                         setLicenses(newLicenses);
                                     }} />
                                    <label htmlFor={`include-${lic.name}`} className="ml-3 text-white font-medium">{lic.name}</label>
                                </div>
                                 <div className="col-span-2">
                                     <div className="relative">
                                         <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                          <input 
                                            type="text" 
                                            className="w-full bg-neutral-700 border border-neutral-600 rounded-md pl-9 p-2 text-white focus:ring-1 focus:ring-green-500 focus:outline-none"
                                            placeholder="29.99"
                                            value={lic.price}
                                            disabled={!lic.included}
                                            onChange={e => {
                                                 const newLicenses = [...licenses];
                                                 newLicenses[index].price = e.target.value;
                                                 setLicenses(newLicenses);
                                            }}
                                        />
                                     </div>
                                 </div>
                             </div>
                        ))}
                      </div>
                   </div>

                   {/* --- Submit --- */}
                   <div className="flex justify-end gap-4 pt-4 border-t border-neutral-800">
                        <button type="button" className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
                           Save as Draft
                        </button>
                       <button type="submit" className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full transition-colors">
                           Publish Beat
                       </button>
                   </div>
               </form>
            </div>
          </main>

          <PlayerBar isPlaying={false} onPlayPause={() => {}} currentTrack={null} progress={0} />
          <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} cartItems={cartContents} onRemoveItem={() => {}} onUpdateQuantity={() => {}} onCheckout={() => {}} />
        </div>
      </div>
    </>
  )
}
