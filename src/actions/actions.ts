"use server";

import { prisma } from "@/lib/prisma";
import { getTimezoneID } from "@/utils/dateUtils";
import { Prisma } from "@prisma/client";
import { TypeTodo } from "@/types/interface";

interface ApiResponse<T = unknown | null> {
  success: boolean;
  message: string;
  data: T | null;
}

export async function getTodoById(id: number): Promise<ApiResponse<TypeTodo>> {
  try {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      return { success: false, message: "Todo not found", data: null };
    }
    return { success: true, message: "Success", data: todo };
  } catch (error) {
    console.error("Error fetching todo:", error);
    return { success: false, message: "Internal server error", data: null };
  }
}
export async function createTodo(
  data: Prisma.TodoCreateInput
): Promise<ApiResponse<TypeTodo>> {
  try {
    const newTodo = await prisma.todo.create({ data });
    return {
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    };
  } catch (error) {
    console.error("Error creating todo:", error);
    return { success: false, message: "Internal server error", data: null };
  }
}

export async function handleCompletedTodo(
  args: Prisma.TodoUpdateArgs
): Promise<ApiResponse<TypeTodo>> {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: args.where.id },
      data: { completed: args.data.completed },
    });
    return {
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    };
  } catch (error) {
    console.error("Error updating todo:", error);
    return { success: false, message: "Internal server error", data: null };
  }
}

export async function removeTodoById(
  id: number
): Promise<ApiResponse<TypeTodo>> {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { deleted_at: getTimezoneID() },
    });
    return {
      success: true,
      message: "Todo removed successfully",
      data: updatedTodo,
    };
  } catch (error) {
    console.error("Error removing todo:", error);
    return { success: false, message: "Internal server error", data: null };
  }
}

export async function deleteTodoById(
  id: number
): Promise<ApiResponse<TypeTodo>> {
  try {
    const existingTodo = await getTodoById(id);
    if (!existingTodo) {
      return { success: false, message: "Todo not found", data: null };
    }
    const deletedTodo = await prisma.todo.delete({ where: { id: id } });
    return {
      success: true,
      message: "Todo deleted successfully",
      data: deletedTodo,
    };
  } catch (error) {
    console.error("Error deleting todo:", error);
    return { success: false, message: "Internal server error", data: null };
  }
}

export async function restoreTodoById(
  id: number
): Promise<ApiResponse<TypeTodo>> {
  try {
    const restoredTodo = await prisma.todo.update({
      where: { id },
      data: { deleted_at: null },
    });
    return {
      success: true,
      message: "Todo restored successfully",
      data: restoredTodo,
    };
  } catch (error) {
    console.error("Error restoring todo:", error);
    return { success: false, message: "Internal server error", data: null };
  }
}
