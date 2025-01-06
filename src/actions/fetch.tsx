"use server";

import { prisma } from "@/lib/prisma";

export async function getAllTodoList() {
  const todos = await prisma.todo.findMany({ where: { completed: false } });
  return todos;
}
