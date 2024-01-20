import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Your API logic here
  return NextResponse.json({ message: "Hello, world!" });
}
