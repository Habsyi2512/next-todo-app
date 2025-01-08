import { getIncompleteTodos } from "@/actions/fetch";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await getIncompleteTodos();
  return NextResponse.json(response, { status: 200 });
}
