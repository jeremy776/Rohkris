import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "FIREBASE API KEY",
  authDomain: "FIREBASE AUTH DOMAIN",
  databaseURL: "DATABASE URL",
  projectId: "PROJECT ID",
  storageBucket: "STORAGE BUCKET",
  messagingSenderId: "MESSAGING SENDER ID",
  appId: "APP ID",
  measurementId: "MEASUREMENT ID"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
