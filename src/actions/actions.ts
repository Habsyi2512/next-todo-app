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

export async function handleCompletedTodo(id: number, setCompleted: boolean) {
  const updateTodo = await prisma.todo.update({
    where: { id: id },
    data: { completed: setCompleted },
  });
  return updateTodo;
}

export async function removeTodoById(id: number) {
  console.log("id", id);
  const updateTodo = await prisma.todo.update({
    where: { id: id },
    data: { deleted_at: new Date().toISOString() },
  });

  return updateTodo;
}
