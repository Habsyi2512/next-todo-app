"use client";

import Card from "@/components/Card";
import ContentDiv from "@/components/ContentDiv";
import TodoAction from "./TodoAction";
import { use } from "react";
import { getFormattedDate } from "@/utils/dateUtils";
import { ResponseWrapper, TypeTodo } from "@/types/interface";

export default function RemovedTodoList({
  todos,
}: {
  todos: Promise<ResponseWrapper<TypeTodo[]>>;
}) {
  const data = use(todos);
  if (data.data.length === 0) return <div>No Removed Todos Here</div>;

  return (
    <div className="space-y-3">
      {data.data.map((todo) => (
        <Card key={todo.id} className="flex items-center">
          <ContentDiv className="flex-1 rounded-lg">
            <p className="mb-1">{todo.title}</p>
            <p className="text-xs">
              <span>
                Deleted At: {getFormattedDate(String(todo.created_at))}
              </span>
            </p>
          </ContentDiv>
          <TodoAction todo={todo} />
        </Card>
      ))}
    </div>
  );
}
