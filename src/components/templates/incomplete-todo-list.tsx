"use client";

import Card from "@/components/Card";
import ContentDiv from "@/components/ContentDiv";
import TodoAction from "./TodoAction";
import { getFormattedDate } from "@/utils/dateUtils";
import { ResponseWrapper, TypeTodo } from "@/types/interface";
// import { API_ENDPOINTS } from "@/constants/api";
import { Suspense } from "react";
import { use } from "react";

export default function IncompleteTodoList({
  todos,
}: {
  todos: Promise<ResponseWrapper<TypeTodo[]>>;
}) {
  const data = use(todos);

  if (data.data.length === 0) return <p>No Data...</p>;

  return (
    <div className="space-y-3">
      <Suspense fallback={<div>Loading...</div>}>
        {data.data.map((todo: TypeTodo) => (
          <Card key={todo.id} className="flex items-center">
            <ContentDiv className="flex-1 rounded-lg">
              <p className="mb-1">{todo.title}</p>
              <p className="text-xs">
                <span>
                  Created At: {getFormattedDate(String(todo.created_at))}
                </span>{" "}
                |{" "}
                <span>
                  Last Update: {getFormattedDate(String(todo.updated_at))}
                </span>
              </p>
            </ContentDiv>
            <TodoAction todo={todo} />
          </Card>
        ))}
      </Suspense>
    </div>
  );
}
