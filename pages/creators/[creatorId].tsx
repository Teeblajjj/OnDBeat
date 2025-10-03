import { useRouter } from 'next/router';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase/config';
import { collection, doc, query, where } from 'firebase/firestore';
import { TrackUpload } from '../../lib/types';
import TrackCard from '../../components/track/TrackCard';

const CreatorProfilePage = () => {
  const router = useRouter();
  const { creatorId } = router.query;

  const [creatorDoc, loadingCreator, errorCreator] = useDocument(
    doc(firestore, `users/${creatorId}`)
  );

  const [tracksCollection, loadingTracks, errorTracks] = useCollection(
    query(collection(firestore, 'tracks'), where('creatorId', '==', creatorId))
  );

  if (loadingCreator || loadingTracks) {
    return <div>Loading...</div>;
  }

  if (errorCreator || errorTracks) {
    return <div>Error: {errorCreator?.message || errorTracks?.message}</div>;
  }

  if (!creatorDoc?.exists()) {
    return <div>Creator not found.</div>;
  }

  const creator = creatorDoc.data();
  const tracks = tracksCollection?.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TrackUpload[] | undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <img
          src={creator?.profilePictureUrl || 'https://via.placeholder.com/150'}
          alt={`${creator?.username}'s profile picture`}
          className="w-32 h-32 rounded-full mr-8"
        />
        <div>
          <h1 className="text-4xl font-bold">{creator?.username}</h1>
          <p className="text-gray-600">{creator?.bio}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Tracks</h2>
        {tracks && tracks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map(track => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        ) : (
          <p>This creator has not uploaded any tracks yet.</p>
        )}
      </div>
    </div>
  );
};

export default CreatorProfilePage;
