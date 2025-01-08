import { restoreTodoById } from "@/actions/actions";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const result = await restoreTodoById(Number(id));
  return NextResponse.json(
    { message: "success restore todo", result },
    { status: 200 }
  );
}
