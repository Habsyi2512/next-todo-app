import { createTodo } from "@/actions/actions";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();
    const newData = await createTodo({ title: title });
    revalidateTag("incomplete-todos");
    return NextResponse.json(
      { message: "Success", data: newData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json({ message: "Invalid JSON" }, { status: 500 });
  }
}
