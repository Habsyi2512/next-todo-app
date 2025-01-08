import { getIncompleteTodos } from "@/actions/fetch";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await getIncompleteTodos();
  return NextResponse.json(
    { message: "success", data: response },
    { status: 200 }
  );
}
