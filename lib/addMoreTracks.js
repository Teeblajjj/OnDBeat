// lib/addMoreTracks.js
/*
 * =============================================================================
 * !! WARNING: FOR DEMO PURPOSES ONLY !!
 * =============================================================================
 * This script adds 7 new demo tracks to your 'tracks' collection,
 * assigning them to your existing demo creators.
 *
 * - It is safe to run and will NOT delete any existing data.
 *
 * To run this script:
 * 1. Make sure your service account key JSON file is in the root of your project.
 * 2. Run the script:
 *    node lib/addMoreTracks.js
 * 3. When prompted, enter the path to your service account key file (e.g., ./your-key.json)
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
    const absolutePath = path.resolve(process.cwd(), filePath.trim());
    const serviceAccount = require(absolutePath);
    
    initializeApp({
      credential: cert(serviceAccount)
    });
    
    const db = getFirestore();
    console.log('Firebase Admin SDK initialized successfully.');
    addMoreTracks(db);

  } catch (error) {
    console.error('Error initializing Firebase Admin SDK.', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
});

const addMoreTracks = async (db) => {
    console.log("Fetching demo creators...");
    const creatorsSnapshot = await db.collection('users').where('isCreator', '==', true).get();
    if (creatorsSnapshot.empty) {
        console.error("No creator users found. Cannot create new tracks.");
        return;
    }
    const creators = creatorsSnapshot.docs.map(doc => doc.data());
    console.log(`Found ${creators.length} creators.`);

    const newTracksData = [
        // Tracks for StellarBeats
        { title: 'Lunar Echoes', producerName: 'StellarBeats', username: 'stellarbeats', description: 'A dreamy, ambient track with a subtle hip-hop bounce.', genre: 'Ambient', mood: 'Relaxed', tags: ['ambient', 'chill', 'dreamy'], bpm: 80, key: 'D Minor', audioFile: '', coverImage: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&q=80', priceMp3: 19.99, priceWav: 29.99, priceStems: 79.99, exclusivePrice: 399.99, isExclusiveAvailable: true, plays: 450, likes: 32, downloads: 5 },
        { title: 'Solar Flare', producerName: 'StellarBeats', username: 'stellarbeats', description: 'An energetic, uplifting beat with a bright synth melody.', genre: 'Pop', mood: 'Uplifting', tags: ['pop', 'energetic', 'synth'], bpm: 125, key: 'G Major', audioFile: '', coverImage: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=400&q=80', priceMp3: 29.99, priceWav: 49.99, priceStems: 99.99, exclusivePrice: 499.99, isExclusiveAvailable: true, plays: 2100, likes: 150, downloads: 30 },

        // Tracks for RhythmRaider
        { title: 'Concrete Jungle', producerName: 'RhythmRaider', username: 'rhythmraider', description: 'A hard-hitting trap beat with gritty 808s.', genre: 'Trap', mood: 'Intense', tags: ['trap', 'hard', 'gritty'], bpm: 150, key: 'E Minor', audioFile: '', coverImage: 'https://images.unsplash.com/photo-1521120098171-4e9d4e3b1e6f?w=400&q=80', priceMp3: 34.99, priceWav: 54.99, priceStems: 129.99, exclusivePrice: 599.99, isExclusiveAvailable: true, plays: 4200, likes: 301, downloads: 55 },
        { title: 'Subway Surfin', producerName: 'RhythmRaider', username: 'rhythmraider', description: 'A classic boom-bap beat with a jazzy sample.', genre: 'Boom Bap', mood: 'Nostalgic', tags: ['boom bap', 'jazz', 'classic'], bpm: 92, key: 'F Major', audioFile: '', coverImage: 'https://images.unsplash.com/photo-1517677265842-87a20c3260d3?w=400&q=80', priceMp3: 29.99, priceWav: 49.99, priceStems: 99.99, exclusivePrice: 299.99, isExclusiveAvailable: true, plays: 1500, likes: 95, downloads: 18 },

        // Tracks for Synth Samurai
        { title: 'Katana Flow', producerName: 'Synth Samurai', username: 'synthsamurai', description: 'A sharp, precise drill beat with Japanese-inspired melodies.', genre: 'Drill', mood: 'Tense', tags: ['drill', 'japanese', 'sharp'], bpm: 145, key: 'C# Minor', audioFile: '', coverImage: 'https://images.unsplash.com/photo-1557007787-8a719992c676?w=400&q=80', priceMp3: 29.99, priceWav: 39.99, priceStems: 99.99, exclusivePrice: 0, isExclusiveAvailable: false, plays: 5500, likes: 410, downloads: 70 },
        { title: 'Digital Blossom', producerName: 'Synth Samurai', username: 'synthsamurai', description: 'A beautiful blend of traditional instruments and modern synth sounds.', genre: 'Electronic', mood: 'Beautiful', tags: ['electronic', 'beautiful', 'synth'], bpm: 110, key: 'A Major', audioFile: '', coverImage: 'https://images.unsplash.com/photo-1508700204689-08a6d4b58e72?w=400&q=80', priceMp3: 19.99, priceWav: 29.99, priceStems: 79.99, exclusivePrice: 399.99, isExclusiveAvailable: true, plays: 1800, likes: 120, downloads: 22 },
        { title: 'Zero Gravity', producerName: 'StellarBeats', username: 'stellarbeats', description: 'Floating pads and a deep bassline for a zero-gravity feel.', genre: 'Ambient', mood: 'Floating', tags: ['ambient', 'space', 'bass'], bpm: 70, key: 'G Minor', audioFile: '', coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80', priceMp3: 19.99, priceWav: 29.99, priceStems: 79.99, exclusivePrice: 299.99, isExclusiveAvailable: true, plays: 800, likes: 60, downloads: 10 }
    ];

    console.log("\nPopulating 'tracks' collection with 7 new tracks...");
    for (const trackData of newTracksData) {
        const creator = creators.find(c => c.displayName === trackData.producerName);
        if (!creator) {
            console.warn(`Could not find creator '${trackData.producerName}' for track '${trackData.title}'. Skipping.`);
            continue;
        }

        const trackRef = db.collection('tracks').doc();
        const trackId = trackRef.id;

        await trackRef.set({
            id: trackId,
            creatorId: creator.uid,
            ...trackData,
            createdAt: FieldValue.serverTimestamp()
        });
        
        const licensesRef = trackRef.collection('licenses');
        await licensesRef.doc('basic').set({ licenseType: 'basic', price: trackData.priceMp3, usageRights: 'Basic usage rights.' });
        await licensesRef.doc('premium').set({ licenseType: 'premium', price: trackData.priceWav, usageRights: 'Premium usage rights.' });
        if (trackData.isExclusiveAvailable) {
            await licensesRef.doc('exclusive').set({ licenseType: 'exclusive', price: trackData.exclusivePrice, usageRights: 'Exclusive usage rights.' });
        }
        
        console.log(`  Created track: '${trackData.title}' for creator '${creator.displayName}'`);
    }

    console.log("\nFinished adding new tracks!");
};
