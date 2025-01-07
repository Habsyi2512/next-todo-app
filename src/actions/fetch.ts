"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getTodos(TodoWhereInput?: Prisma.TodoWhereInput) {
  const filter = TodoWhereInput ?? {};
  return await prisma.todo.findMany({ where: filter });
}
