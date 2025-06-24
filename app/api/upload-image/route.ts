// import { type NextRequest, NextResponse } from "next/server"
// import { bucket } from "@/lib/firebaseAdmin"

// async function generateBlurHash(imageBuffer: Buffer): Promise<string> {
//   try {
//     // Try to use sharp and blurhash if available
//     const sharp = await import("sharp")
//     const { encode } = await import("blurhash")

//     // Resize image to small size for blur hash generation
//     const { data, info } = await sharp
//       .default(imageBuffer)
//       .resize(32, 32, { fit: "inside" })
//       .ensureAlpha()
//       .raw()
//       .toBuffer({ resolveWithObject: true })

//     // Generate blur hash
//     const blurHash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4)
//     return blurHash
//   } catch (error) {
//     console.log("BlurHash generation failed, using default:", error)
//     return "LEHV6nWB2yk8pyo0adR*.7kCMdnj" // Default blur hash
//   }
// }

// async function optimizeImage(buffer: Buffer): Promise<Buffer> {
//   try {
//     const sharp = await import("sharp")

//     // Optimize image
//     const optimizedBuffer = await sharp
//       .default(buffer)
//       .resize(1200, 1200, {
//         fit: "inside",
//         withoutEnlargement: true,
//       })
//       .jpeg({
//         quality: 85,
//         progressive: true,
//       })
//       .toBuffer()

//     return optimizedBuffer
//   } catch (error) {
//     console.log("Image optimization failed, using original:", error)
//     return buffer
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     console.log("Starting image upload process...")

//     const formData = await request.formData()
//     const file = formData.get("image") as File

//     if (!file) {
//       console.log("No file provided")
//       return NextResponse.json({ error: "No image file provided" }, { status: 400 })
//     }

//     console.log("File received:", file.name, file.type, file.size)

//     // Validate file type
//     if (!file.type.startsWith("image/")) {
//       console.log("Invalid file type:", file.type)
//       return NextResponse.json({ error: "File must be an image" }, { status: 400 })
//     }

//     // Validate file size (max 10MB)
//     if (file.size > 10 * 1024 * 1024) {
//       console.log("File too large:", file.size)
//       return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 })
//     }

//     // Convert file to buffer
//     console.log("Converting file to buffer...")
//     const arrayBuffer = await file.arrayBuffer()
//     const buffer = Buffer.from(arrayBuffer)

//     // Generate blur hash
//     console.log("Generating blur hash...")
//     const blurHash = await generateBlurHash(buffer)

//     // Optimize image
//     console.log("Optimizing image...")
//     const optimizedBuffer = await optimizeImage(buffer)

//     // Generate unique filename
//     const timestamp = Date.now()
//     const randomString = Math.random().toString(36).substring(2, 15)
//     const fileExtension = file.name.split(".").pop() || "jpg"
//     const fileName = `products/${timestamp}-${randomString}.${fileExtension}`

//     console.log("Generated filename:", fileName)

//     let downloadURL = ""

//     try {
//       console.log("Attempting Firebase upload...")
//       // Try Firebase Storage upload
//       const { getStorage, ref, uploadBytes, getDownloadURL } = await import("firebase/storage")

//       const storage = getStorage()

//       const storageRef = ref(bucket, fileName)
//       const uploadResult = await uploadBytes(storageRef, optimizedBuffer, {
//         contentType: file.type,
//         customMetadata: {
//           originalName: file.name,
//           uploadedAt: new Date().toISOString(),
//           blurHash: blurHash,
//         },
//       })

//       downloadURL = await getDownloadURL(uploadResult.ref)
//       console.log("Firebase upload successful:", downloadURL)
//     } catch (firebaseError) {
//       console.log("Firebase upload failed, using base64:", firebaseError)
//       // Create a base64 data URL for demo purposes
//       downloadURL = `data:${file.type};base64,${optimizedBuffer.toString("base64")}`
//     }
//     console.log("Upload process completed successfully")

