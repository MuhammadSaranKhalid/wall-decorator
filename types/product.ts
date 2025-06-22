// export interface Product {
//   id: string
//   name: string
//   price: number
//   originalPrice?: number
//   image: string
//   images?: string[]
//   material: "Glass" | "Wood"
//   category?: string
//   tags?: string[]
//   dimensions?: {
//     width?: string
//     height?: string
//     depth?: string
//     weight?: string
//   }
//   blurHash?: string
//   description?: string
//   shortDescription?: string
//   features?: string[]
//   inStock: boolean
//   stockQuantity?: number
//   sku?: string
//   seoTitle?: string
//   seoDescription?: string
//   isCustomizable?: boolean
//   customizationOptions?: string[]
//   careInstructions?: string
//   warranty?: string
//   shippingInfo?: string
//   featured?: boolean
//   onSale?: boolean
//   salePrice?: number
//   availability?: "in-stock" | "out-of-stock" | "pre-order" | "discontinued"
//   createdAt?: Date
//   updatedAt?: Date
// }

export interface Product {
  // Identifiers
  id: string // Auto-generated document ID
  sku: string // Stock Keeping Unit
  slug: string // URL-friendly product name

  // Basic Info
  name: string // Product name
  category: string // Product category
  tags: string[] // Search tags
  material: "Glass" | "Wood" // Product material

  // Pricing
  pricing: {
    originalPrice?: number // Original price (before any discounts)
    salePrice?: number // Discounted price if on sale
    isOnSale: boolean // Indicates if the product is on sale
    effectivePrice: number // Current price to be shown to users
    currency: string // Currency code, e.g., "USD", "PKR"
  }

  // Images and Media
  image: string // Main product image URL
  images: {
    url: string // Image URL
    blurHash: string // BlurHash placeholder
    alt?: string // Alt text for accessibility/SEO
  }[]

  // Descriptions
  shortDescription: string // Brief product summary
  description: string // Full product description
  features: string[] // List of product features

  // Dimensions (optional block)
  dimensions?: {
    width?: string
    height?: string
    depth?: string
    weight?: string
  }

  // Inventory and Availability
  inStock: boolean // Is it currently in stock?
  stockQuantity?: number // Quantity available (if known)
  availability: "in-stock" | "out-of-stock" | "pre-order" | "discontinued"

  // Product Details
  careInstructions?: string // Maintenance tips
  warranty?: string // Warranty details
  shippingInfo?: string // Shipping and delivery notes

  // Customization
  isCustomizable: boolean // Whether product supports customization
  customizationOptions?: {
    label: string // Option name
    type: "text" | "select" | "color" | "upload"
    values?: string[] // Values for dropdown/color
    required?: boolean
  }[]

  // SEO Metadata
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    canonicalUrl?: string
  }

  // Admin Flags
  featured: boolean // Is it a featured product?
  status: "active" | "inactive" | "draft"
  visibility: "public" | "private"

  // Timestamps and Audit Trail
  createdAt: any // Firestore Timestamp
  updatedAt: any // Firestore Timestamp
  createdBy: string // Admin user ID
  updatedBy: string // Last updated by admin ID
  updateHistory?: {
    updatedBy: string
    updatedAt: any // Firestore Timestamp
  }[]

  // Soft Deletion Support
  isDeleted?: boolean
  deletedAt?: any // Firestore Timestamp
  deletedBy?: string

  // Analytics
  viewCount: number // Product view count
  purchaseCount: number // Times purchased
  rating: number // Average rating (0–5)
  reviewCount: number // Number of reviews
}

export interface CustomizationOption {
  label: string
  type: "text" | "select" | "color" | "upload"
  values?: string[]
  required?: boolean
}

export interface ProductImage {
  url: string
  blurHash: string
  alt?: string
}
