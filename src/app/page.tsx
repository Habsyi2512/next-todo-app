import HeaderTodoSection from "@/components/templates/HeaderTodoSection";
import IncompleteTodoList from "@/components/templates/IncompleteTodoList";
import { API_ENDPOINTS } from "@/constants/api";
import { ResponseWrapper, TypeTodo } from "@/types/interface";
import { Suspense } from "react";
import { getDataTodos } from "../services/api";
import LoadTodoTemplate from "@/components/templates/LoadTodoTemplate";

export default async function Home() {
  const todos = getDataTodos<ResponseWrapper<TypeTodo[]>>(
    API_ENDPOINTS.TODO.GET_INCLOMPLETE_TODOS,
    { cache: "force-cache", next: { tags: ["incomplete-todos"] } }
  );

  const angka = (nme: string) => {
    return nme;
  };
  console.trace(angka("ke"));

  return (
    <>
      <HeaderTodoSection />
      <Suspense fallback={<LoadTodoTemplate />}>
        <IncompleteTodoList todos={todos} />
      </Suspense>
    </>
  );
}
