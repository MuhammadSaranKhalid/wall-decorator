import { type NextRequest, NextResponse } from "next/server"
// import { verifyAdminToken } from "@/lib/firebase-admin"
import { OrderService } from "@/lib/firebase-service"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split("Bearer ")[1]
    // await verifyAdminToken(token)

    const { status } = await request.json()

    await OrderService.updateOrderStatus(params.id, status)

    return NextResponse.json({ message: "Order status updated successfully" })
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
