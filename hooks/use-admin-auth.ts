"use client"

import { useState, useEffect } from "react"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth"

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Sign in failed")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOutUser = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Sign out failed")
      throw error
    }
  }

  const getAuthToken = async () => {
    if (user) {
      try {
        return await user.getIdToken()
      } catch (error) {
        console.error("Error getting auth token:", error)
        return null
      }
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
