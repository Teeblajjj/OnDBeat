import { Timestamp } from 'firebase/firestore';

export interface UsageTerms {
  distributionCopies: number | 'unlimited';
  audioStreams: number | 'unlimited';
  musicVideos: number | 'unlimited';
  livePerformances: boolean;
  radioStations: number | 'unlimited';
}

export interface License {
  name: string;
  price: number | null;
  files: {
    mp3: boolean;
    wav: boolean;
    stems: boolean;
  };
  usageTerms: UsageTerms;
  isDefault?: boolean; // To distinguish from custom licenses
}

export interface TrackUpload {
  // --- Files (Not in DB, for FE state)
  beatFile?: File | null;
  stemsFile?: File | null;
  coverArtFile?: File | null;
  previewFile?: File | null; // Added for separate preview upload

  // --- Step 1: Core Info
  title: string;
  
  // --- Step 2: Metadata
  genre: string;
  subGenre?: string;
  tags: string[];
  bpm: number | null;
  key: string;
  description: string;
  referenceArtists?: string[];

  // --- Step 3: Licensing & Pricing
  licenses: License[]; // Replaces flat price fields

  // --- Step 4: Publishing Info
  proOrganization?: string;
  ipiNumber?: string;
  
  // --- Step 5: Monetization
  enableContentId: boolean;
  enableFreeDemo: boolean;
  previewLength: number; // in seconds

  // --- Step 6: Release & Visibility
  status: 'Public' | 'Private' | 'Draft';
  releaseDate: Date | null;

  // --- DB Fields (Populated on save)
  id?: string;
  creatorId?: string;
  producerName?: string;
  username?: string;
  audioFile?: string; // storage path
  previewUrl?: string;
  coverImage?: string; // storage path
  plays?: number;
  likes?: number;
  downloads?: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
