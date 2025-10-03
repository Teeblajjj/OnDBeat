import Head from "next/head";
import Link from "next/link";
import { Compass, Star, Users, UserCircle } from "lucide-react";
import Layout from "../components/Layout";
import { FeedItem } from "../components/FeedItem";
import { db } from "../lib/firebase.js";
import { collection, getDocs, query, orderBy, limit, where, doc, getDoc } from "firebase/firestore";

export default function Home({ tracks, topProducers }) {
  // --- Components ---
  const TopProducersList = ({ producers }) => {
    const formatFollowers = (num) => {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
      }
      return num;
    };

    return (
      <section className="bg-[#181818] border border-neutral-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4">Top Producers</h3>
        <div className="space-y-4">
          {producers.map(p => (
            <div key={p.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {p.photoURL ? (
                  <img src={p.photoURL} alt={p.displayName} className="w-11 h-11 rounded-full object-cover" />
                ) : (
                  <UserCircle size={44} className="text-neutral-500" />
                )}
                  <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white">{p.displayName}</p>
                      </div>
                      <p className="text-sm text-neutral-400">{formatFollowers(p.followers)} followers</p>
                  </div>
              </div>
              <button className="bg-transparent border border-green-500 text-green-500 text-sm font-bold px-4 py-1.5 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-black transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <Layout>
      <Head>
        <title>Feed - ONDBEAT</title>
      </Head>
      <div className="p-4 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Feed</h2>
            {tracks.map(track => <FeedItem key={track.id} item={track} collectionName="tracks" />)}
          </div>

          {/* Sidebar Content */}
          <div className="space-y-8">
            <TopProducersList producers={topProducers} />
            <section className="bg-[#181818] border border-neutral-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Discover More</h3>
              <div className="flex flex-col gap-3">
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800/60 transition-colors"><Compass size={20} className="text-green-400"/><span>Browse Genres</span></Link>
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800/60 transition-colors"><Star size={20} className="text-yellow-400"/><span>Top Charts</span></Link>
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800/60 transition-colors"><Users size={20} className="text-blue-400"/><span>Community Picks</span></Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Fetch latest tracks
  const tracksQuery = query(collection(db, "tracks"), orderBy("createdAt", "desc"), limit(10));
  const tracksSnapshot = await getDocs(tracksQuery);
  const tracks = await Promise.all(tracksSnapshot.docs.map(async (docSnap) => {
    const trackData = docSnap.data();
    let producerData = null;

    if (trackData.creatorId) {
        const userRef = doc(db, "users", trackData.creatorId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            producerData = {
                displayName: userSnap.data().displayName,
                photoURL: userSnap.data().photoURL
            };
        }
    }

    // Fetch comments for the track
    const commentsQuery = query(collection(docSnap.ref, "comments"), orderBy("createdAt", "desc"));
    const commentsSnapshot = await getDocs(commentsQuery);
    const comments = commentsSnapshot.docs.map(commentDoc => {
        const commentData = commentDoc.data();
        return {
            id: commentDoc.id,
            ...commentData,
            createdAt: commentData.createdAt?.toDate ? commentData.createdAt.toDate().toISOString() : null,
        };
    });
    
    const createdAt = trackData.createdAt?.toDate ? trackData.createdAt.toDate().toISOString() : null;

    return {
      id: docSnap.id,
      ...trackData,
      createdAt,
      producer: producerData,
      comments: comments, // Add comments to the track data
    };
  }));

  // Fetch top producers
  const producersQuery = query(collection(db, "users"), where("isCreator", "==", true), orderBy("followers", "desc"), limit(5));
  const producersSnapshot = await getDocs(producersQuery);
  const topProducers = producersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      tracks: JSON.parse(JSON.stringify(tracks)),
      topProducers: JSON.parse(JSON.stringify(topProducers)),
    },
  };
}