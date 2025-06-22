import { type NextRequest, NextResponse } from "next/server"
import { admin, db, auth } from "@/lib/firebaseAdmin"

export async function GET(request: NextRequest) {
  try {
    // Test Firestore connection
    const testDoc = await db.collection("_test").doc("connection").get()

    // Test Auth service
    const authTest = auth.app.name

    // Test admin instance
    const adminTest = admin.apps.length > 0

    return NextResponse.json({
      success: true,
      message: "Firebase Admin SDK is working correctly",
      tests: {
        firestore: "Connected",
        auth: `Connected to app: ${authTest}`,
        admin: `Admin apps initialized: ${adminTest}`,
        projectId: process.env.FIREBASE_PROJECT_ID,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Firebase test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
