"use client";
import React, { useContext } from "react";
import Card from "@/components/Card";
import ContentDiv from "@/components/ContentDiv";
// import { getAllTodo } from "@/actions/fetch";
import { TodoContext } from "@/context/TodoContext";
import TodoAction from "./TodoAction";
import { LoadingContext } from "@/context/LoadingContext";

export default function TodoList() {
  const { todos } = useContext(TodoContext);
  const { loading } = useContext(LoadingContext);

  return loading ? (
    <div>Loading...</div>
  ) : todos.length > 0 ? (
    <div className="space-y-3">
      {todos.map((todo) => {
        return (
          <Card key={todo.id} className="flex pl-2 items-center">
            <ContentDiv className="flex-1 bg-neutral-600 rounded-lg">{todo.title}</ContentDiv>
            <TodoAction id={todo.id} />
          </Card>
        );
      })}
    </div>
  ) : (
    <div>Add your first todo</div>
  );
}
