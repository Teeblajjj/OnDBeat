import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TrackUpload } from '../../lib/types';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { storage, db as firestore } from '../../firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { Music, UploadCloud, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import LicenseEditor from '../../components/upload/LicenseEditor';
import PreviewStep from '../../components/upload/PreviewStep';
import Layout from '../../components/Layout'; // Import the Layout component

const UploadPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<TrackUpload>({
    title: '',
    genre: '',
    tags: [],
    bpm: null,
    key: '',
    description: '',
    licenses: [],
    proOrganization: '',
    ipiNumber: '',
    enableContentId: false,
    enableFreeDemo: false,
    previewLength: 60,
    status: 'Draft',
    releaseDate: new Date(),
    beatFile: null,
    stemsFile: null,
    coverArtFile: null,
    previewFile: null,
  });
  
  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  if (!user || !user.isCreator) {
    return (
        <Layout>
            <div className="text-center p-8 text-neutral-400">You do not have permission to access this page.</div>
        </Layout>
    );
  }

  const handleDataChange = (newData: Partial<TrackUpload>) => {
    setFormData(prev => ({...prev, ...newData}));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'beatFile' | 'stemsFile' | 'coverArtFile' | 'previewFile') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleDataChange({ [fileType]: file });

      if (fileType === 'coverArtFile') {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          setCoverArtPreview(loadEvent.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handlePublish = async () => {
    if (!formData.beatFile || !formData.title) {
      alert('Please provide a beat title and the main audio file.');
      return;
    }

    try {
      let coverImageUrl = '';
      if (formData.coverArtFile) {
        const coverArtRef = ref(storage, `tracks/${user.uid}/${Date.now()}_${formData.coverArtFile.name}`);
        await uploadFile(coverArtRef, formData.coverArtFile);
        coverImageUrl = await getDownloadURL(coverArtRef);
      }

      const beatFileRef = ref(storage, `tracks/${user.uid}/${Date.now()}_${formData.beatFile.name}`);
      await uploadFile(beatFileRef, formData.beatFile);
      const audioFileUrl = await getDownloadURL(beatFileRef);

      const trackData = {
        ...formData,
        creatorId: user.uid,
        producerName: user.displayName,
        username: user.username || user.displayName?.toLowerCase(),
        audioFile: audioFileUrl,
        coverImage: coverImageUrl,
        plays: 0,
        likes: [],
        downloads: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      delete trackData.beatFile;
      delete trackData.stemsFile;
      delete trackData.coverArtFile;
      delete trackData.previewFile;
      
      await addDoc(collection(firestore, 'tracks'), trackData);
      
      alert('Your beat has been uploaded successfully!');
      router.push(`/creators/${user.uid}`);

    } catch (e) {
      console.error("Error publishing track: ", e);
      alert('Error publishing track. Please try again.');
    }
  };

  const steps = [
    { title: 'Files' },
    { title: 'Metadata' },
    { title: 'Licensing' },
    { title: 'Publishing' },
    { title: 'Monetization' },
    { title: 'Release' },
    { title: 'Preview' },
  ];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Upload Your Beat</h1>
        <p className="text-neutral-400 text-center mb-12">Follow the steps to get your beat ready for the world.</p>
        
        {/* --- Stepper --- */}
        <div className="mb-12">
          <ol className="flex items-center justify-center w-full">
            {steps.map((s, index) => (
              <li key={s.title} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300 ${step > index ? 'bg-green-500 border-green-500 text-black' : 'bg-neutral-800 border-neutral-700 text-white'}`}>
                    {step > index ? <Check /> : index + 1}
                  </div>
                  <p className={`mt-2 text-xs font-bold ${step > index ? 'text-white' : 'text-neutral-500'}`}>{s.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-auto border-t-2 transition-all duration-300 mx-4 ${step > index + 1 ? 'border-green-500' : 'border-neutral-700'}`}></div>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* --- Form Body --- */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl shadow-lg p-8">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Upload Your Files</h2>
                <div className="space-y-6">
                    <div>
                        <label className="block mb-2 font-bold text-neutral-300">Beat Title*</label>
                        <input type="text" className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="Enter beat title" value={formData.title} onChange={(e) => handleDataChange({ title: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col items-center justify-center bg-neutral-900 border-2 border-dashed border-neutral-700 rounded-xl p-8 text-center">
                            <Music size={40} className="text-neutral-500 mb-2" />
                            <label htmlFor="audio-upload" className="font-semibold text-green-500 cursor-pointer hover:underline">Select Main File</label>
                            <p className="text-xs text-neutral-400 mt-1">MP3 or WAV</p>
                            <input id="audio-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e, 'beatFile')} accept=".mp3,.wav" />
                            {formData.beatFile && <p className="text-sm text-neutral-300 mt-3 truncate">{formData.beatFile.name}</p>}
                        </div>
                        <div className="flex flex-col items-center justify-center bg-neutral-900 border-2 border-dashed border-neutral-700 rounded-xl p-8 text-center">
                            <UploadCloud size={40} className="text-neutral-500 mb-2" />
                            <label htmlFor="preview-upload" className="font-semibold text-green-500 cursor-pointer hover:underline">Upload Preview File</label>
                            <p className="text-xs text-neutral-400 mt-1">MP3 (Optional)</p>
                            <input id="preview-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e, 'previewFile')} accept=".mp3" />
                            {formData.previewFile && <p className="text-sm text-neutral-300 mt-3 truncate">{formData.previewFile.name}</p>}
                        </div>
                        <div className="md:col-span-2 flex flex-col items-center justify-center bg-neutral-900 border-2 border-dashed border-neutral-700 rounded-xl p-8 text-center">
                            <ImageIcon size={40} className="text-neutral-500 mb-2" />
                            <label htmlFor="cover-upload" className="font-semibold text-green-500 cursor-pointer hover:underline">Upload Cover Art</label>
                            <p className="text-xs text-neutral-400 mt-1">1000x1000 recommended</p>
                            <input id="cover-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e, 'coverArtFile')} accept="image/*" />
                            {coverArtPreview && <img src={coverArtPreview} alt="Cover art preview" className="w-24 h-24 object-cover rounded-md mt-4" />}
                        </div>
                    </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Metadata</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-bold text-neutral-300">Genre*</label>
                    <input type="text" className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white" value={formData.genre} onChange={(e) => handleDataChange({ genre: e.target.value })} />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-neutral-300">Sub-Genre</label>
                    <input type="text" className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white" value={formData.subGenre} onChange={(e) => handleDataChange({ subGenre: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-2 font-bold text-neutral-300">Tags</label>
                    <input type="text" className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white" value={formData.tags.join(', ')} onChange={(e) => handleDataChange({ tags: e.target.value.split(',').map(t => t.trim()) })} />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-neutral-300">BPM*</label>
                    <input type="number" className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white" value={formData.bpm} onChange={(e) => handleDataChange({ bpm: parseInt(e.target.value) })} />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-neutral-300">Key*</label>
                    <input type="text" className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white" value={formData.key} onChange={(e) => handleDataChange({ key: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-2 font-bold text-neutral-300">Description</label>
                    <textarea className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white" rows={4} value={formData.description} onChange={(e) => handleDataChange({ description: e.target.value })} />
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Licensing & Pricing</h2>
                <LicenseEditor onLicensesChange={(licenses) => handleDataChange({ licenses })} />
              </div>
            )}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Publishing</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-bold text-neutral-300">PRO</label>
                    <input type="text" className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white" value={formData.proOrganization} onChange={(e) => handleDataChange({ proOrganization: e.target.value })} />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-neutral-300">IPI Number</label>
                    <input type="text" className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white" value={formData.ipiNumber} onChange={(e) => handleDataChange({ ipiNumber: e.target.value })} />
                  </div>
                </div>
              </div>
            )}
            {step === 5 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Monetization</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input type="checkbox" id="content-id" className="w-4 h-4 text-green-600 bg-neutral-800 border-neutral-700 rounded focus:ring-green-500" checked={formData.enableContentId} onChange={(e) => handleDataChange({ enableContentId: e.target.checked })} />
                    <label htmlFor="content-id" className="ml-2 text-white">Enable YouTube Content ID</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="free-download" className="w-4 h-4 text-green-600 bg-neutral-800 border-neutral-700 rounded focus:ring-green-500" checked={formData.enableFreeDemo} onChange={(e) => handleDataChange({ enableFreeDemo: e.target.checked })} />
                    <label htmlFor="free-download" className="ml-2 text-white">Enable Free Demo Download</label>
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-neutral-300">Preview Length (seconds)</label>
                    <input type="number" className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white" value={formData.previewLength} onChange={(e) => handleDataChange({ previewLength: parseInt(e.target.value) })} />
                  </div>
                </div>
              </div>
            )}
            {step === 6 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Release</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-bold text-neutral-300">Status</label>
                    <select className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white" value={formData.status} onChange={(e) => handleDataChange({ status: e.target.value as 'Public' | 'Private' | 'Draft' })}>
                      <option>Public</option>
                      <option>Private</option>
                      <option>Draft</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-neutral-300">Release Date</label>
                    <input type="date" className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white" value={formData.releaseDate.toISOString().split('T')[0]} onChange={(e) => handleDataChange({ releaseDate: new Date(e.target.value) })} />
                  </div>
                </div>
              </div>
            )}
            {step === 7 && <PreviewStep formData={formData} />}
        </div>

        <div className="flex justify-between mt-8">
            <button onClick={prevStep} className="px-6 py-3 bg-neutral-800 text-white font-bold rounded-full hover:bg-neutral-700 disabled:opacity-50 transition-colors" disabled={step === 1}>
                Back
            </button>
            <div className="flex gap-4">
                <button className="px-6 py-3 bg-neutral-800 text-white font-bold rounded-full hover:bg-neutral-700 transition-colors">Save as Draft</button>
                {step < steps.length ? (
                    <button onClick={nextStep} className="px-6 py-3 bg-green-600 text-black font-bold rounded-full hover:bg-green-500 transition-colors">
                    Next
                    </button>
                ) : (
                    <button onClick={handlePublish} className="px-6 py-3 bg-green-600 text-black font-bold rounded-full hover:bg-green-500 flex items-center transition-colors" disabled={uploading}>
                    {uploading ? <><Loader2 className="animate-spin mr-2" /> Publishing...</> : 'Publish'}
                    </button>
                )}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadPage;
