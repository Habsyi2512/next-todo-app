import { createTodo } from "@/actions/actions";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

// Skema validasi Yup
const createTodoSchema = yup
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validate = await createTodoSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const newData = await createTodo({ title: validate.title });
    revalidateTag("incomplete-todos");
    return NextResponse.json(
      {
        message: "Success menn",
        data: newData,
      },
      { status: 201 }
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
