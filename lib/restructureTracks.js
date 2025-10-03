// lib/restructureTracks.js
/*
 * =============================================================================
 * !! WARNING: DESTRUCTIVE SCRIPT !!
 * =============================================================================
 * This script will DELETE ALL documents in your 'tracks' collection and all its
 * subcollections. It will then repopulate it with new demo tracks, licenses,
 * and comments.
 *
 * To run: node lib/restructureTracks.js
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const readline = require('readline');
const path = require('path');

// --- Main Execution Block ---
const main = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Please enter the path to your service account key JSON file (e.g., ./your-key.json): ", async (filePath) => {
        try {
            const absolutePath = path.resolve(process.cwd(), filePath.trim());
            const serviceAccount = require(absolutePath);
            
            initializeApp({
                credential: cert(serviceAccount)
            });
            
            const db = getFirestore();
            console.log('Firebase Admin SDK initialized successfully.');
            
            await restructureTracks(db);

        } catch (error) {
             if (error.code === 'app/duplicate-app') {
                const db = getFirestore();
                console.log('Firebase Admin SDK was already initialized.');
                await restructureTracks(db);
            } else {
                console.error('Fatal Error:', error.message);
            }
        } finally {
            rl.close();
        }
    });
};

// --- Helper to delete a collection ---
async function deleteCollection(db, collectionPath, batchSize = 100) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);
    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, resolve).catch(reject);
    });
}

async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();
    if (snapshot.size === 0) {
        resolve();
        return;
    }
    const batch = db.batch();
    for (const doc of snapshot.docs) {
        const subcollections = await doc.ref.listCollections();
        for (const sub of subcollections) {
            await deleteCollection(db, sub.path);
        }
        batch.delete(doc.ref);
    }
    await batch.commit();
    process.nextTick(() => {
        deleteQueryBatch(db, query, resolve);
    });
}

// --- Data Definitions ---
const getLicenseData = (prices) => ({
    mp3: { licenseType: 'mp3', price: prices.priceMp3, files: "MP3", usageTerms: [{ icon: 'Copy', text: 'Distribute up to 2,000 copies', included: true }, { icon: 'Signal', text: '50,000 Online Audio Streams', included: true }] },
    wav: { licenseType: 'wav', price: prices.priceWav, files: "MP3, WAV", usageTerms: [{ icon: 'Copy', text: 'Distribute up to 5,000 copies', included: true }, { icon: 'Signal', text: '100,000 Online Audio Streams', included: true }, { icon: 'Video', text: '1 Music Video', included: true }] },
    trackout: { licenseType: 'trackout', price: prices.priceStems, files: "MP3, WAV, Stems", usageTerms: [{ icon: 'Copy', text: 'Distribute Unlimited copies', included: true }, { icon: 'Signal', text: '1,000,000 Online Audio Streams', included: true }, { icon: 'Video', text: 'Unlimited Music Videos', included: true }, { icon: 'Mic2', text: 'For Profit Live Performances', included: true }] },
    unlimited: { licenseType: 'unlimited', price: prices.priceUnlimited, files: "MP3, WAV, Stems", usageTerms: [{ icon: 'Copy', text: 'Distribute Unlimited copies', included: true }, { icon: 'Signal', text: 'Unlimited Online Audio Streams', included: true }, { icon: 'RadioTower', text: 'Unlimited Radio Broadcasting', included: true }, { icon: 'Video', text: 'Unlimited Music Videos', included: true }, { icon: 'Mic2', text: 'For Profit Live Performances', included: true }] },
    exclusive: { licenseType: 'exclusive', price: prices.exclusivePrice, files: "MP3, WAV, Stems", allowOffers: true, usageTerms: [{ icon: 'Copy', text: 'Exclusive Rights - Beat is sold only once', included: true }] }
});

const newTracksData = [
    {
        producerName: 'StellarBeats', title: 'Cosmic Drift', description: 'A lo-fi journey through space.', genre: 'Hip-Hop', subGenre: 'Lo-Fi', mood: 'Chill', tags: ['lofi', 'space', 'chill'], bpm: 88, key: 'A Minor', referenceArtists: ['J Dilla'],
        priceMp3: 29.99, priceWav: 49.99, priceStems: 99.99, priceUnlimited: 199.99, exclusivePrice: 499.99, isExclusiveAvailable: true,
        pro: 'BMI', ipi: '123456789', splits: [{ name: 'StellarBeats', percentage: 100 }], contentId: false, freeDownload: true, previewLength: 60, status: 'public',
        coverImage: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&q=80',
    },
];

const sampleComments = [
    "This is a certified classic!",
    "The vibe on this is insane, had to get it.",
    "Fire beat! 🔥"
];

// --- Main Script Logic ---
const restructureTracks = async (db) => {
    try {
        console.log("Starting tracks collection restructure...");
        console.log("Step 1: Deleting all existing tracks and their subcollections...");
        await deleteCollection(db, 'tracks');
        console.log("  -> All existing tracks have been deleted.");

        console.log("\nStep 2: Fetching all user data for comments...");
        const usersSnapshot = await db.collection('users').get();
        if (usersSnapshot.empty) {
            console.error("  -> No users found. Cannot create comments.");
            return;
        }
        const allUsers = usersSnapshot.docs.map(doc => doc.data());
        const creators = allUsers.filter(u => u.isCreator);
        console.log(`  -> Found ${allUsers.length} total users.`);

        console.log("\nStep 3: Populating 'tracks' collection...");
        for (const trackData of newTracksData) {
            const creator = creators.find(c => c.displayName === trackData.producerName);
            if (!creator) continue;

            const trackRef = db.collection('tracks').doc();
            const trackId = trackRef.id;

            await trackRef.set({
                id: trackId, creatorId: creator.uid, producerName: creator.displayName, username: creator.displayName.toLowerCase(),
                title: trackData.title, description: trackData.description, genre: trackData.genre, mood: trackData.mood, tags: trackData.tags,
                bpm: trackData.bpm, key: trackData.key,
                audioFile: `gs://ondbeat/tracks/${trackId}/audio.mp3`, previewUrl: ``, coverImage: trackData.coverImage,
                priceMp3: trackData.priceMp3, priceWav: trackData.priceWav, priceStems: trackData.priceStems, exclusivePrice: trackData.exclusivePrice, isExclusiveAvailable: trackData.isExclusiveAvailable,
                plays: Math.floor(Math.random() * 5000), likes: 0, downloads: Math.floor(Math.random() * 50),
                createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp(),
                publishing: { producerDisplayName: creator.displayName, producerTagline: '', pro: trackData.pro, ipi: trackData.ipi, splits: trackData.splits },
                monetization: { contentId: trackData.contentId, freeDownload: trackData.freeDownload, previewLength: trackData.previewLength },
                release: { status: trackData.status, releaseDate: FieldValue.serverTimestamp() }
            });
            
            // Populate licenses subcollection
            const licensesRef = trackRef.collection('licenses');
            const licenses = getLicenseData(trackData);
            await licensesRef.doc('mp3').set(licenses.mp3);
            await licensesRef.doc('wav').set(licenses.wav);
            await licensesRef.doc('trackout').set(licenses.trackout);
            await licensesRef.doc('unlimited').set(licenses.unlimited);
            if (trackData.isExclusiveAvailable) {
                await licensesRef.doc('exclusive').set(licenses.exclusive);
            }
            
            // Populate comments subcollection
            const commentsRef = trackRef.collection('comments');
            const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
            await commentsRef.add({
                text: sampleComments[Math.floor(Math.random() * sampleComments.length)],
                userId: randomUser.uid,
                displayName: randomUser.displayName,
                photoURL: randomUser.photoURL,
                likeCount: Math.floor(Math.random() * 50),
                createdAt: FieldValue.serverTimestamp(),
                parentId: null,
                replyCount: 0
            });
            
            console.log(`  -> Created track '${trackData.title}' for '${creator.displayName}' with licenses and comments.`);
        }
        console.log("\nTracks collection restructure complete!");
    } catch (error) {
        console.error("An error occurred during the script execution: ", error);
    }
};

// --- Execute Main Function ---
main();
