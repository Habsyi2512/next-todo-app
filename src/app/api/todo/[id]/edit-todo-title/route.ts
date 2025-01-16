import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const editTodoSchema = yup
  .object({
    title: yup
      .string()
      .required("Title is required")
      .typeError("Title must be a string")
      .min(3, "Too short!")
      .max(250, "Title must be at most 250 characters long"),
  })
  .strict(true)
  .noUnknown("Unknown fields are not allowed");

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validate = await editTodoSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const updateData = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        title: validate.title,
      },
    });
    return NextResponse.json(
      { message: "sukses", data: updateData },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ message: error.errors }, { status: 400 });
    }

    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
