import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MetadataStep from '../components/upload/MetadataStep';
import LicensingStep from '../components/upload/LicensingStep';
import PublishingStep from '../components/upload/PublishingStep';
import MonetizationStep from '../components/upload/MonetizationStep';
import ReleaseStep from '../components/upload/ReleaseStep';
import { TrackUpload } from '../lib/types';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { storage, firestore } from '../firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';

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
    priceMp3: null,
    priceWav: null,
    priceStems: null,
    exclusivePrice: null,
    isExclusiveAvailable: false,
    enableContentId: false,
    enableFreeDemo: false,
    previewLength: 60,
    status: 'Draft',
    releaseDate: new Date(),
  });
  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  if (!user || user.role !== 'creator') {
    return <div>You do not have permission to access this page.</div>;
  }

  const handleDataChange = (newData: Partial<TrackUpload>) => {
    setFormData(prev => ({...prev, ...newData}));
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'beatFile' | 'stemsFile' | 'coverArtFile') => {
    if (e.target.files) {
      const file = e.target.files[0];
      handleDataChange({ [fileType]: file });

      if (fileType === 'coverArtFile') {
        const reader = new FileReader();
        reader.onload = () => {
          setCoverArtPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handlePublish = async () => {
    if (!formData.beatFile || !formData.title) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const trackId = new Date().getTime().toString(); // simple unique id
      let coverImageUrl = '';
      if (formData.coverArtFile) {
        const coverArtRef = ref(storage, `tracks/${trackId}/cover_${formData.coverArtFile.name}`);
        await uploadFile(coverArtRef, formData.coverArtFile);
        coverImageUrl = await getDownloadURL(coverArtRef);
      }

      const beatFileRef = ref(storage, `tracks/${trackId}/beat_${formData.beatFile.name}`);
      await uploadFile(beatFileRef, formData.beatFile);
      const audioFileUrl = await getDownloadURL(beatFileRef);


      const trackData: Omit<TrackUpload, 'beatFile' | 'stemsFile' | 'coverArtFile'> = {
        ...formData,
        creatorId: user.uid,
        producerName: user.username,
        username: user.username,
        audioFile: audioFileUrl,
        coverImage: coverImageUrl,
        plays: 0,
        likes: 0,
        downloads: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(collection(firestore, 'tracks'), trackData);
      
      router.push(`/creators/${user.uid}`);

    } catch (e) {
      console.error("Error publishing track: ", e);
      alert('Error publishing track. Please try again.');
    }
  }

  const steps = [
    { title: 'Files',
      component: (
        <div>
          <h2 className="text-2xl font-bold mb-4">Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block mb-2 font-bold">Beat Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter beat title"
                value={formData.title}
                onChange={(e) => handleDataChange({ title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-bold">Main Beat File (MP3 or WAV)</label>
              <input type="file" onChange={(e) => handleFileChange(e, 'beatFile')} accept=".mp3,.wav" />
            </div>

            <div>
              <label className="block mb-2 font-bold">Stems / Trackouts (ZIP)</label>
              <input type="file" onChange={(e) => handleFileChange(e, 'stemsFile')} accept=".zip" />
            </div>

            <div>
              <label className="block mb-2 font-bold">Cover Art (Optional)</label>
              <input type="file" onChange={(e) => handleFileChange(e, 'coverArtFile')} accept="image/*" />
              {coverArtPreview && (
                <div className="mt-4">
                  <img src={coverArtPreview} alt="Cover art preview" className="w-48 h-48 object-cover" />
                </div>
              )}
            </div>
          </div>

          {uploading && (
            <div className="mt-4">
              <p>Uploading: {snapshot ? Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) : 0}%</p>
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-500">
              <p>Error: {error.message}</p>
            </div>
          )}
        </div>
      )
    },
    { title: 'Metadata', component: <MetadataStep formData={formData} updateData={handleDataChange} /> },
    { title: 'Licensing & Pricing', component: <LicensingStep formData={formData} updateData={handleDataChange} /> },
    { title: 'Publishing Info', component: <PublishingStep formData={formData} updateData={handleDataChange} /> },
    { title: 'Monetization', component: <MonetizationStep formData={formData} updateData={handleDataChange} /> },
    { title: 'Release & Visibility', component: <ReleaseStep formData={formData} updateData={handleDataChange} /> },
  ];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="hidden md:block">
        {/* Horizontal Stepper for Desktop */}
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base mb-8">
          {steps.map((s, index) => (
            <li
              key={s.title}
              className={`flex md:w-full items-center ${index < step ? 'text-green-600 dark:text-green-500' : ''} after:content-[''] after:w-full after:h-1 after:border-b ${index < step - 1 ? 'after:border-green-600' : 'after:border-gray-200'} after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
            >
              <span className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500`}>
                {index < step ? (
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg>
                ) : (
                  <span className="mr-2">{index + 1}</span>
                )}
                {s.title}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div>{steps[step - 1].component}</div>

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
            Back
          </button>
        )}
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-300 rounded">Save as Draft</button>
          {step < steps.length && (
            <button onClick={nextStep} className="px-4 py-2 bg-green-600 text-white rounded">
              Next
            </button>
          )}
          {step === steps.length && (
            <button onClick={handlePublish} className="px-4 py-2 bg-green-600 text-white rounded" disabled={uploading}>
              {uploading ? 'Publishing...' : 'Publish'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
