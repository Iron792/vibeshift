import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "vibeshift",
    mode: "starter",
    timestamp: new Date().toISOString(),
  });
}