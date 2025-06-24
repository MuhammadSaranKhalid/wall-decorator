import { type NextRequest, NextResponse } from "next/server"
import { OrderService } from "@/lib/firebase-service"

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()
    
    // Validate required fields
    if (!orderData.items || !orderData.shippingAddress || !orderData.paymentInfo) {
      return NextResponse.json(
        { error: "Missing required order data" },
        { status: 400 }
      )
    }

    // Create order in Firebase
    const orderId = await OrderService.createOrder({
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      paymentInfo: orderData.paymentInfo,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      tax: orderData.tax,
      total: orderData.total,
      createdAt: new Date(),
      status: "confirmed",
    })

    return NextResponse.json({
      success: true,
      orderId,
      message: "Order created successfully",
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (email) {
      // Get orders by email
      const orders = await OrderService.getOrdersByEmail(email)
      return NextResponse.json({ orders })
    } else {
      // Get all orders (for admin)
      const orders = await OrderService.getAllOrders()
      return NextResponse.json({ orders })
    }
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}
