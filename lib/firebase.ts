import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Check if we have the required config
const hasRequiredConfig = firebaseConfig.apiKey && firebaseConfig.projectId

// Initialize Firebase client only if we have the required config
let app: any = null
let auth: any = null
let db: any = null
let storage: any = null

if (hasRequiredConfig) {
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig)
      console.log("Firebase client SDK initialized successfully")
    } catch (error) {
      console.error("Failed to initialize Firebase client SDK:", error)
      // Don't throw during build time
      if (typeof window !== 'undefined') {
        throw error
      }
    }
  } else {
    app = getApps()[0]
  }

  // Only initialize services if app was created successfully
  if (app) {
    try {
      auth = getAuth(app)
      db = getFirestore(app)
      storage = getStorage(app)
    } catch (error) {
      console.error("Failed to initialize Firebase services:", error)
      // Don't throw during build time
      if (typeof window !== 'undefined') {
        throw error
      }
    }
  }
} else {
  console.warn("Firebase config is incomplete. Some features may not work.")
}

// Export Firebase services
export { auth, db, storage }
export default app
