"use server";

import { prisma } from "@/lib/prisma";

export async function createTodo(form: FormData) {
  const actions = await prisma.todo.create({
    data: {
      title: form.get("title") as string,
    },
  });
  return actions;
}