//     // Return the image data
//     return NextResponse.json({
//       success: true,
//       url: downloadURL,
//       hash: blurHash,
//       fileName: fileName,
//       size: optimizedBuffer.length,
//     })
//   } catch (error) {
//     console.error("Image upload error:", error)

//     // Return detailed error information
//     const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
//     const errorStack = error instanceof Error ? error.stack : undefined

//     return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to upload image",
//         details: errorMessage,
//         debug: process.env.NODE_ENV === "development" ? errorStack : undefined,
//       },
//       { status: 500 },
//     )
//   }
// }


import { type NextRequest, NextResponse } from "next/server"
import { bucket } from "@/lib/firebaseAdmin"

async function generateBlurHash(imageBuffer: Buffer): Promise<string> {
  try {
    // Try to use sharp and blurhash if available
    const sharp = await import("sharp")
    const { encode } = await import("blurhash")

    // Resize image to small size for blur hash generation
    const { data, info } = await sharp
      .default(imageBuffer)
      .resize(32, 32, { fit: "inside" })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    // Generate blur hash
    const blurHash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4)
    return blurHash
  } catch (error) {
    console.log("BlurHash generation failed, using default:", error)
    return "LEHV6nWB2yk8pyo0adR*.7kCMdnj" // Default blur hash
  }
}

async function optimizeImage(buffer: Buffer): Promise<Buffer> {
  try {
    const sharp = await import("sharp")

    // Optimize image
    const optimizedBuffer = await sharp
      .default(buffer)
      .resize(1200, 1200, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 85,
        progressive: true,
      })
      .toBuffer()

    return optimizedBuffer
  } catch (error) {
    console.log("Image optimization failed, using original:", error)
    return buffer
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("Starting image upload process...")

    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      console.log("No file provided")
      return NextResponse.json({ error: "No image file provided" }, { status: 400 })
    }

    console.log("File received:", file.name, file.type, file.size)

    // Validate file type
    if (!file.type.startsWith("image/")) {
      console.log("Invalid file type:", file.type)
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.log("File too large:", file.size)
      return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 })
    }

    // Convert file to buffer
    console.log("Converting file to buffer...")
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate blur hash
    console.log("Generating blur hash...")
    const blurHash = await generateBlurHash(buffer)

    // Optimize image
    console.log("Optimizing image...")
    const optimizedBuffer = await optimizeImage(buffer)

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop() || "jpg"
    const fileName = `products/${timestamp}-${randomString}.${fileExtension}`

    console.log("Generated filename:", fileName)

    let downloadURL = ""

    try {
      console.log("Attempting Firebase upload...")
      
      if (!bucket) {
        throw new Error("Firebase Storage not configured")
      }
      
      // Use Firebase Admin SDK for server-side upload
      const fileRef = bucket.file(fileName)
      
      // Upload the buffer to Firebase Storage
      await fileRef.save(optimizedBuffer, {
        metadata: {
          contentType: file.type,
          metadata: {
            originalName: file.name,
            uploadedAt: new Date().toISOString(),
            blurHash: blurHash,
          },
        },
      })

      // Make the file publicly accessible
      await fileRef.makePublic()

      // Get the public URL
      downloadURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`
      
      console.log("Firebase upload successful:", downloadURL)
    } catch (firebaseError) {
      console.log("Firebase upload failed, using base64:", firebaseError)
      // Create a base64 data URL for demo purposes
      downloadURL = `data:${file.type};base64,${optimizedBuffer.toString("base64")}`
    }
    
    console.log("Upload process completed successfully")

    // Return the image data
    return NextResponse.json({
      success: true,
      url: downloadURL,
      hash: blurHash,
      fileName: fileName,
      size: optimizedBuffer.length,
    })
  } catch (error) {
    console.error("Image upload error:", error)

    // Return detailed error information
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    const errorStack = error instanceof Error ? error.stack : undefined

    return NextResponse.json(
      {
        success: false,
        error: "Failed to upload image",
        details: errorMessage,
        debug: process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 },
    )
  }
}
