import { deleteTodoById } from "@/actions/actions";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const result = await deleteTodoById(Number(id));

  return NextResponse.json(
    { message: "success", data: result },
    { status: 200 }
  );
}
