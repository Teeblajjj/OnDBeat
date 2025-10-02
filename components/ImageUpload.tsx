import { useState, useRef } from 'react';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../context/AuthContext';
import { storage } from '../lib/firebase';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  onFileSelect: (fileDataUrl: string) => void;
}

const ImageUpload = ({ onUploadComplete, onFileSelect }: ImageUploadProps) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return; // No file selected
    }
    if (!user) {
      setErrorMessage('You must be logged in to upload a file.');
      return;
    }

    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (readerEvent) => {
      const dataUrl = readerEvent.target?.result as string;
      onFileSelect(dataUrl); // For instant preview

      setIsUploading(true);
      setErrorMessage('');

      const storageRef = ref(storage, `profile-images/${user.uid}/profile.jpg`);

      try {
        // Use uploadString with the data URL, which is more robust
        const snapshot = await uploadString(storageRef, dataUrl, 'data_url');
        console.log('Uploaded a data_url string!', snapshot);

        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);

        onUploadComplete(downloadURL);
      } catch (error: any) {
        console.error('Upload failed:', error);
        setErrorMessage(`Upload failed: ${error.message}`);
      } finally {
        setIsUploading(false);
      }
    };
    reader.onerror = (error) => {
        console.error('FileReader error:', error);
        setErrorMessage('Failed to read file.');
    };
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        disabled={isUploading}
      />
      <button
        onClick={handleUploadButtonClick}
        className="bg-green-500 text-white font-bold py-2.5 px-5 rounded-lg hover:bg-green-600 transition-all text-sm"
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload New Image'}
      </button>
      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
    </div>
  );
};

export default ImageUpload;
