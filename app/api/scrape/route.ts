import { NextResponse } from "next/server";

export async function GET() {
  NextResponse.json({ success: "page loaded" });
}
