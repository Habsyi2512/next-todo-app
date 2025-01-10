import { getRemovedTodos } from "@/actions/fetch";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getRemovedTodos();
  return NextResponse.json(
    { message: "success", data: result },
    { status: 200 }
  );
}
