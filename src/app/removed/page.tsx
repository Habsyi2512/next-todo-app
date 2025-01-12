import React from "react";
import RemovedTodoList from "@/components/templates/removed-todo-list";
import { getDataTodos } from "../../services/api";
import { API_ENDPOINTS } from "@/constants/api";
import { ResponseWrapper, TypeTodo } from "@/types/interface";




export default async function page() {
  const todos = getDataTodos<ResponseWrapper<TypeTodo[]>>(
    API_ENDPOINTS.TODO.GET_REMOVED_TODOS,
    {
      cache: "force-cache",
      next: { tags: ["removed-todos"] },
    }
  );

  return (
    <>
      <RemovedTodoList todos={todos} />
    </>
  );
}
