import HeaderTodoSection from "@/components/templates/HeaderTodoSection";
import IncompleteTodoList from "@/components/templates/incomplete-todo-list";
import { API_ENDPOINTS } from "@/constants/api";
import { ResponseWrapper, TypeTodo } from "@/types/interface";
import { Suspense } from "react";
import { getDataTodos } from "../services/api";
import LoadTodoTemplate from "@/components/templates/load-todo-template";

export default async function Home() {
  const todos = getDataTodos<ResponseWrapper<TypeTodo[]>>(
    API_ENDPOINTS.TODO.GET_INCLOMPLETE_TODOS,
    { cache: "force-cache", next: { tags: ["incomplete-todos"] } }
  );
  return (
    <>
      <HeaderTodoSection />
      <Suspense fallback={<LoadTodoTemplate />}>
        <IncompleteTodoList todos={todos} />
      </Suspense>
    </>
  );
}
