// lib/setupFirestore.js
/*
 * This script initializes your Firestore database with the required collections.
 *
 * To run this script:
 * 1. Make sure your service account key JSON file is in the root of your project.
 * 2. Run the script:
 *    node lib/setupFirestore.js
 * 3. When prompted, enter the filename starting with './'
 *    Example: ./your-service-account-key.json
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Please enter the path to your service account key JSON file (e.g., ./your-key.json): ", (filePath) => {
  try {
    // Resolve the path relative to the current working directory
    const absolutePath = path.resolve(process.cwd(), filePath.trim());
    const serviceAccount = require(absolutePath);
    
    initializeApp({
      credential: cert(serviceAccount)
    });
    
    const db = getFirestore();
    console.log('Firebase Admin SDK initialized successfully.');
    setupFirestore(db);

  } catch (error) {
    console.error('Error initializing Firebase Admin SDK.', error.message);
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('Hint: Make sure the file path is correct and the file is in your project workspace.');
    }
    process.exit(1);
  } finally {
    rl.close();
  }
});

const collections = {
  tracks: {
    id: 'track_123',
    creatorId: 'user_abc',
    title: 'Sample Beat',
    description: 'A sample beat description.',
    genre: 'Hip-Hop',
    mood: 'Energetic',
    bpm: 120,
    key: 'C Minor',
    coverImage: 'https://example.com/cover.jpg',
    audioFile: 'https://example.com/beat.mp3',
    tags: ['sample', 'beat'],
    priceMp3: 29.99,
    priceWav: 49.99,
    priceStems: 99.99,
    exclusivePrice: 499.99,
    isExclusiveAvailable: true,
    plays: 0,
    likes: 0,
    downloads: 0,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  },
  collections: {
    id: 'collection_123',
    creatorId: 'user_abc',
    name: 'Sample Collection',
    description: 'A collection of sample tracks.',
    coverImage: 'https://example.com/collection_cover.jpg',
    trackIds: ['track_123'],
    visibility: 'public',
    createdAt: FieldValue.serverTimestamp(),
  },
  soundKits: {
    id: 'soundkit_123',
    creatorId: 'user_abc',
    name: 'Sample Sound Kit',
    description: 'A kit of sample sounds.',
    coverImage: 'https://example.com/kit_cover.jpg',
    files: ['/files/kick.wav', '/files/snare.wav'],
    price: 39.99,
    salesCount: 0,
    createdAt: FieldValue.serverTimestamp(),
  },
  mediaFiles: {
    id: 'media_123',
    creatorId: 'user_abc',
    type: 'image',
    title: 'Cover Art',
    fileUrl: 'https://example.com/media.jpg',
    description: 'Cover art for a track.',
    createdAt: FieldValue.serverTimestamp(),
  },
  sales: {
    id: 'sale_123',
    buyerId: 'user_xyz',
    creatorId: 'user_abc',
    itemType: 'track',
    itemId: 'track_123',
    licenseType: 'mp3',
    amount: 29.99,
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'stripe',
    createdAt: FieldValue.serverTimestamp(),
  },
  payouts: {
    id: 'payout_123',
    creatorId: 'user_abc',
    amount: 150.0,
    currency: 'USD',
    method: 'paypal',
    status: 'completed',
    requestedAt: FieldValue.serverTimestamp(),
    processedAt: FieldValue.serverTimestamp(),
  },
  contracts: {
    id: 'contract_123',
    creatorId: 'user_abc',
    buyerId: 'user_xyz',
    trackId: 'track_123',
    licenseType: 'exclusive',
    contractFile: 'https://example.com/contract.pdf',
    status: 'signed',
    signedAt: FieldValue.serverTimestamp(),
    expiresAt: null,
  },
  campaigns: {
    id: 'campaign_123',
    creatorId: 'user_abc',
    campaignTitle: 'Summer Beat Promo',
    itemType: 'track',
    itemId: 'track_123',
    budget: 100.0,
    dailyBudget: 10.0,
    startDate: FieldValue.serverTimestamp(),
    endDate: FieldValue.serverTimestamp(),
    targeting: { global: true },
    status: 'active',
    createdAt: FieldValue.serverTimestamp(),
  },
};

const setupFirestore = async (db) => {
  console.log('Starting Firestore setup...');
  for (const collectionName in collections) {
    try {
      const docData = collections[collectionName];
      const docId = docData.id;
      await db.collection(collectionName).doc(docId).set(docData);
      console.log(`Successfully created collection '${collectionName}' with a sample document.`);
    } catch (error) {
      console.error(`Error creating collection '${collectionName}':`, error);
    }
  }
  console.log('Firestore setup complete.');
};
