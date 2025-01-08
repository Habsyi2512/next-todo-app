import { handleCompletedTodo } from "@/actions/actions";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const { completed } = await request.json();
  const updatedData = await handleCompletedTodo({
    where: { id: Number(id) },
    data: { completed: completed },
  });
  return NextResponse.json(
    { message: "Completed", data: updatedData },
    { status: 200 }
  );
}
