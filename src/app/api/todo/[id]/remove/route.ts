import { removeTodoById } from "@/actions/actions";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const result = await removeTodoById(Number(id));
  return NextResponse.json(
    { message: "Deleted", data: result },
    { status: 200 }
  );
}
