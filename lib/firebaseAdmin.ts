// lib/firebaseAdmin.ts
import { initializeApp, cert, getApps, ServiceAccount } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// Check if we have the required environment variables
const hasServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
const hasStorageBucket = process.env.FIREBASE_STORAGE_BUCKET;

let app: any = null;
let bucket: any = null;

if (hasServiceAccount) {
  try {
    const serviceAccount: ServiceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );

    app = getApps().length === 0
      ? initializeApp({
          credential: cert(serviceAccount),
          storageBucket: "walldecorator-b4f3d.firebasestorage.app",
        })
      : getApps()[0];

    bucket = getStorage(app).bucket();
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error);
    // Don't throw during build time
    if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
      console.warn("Firebase Admin not initialized - some features may not work");
    }
  }
} else {
  console.warn("Firebase Admin configuration missing - upload features will be disabled");
}

export { bucket };
