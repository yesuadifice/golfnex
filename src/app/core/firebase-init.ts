import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBGLL5VM2k6NNhjtrXt2RMtje035OZyVSU',
  authDomain: 'golfnex-78852.firebaseapp.com',
  projectId: 'golfnex-78852',
  storageBucket: 'golfnex-78852.appspot.com', // Verify this value in your Firebase Console
  messagingSenderId: '327154611831',
  appId: '1:327154611831:web:e9e69954602d245da9b872',
  measurementId: 'G-8J89NSFXZV',
};

// Initialize Firebase app instance
const app = initializeApp(firebaseConfig);

// Export Firebase Auth instance
export const firebaseAuth = getAuth(app);
