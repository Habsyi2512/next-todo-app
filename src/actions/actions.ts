"use server";

import { prisma } from "@/lib/prisma";
import { getTimezoneID } from "@/utils/dateUtils";
import { Prisma } from "@prisma/client";

export async function createTodo(data: Prisma.TodoCreateInput) {
  const actions = await prisma.todo.create({ data: data });
  return actions;
}

export async function handleCompletedTodo(args: Prisma.TodoUpdateArgs) {
  const updateTodo = await prisma.todo.update({
    where: { id: args.where.id },
    data: { completed: args.data.completed },
  });
  return updateTodo;
}

export async function removeTodoById(id: number) {
  console.log("id", id);
  const updateTodo = await prisma.todo.update({
    where: { id: id },
    data: { deleted_at: getTimezoneID() },
  });

  return updateTodo;
}
