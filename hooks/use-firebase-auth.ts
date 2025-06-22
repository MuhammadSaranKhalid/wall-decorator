"use client"

import { useState, useEffect } from "react"
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface AdminUser extends User {
  role?: string
  permissions?: string[]
}

export function useFirebaseAuth() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
          const userData = userDoc.data()

          if (userData && userData.role === "admin") {
            setUser({
              ...firebaseUser,
              role: userData.role,
              permissions: userData.permissions,
            })
          } else {
            setUser(null)
            setError("Unauthorized: Admin access required")
          }
        } catch (err) {
          console.error("Error fetching user data:", err)
          setError("Error loading user data")
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signOutUser = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const getAuthToken = async (): Promise<string | null> => {
    if (user) {
      return await user.getIdToken()
    }
    return null
  }

  return {
    user,
    loading,
    error,
    signIn,
    signOut: signOutUser,
    getAuthToken,
  }
}
