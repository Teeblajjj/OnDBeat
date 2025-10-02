import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDvfRAlL0HIKhcvMZYLqwBiXWuSKemffoU",
  authDomain: "ondbeat-7349d.firebaseapp.com",
  databaseURL: "https://ondbeat-7349d-default-rtdb.firebaseio.com",
  projectId: "ondbeat-7349d",
  storageBucket: "ondbeat-7349d.firebasestorage.app",
  messagingSenderId: "989498886313",
  appId: "1:989498886313:web:c54475bf08a6780378c1b8",
  measurementId: "G-7XS99THYN5"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, db, storage, analytics };
