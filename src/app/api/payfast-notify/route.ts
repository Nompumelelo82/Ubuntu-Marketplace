import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);

    const orderId = params.get("m_payment_id");
    const paymentStatus = params.get("payment_status");

    if (!orderId) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    const newStatus = paymentStatus === "COMPLETE" ? "Paid" : "Failed";

    await adminDb.collection("orders").doc(orderId).update({
      paymentStatus: newStatus,
      status: newStatus === "Paid" ? "Confirmed" : "Failed",
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("PayFast notify error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};