"use client";
import React, { useContext, useEffect } from "react";
import Card from "@/components/Card";
import ContentDiv from "@/components/ContentDiv";
import { TodoContext } from "@/context/TodoContext";
import TodoAction from "./TodoAction";
import { LoadingContext } from "@/context/LoadingContext";
import { getTodos } from "@/actions/fetch";

export default function CompletedTodoList() {
  const { completedTodos, setCompletedTodos } = useContext(TodoContext);
  const { loading, setLoading } = useContext(LoadingContext);

  async function fetchCompletedTodo() {
    setLoading(true);
    try {
      const todos = await getTodos({ completed: true });
      setCompletedTodos(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCompletedTodo();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : completedTodos.length > 0 ? (
    <div className="space-y-3">
      {completedTodos.map((todo) => {
        return (
          <Card key={todo.id} className="flex pl-2 items-center">
            <ContentDiv className="flex-1 bg-neutral-600 rounded-lg">
              {todo.title}
            </ContentDiv>
            <TodoAction todo={todo} />
          </Card>
        );
      })}
    </div>
  ) : (
    <div>No Completed Todos Here</div>
  );
}
