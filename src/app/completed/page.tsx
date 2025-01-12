import React from "react";
import CompletedTodoList from "@/components/templates/completed-todo-list";
import { getDataTodos } from "../../services/api";
import { API_ENDPOINTS } from "@/constants/api";
import { ResponseWrapper, TypeTodo } from "@/types/interface";

export default async function page() {
  const todos = getDataTodos<ResponseWrapper<TypeTodo[]>>(
    API_ENDPOINTS.TODO.GET_COMPLETED_TODOS,
    {
      cache: "force-cache",
      next: { tags: ["completed-todos"] },
    }
  );
  return (
    <>
      <CompletedTodoList todos={todos} />
    </>
  );
}
