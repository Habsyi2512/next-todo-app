"use client";

import Card from "@/components/Card";
import ContentDiv from "@/components/ContentDiv";
import TodoAction from "./TodoAction";
import { getFormattedDate } from "@/utils/dateUtils";
import { use } from "react";
import { ResponseWrapper, TypeTodo } from "@/types/interface";

export default function CompletedTodoList({
  todos,
}: {
  todos: Promise<ResponseWrapper<TypeTodo[]>>;
}) {
  const data = use(todos);
  console.log("data kuy", data);
  if (data.data.length === 0) return <div>No Completed Todos Here</div>;

  return (
    <div className="space-y-3">
      {data.data.map((todo) => (
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
    </div>
  );
}
