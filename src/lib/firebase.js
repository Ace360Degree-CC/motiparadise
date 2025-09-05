import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_dwPAnPq-_da1m_kFt5XRFeeY5Us8W8w",
  authDomain: "motiparadise-bookings.firebaseapp.com",
  projectId: "motiparadise-bookings",
  storageBucket: "motiparadise-bookings.appspot.com",
  messagingSenderId: "324508585000",
  appId: "1:324508585000:web:8b131abc66bd3aaedab91d",
  measurementId: "G-SRNDSDG6V1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
