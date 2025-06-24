import { collection, addDoc, getDocs, doc, updateDoc, getDoc, query, orderBy, where } from "firebase/firestore"

// Lazy import Firebase to avoid initialization during build
let db: any = null

const getFirestore = async () => {
  if (!db) {
    const { db: firestore } = await import("./firebase")
    if (!firestore) {
      throw new Error("Firebase is not properly configured. Please check your environment variables.")
    }
    db = firestore
  }
  return db
}

export interface OrderData {
  id?: string
  items: any[]
  shippingAddress: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    apartment?: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentInfo: {
    method: "cod" | "card"
    billingAddress: any
    sameAsShipping: boolean
  }
  subtotal: number
  shipping: number
  tax: number
  total: number
  createdAt: Date
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered"
}

export class OrderService {
  private static COLLECTION_NAME = "orders"

  static async createOrder(orderData: Omit<OrderData, "id">): Promise<string> {
    try {
      const firestore = await getFirestore()
      const docRef = await addDoc(collection(firestore, this.COLLECTION_NAME), {
        ...orderData,
        createdAt: new Date(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error creating order:", error)
      throw new Error("Failed to create order")
    }
  }

  static async getAllOrders(): Promise<OrderData[]> {
    try {
      const firestore = await getFirestore()
      const q = query(collection(firestore, this.COLLECTION_NAME), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as OrderData[]
    } catch (error) {
      console.error("Error fetching orders:", error)
      throw new Error("Failed to fetch orders")
    }
  }

  static async getOrderById(orderId: string): Promise<OrderData | null> {
    try {
      const firestore = await getFirestore()
      const docRef = doc(firestore, this.COLLECTION_NAME, orderId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as OrderData
      }
      
      return null
    } catch (error) {
      console.error("Error fetching order:", error)
      throw new Error("Failed to fetch order")
    }
  }

  static async updateOrderStatus(orderId: string, status: OrderData["status"]): Promise<void> {
    try {
      const firestore = await getFirestore()
      const docRef = doc(firestore, this.COLLECTION_NAME, orderId)
      await updateDoc(docRef, { status })
    } catch (error) {
      console.error("Error updating order status:", error)
      throw new Error("Failed to update order status")
    }
  }

  static async getOrdersByEmail(email: string): Promise<OrderData[]> {
    try {
      const firestore = await getFirestore()
      const q = query(
        collection(firestore, this.COLLECTION_NAME),
        where("shippingAddress.email", "==", email),
        orderBy("createdAt", "desc")
      )
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as OrderData[]
    } catch (error) {
      console.error("Error fetching orders by email:", error)
      throw new Error("Failed to fetch orders")
    }
  }
}

export class ProductService {
  private static COLLECTION_NAME = "products"

  static async createProduct(productData: any, adminId: string): Promise<string> {
    try {
      const firestore = await getFirestore()
      const docRef = await addDoc(collection(firestore, this.COLLECTION_NAME), {
        ...productData,
        createdBy: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error creating product:", error)
      throw new Error("Failed to create product")
    }
  }

  static async getAllProducts(): Promise<any[]> {
    try {
      const firestore = await getFirestore()
      const querySnapshot = await getDocs(collection(firestore, this.COLLECTION_NAME))
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Error fetching products:", error)
      throw new Error("Failed to fetch products")
    }
  }

  static async getProductById(productId: string): Promise<any | null> {
    try {
      const firestore = await getFirestore()
      const docRef = doc(firestore, this.COLLECTION_NAME, productId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        }
      }
      
      return null
    } catch (error) {
      console.error("Error fetching product:", error)
      throw new Error("Failed to fetch product")
    }
  }

  static async updateProduct(productId: string, productData: any): Promise<void> {
    try {
      const firestore = await getFirestore()
      const docRef = doc(firestore, this.COLLECTION_NAME, productId)
      await updateDoc(docRef, {
        ...productData,
        updatedAt: new Date(),
      })
    } catch (error) {
      console.error("Error updating product:", error)
      throw new Error("Failed to update product")
    }
  }
}
