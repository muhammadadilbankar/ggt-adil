// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // Import Firestore
import { getStorage } from "firebase/storage";  // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC34SmNybw1BhxTzzAO8MHtLr6Xh9lsBDU",
  authDomain: "ggty-c20f4.firebaseapp.com",
  projectId: "ggty-c20f4",
  storageBucket: "ggty-c20f4.firebasestorage.app",
  messagingSenderId: "304024437329",
  appId: "1:304024437329:web:493da9b0897d3132c2ae70",
  measurementId: "G-FR4G7VBCPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const firestore = getFirestore(app);  // Firestore initialization
const storage = getStorage(app);  // Storage initialization

// Initialize Analytics (Optional, based on your usage)
const analytics = getAnalytics(app);

// Export Firestore and Storage
export { firestore, storage };
