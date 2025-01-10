import { deleteTodoById } from "@/actions/actions";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const result = await deleteTodoById(parseInt(id, 10));

    return NextResponse.json(
      { message: "success", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting todo:", error);
    return NextResponse.json(
      { message: "Error deleting todo", error },
      { status: 404 }
    );
  }
}
