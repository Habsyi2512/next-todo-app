"use server";

import { prisma } from "@/lib/prisma";

export async function getAllIncompleteList() {
  const todos = await prisma.todo.findMany({
    where: { completed: false },
  });
  return todos;
}
export async function getCompletedTodoList() {
  const todos = await prisma.todo.findMany({
    where: { completed: true },
  });
  return todos;
}
