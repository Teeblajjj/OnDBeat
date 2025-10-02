// lib/resetTracks.js
/*
 * =============================================================================
 * !! WARNING: DESTRUCTIVE SCRIPT !!
 * =============================================================================
 * This script will first DELETE ALL documents in your 'tracks' collection.
 * It will then repopulate it with new demo tracks based on the updated schema.
 *
 * >> DO NOT RUN THIS SCRIPT ON A PRODUCTION DATABASE. <<
 *
 * To run this script:
 * 1. Make sure your service account key JSON file is in the root of your project.
 * 2. Run the script:
 *    node lib/resetTracks.js
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
    resetTracks(db);

  } catch (error) {
    console.error('Error initializing Firebase Admin SDK.', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
});

async function deleteCollection(db, collectionPath, batchSize) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, resolve).catch(reject);
    });
}

async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        // When there are no documents left, we are done
        resolve();
        return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid exploding the stack.
    process.nextTick(() => {
        deleteQueryBatch(db, query, resolve);
    });
}

const resetTracks = async (db) => {
    console.log("Starting tracks collection reset...");

    // 1. Delete all existing documents in the 'tracks' collection
    console.log("Deleting all existing tracks...");
    await deleteCollection(db, 'tracks', 50);
    console.log("All existing tracks have been deleted.");

    // 2. Fetch demo creators to link new tracks to
    console.log("\nFetching demo creators...");
    const creatorsSnapshot = await db.collection('users').where('isCreator', '==', true).get();
    if (creatorsSnapshot.empty) {
        console.error("No creator users found. Cannot create new tracks.");
        return;
    }
    const creators = creatorsSnapshot.docs.map(doc => doc.data());
    console.log(`Found ${creators.length} creators.`);

    // 3. Define new mock tracks based on the new schema
    const newTracksData = [
        { title: 'Cosmic Drift', producerName: 'StellarBeats', username: 'stellarbeats', description: 'A lo-fi journey through space.', genre: 'Lo-Fi', mood: 'Chill', tags: ['lofi', 'space', 'chill'], bpm: 88, key: 'A Minor', audioFile: '', coverImage: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&q=80', priceMp3: 19.99, priceWav: 29.99, priceStems: 79.99, exclusivePrice: 299.99, isExclusiveAvailable: true, plays: 1250, likes: 88, downloads: 12 },
        { title: 'Night Drive', producerName: 'RhythmRaider', username: 'rhythmraider', description: '80s inspired synthwave for late-night drives.', genre: 'Synthwave', mood: 'Energetic', tags: ['synthwave', '80s', 'retro'], bpm: 120, key: 'C Major', audioFile: '', coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', priceMp3: 24.99, priceWav: 34.99, priceStems: 89.99, exclusivePrice: 349.99, isExclusiveAvailable: true, plays: 1850, likes: 112, downloads: 25 },
        { title: 'Cybernetic Soul', producerName: 'Synth Samurai', username: 'synthsamurai', description: 'A dark, futuristic cyberpunk track.', genre: 'Cyberpunk', mood: 'Dark', tags: ['cyberpunk', 'futuristic', 'dark'], bpm: 140, key: 'F# Minor', audioFile: '', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80', priceMp3: 29.99, priceWav: 39.99, priceStems: 99.99, exclusivePrice: 499.99, isExclusiveAvailable: false, plays: 3100, likes: 230, downloads: 45 },
    ];

    // 4. Populate the 'tracks' collection with new data
    console.log("\nPopulating 'tracks' collection with new schema...");
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
        
        // Populate licenses subcollection
        const licensesRef = trackRef.collection('licenses');
        await licensesRef.doc('basic').set({ licenseType: 'basic', price: trackData.priceMp3, usageRights: 'Basic usage rights.' });
        await licensesRef.doc('premium').set({ licenseType: 'premium', price: trackData.priceWav, usageRights: 'Premium usage rights.' });
        if (trackData.isExclusiveAvailable) {
            await licensesRef.doc('exclusive').set({ licenseType: 'exclusive', price: trackData.exclusivePrice, usageRights: 'Exclusive usage rights.' });
        }
        
        console.log(`  Created track: '${trackData.title}' for creator '${creator.displayName}'`);
    }

    console.log("\nTracks collection reset and population complete!");
};
