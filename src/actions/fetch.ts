"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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

export async function getRemovedTodoList() {
  const todos = await prisma.todo.findMany({
    where: {
      deleted_at: {
        not: null,
      },
    },
  });
  return todos;
}

export async function getTodosList(TodoWhereInput: Prisma.TodoWhereInput) {
  return await prisma.todo.findMany({ ...TodoWhereInput });
}

export async function getTodoList({
  completed,
  removed,
}: {
  completed?: boolean;
  removed?: boolean;
}) {
  const where: Prisma.TodoWhereInput = {};

  if (completed !== undefined) {
    where.completed = completed;
  }

  if (removed) {
    where.deleted_at = {
      not: null,
    };
  } else if (removed === false) {
    where.deleted_at = null;
  }

  const todos = await prisma.todo.findMany({ where });
  return todos;
}
