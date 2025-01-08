"use server";

import { prisma } from "@/lib/prisma";

export async function getIncompleteTodos() {
  return await prisma.todo.findMany({
    where: { completed: false, deleted_at: null },
  });
}

export async function getCompletedTodos() {
  return await prisma.todo.findMany({
    where: { completed: true, deleted_at: null },
  });
}

export async function getRemovedTodos() {
  return await prisma.todo.findMany({ where: { deleted_at: { not: null } } });
}
