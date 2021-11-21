import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
};

const app = initializeApp(firebaseConfig);

// // Get a reference to the database service
const database = getDatabase(app);

export { database };
