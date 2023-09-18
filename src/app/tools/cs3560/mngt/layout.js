"use client";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  FirebaseAppProvider,
  AuthProvider,
  FirestoreProvider,
  useFirestoreDocData,
  useFirestore,
  useFirebaseApp,
} from "reactfire";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function FirebaseComponents({ children }) {
  const firebaseApp = useFirebaseApp();

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>
    </AuthProvider>
  );
}

export default function ManagementLayout({ children }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseComponents>{children}</FirebaseComponents>
    </FirebaseAppProvider>
  );
}
