"use client";
import React, { useContext, useEffect } from "react";
import Card from "@/components/Card";
import ContentDiv from "@/components/ContentDiv";
import { TodoContext } from "@/context/TodoContext";
import TodoAction from "./TodoAction";
import { LoadingContext } from "@/context/LoadingContext";
import { getRemovedTodos } from "@/actions/fetch";
import { getFormattedDate } from "@/utils/dateUtils";

export default function RemovedTodoList() {
  const { removedTodos, setRemovedTodos } = useContext(TodoContext);
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchRemovedTodo = async () => {
      setLoading(true);
      try {
        const todos = await getRemovedTodos();
        setRemovedTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRemovedTodo();
  }, [setRemovedTodos, setLoading]); // Menambahkan dependensi yang tepat

  if (loading) return <div>Loading...</div>;
  if (removedTodos.length === 0) return <div>No Removed Todos Here</div>;

  return (
    <div className="space-y-3">
      {removedTodos.map((todo) => (
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
