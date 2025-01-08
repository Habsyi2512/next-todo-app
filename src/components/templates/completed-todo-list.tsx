"use client";
import React, { useContext, useEffect } from "react";
import Card from "@/components/Card";
import ContentDiv from "@/components/ContentDiv";
import { TodoContext } from "@/context/TodoContext";
import TodoAction from "./TodoAction";
import { LoadingContext } from "@/context/LoadingContext";
import { getCompletedTodos } from "@/actions/fetch";
import { getFormattedDate } from "@/utils/dateUtils";

export default function CompletedTodoList() {
  const { completedTodos, setCompletedTodos } = useContext(TodoContext);
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchCompletedTodo = async () => {
      setLoading(true);
      try {
        const todos = await getCompletedTodos();
        setCompletedTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTodo();
  }, [setCompletedTodos, setLoading]); // Menambahkan dependensi yang tepat

  // Menggunakan pendekatan ternary untuk kondisi render
  if (loading) return <div>Loading...</div>;
  if (completedTodos.length === 0) return <div>No Completed Todos Here</div>;

  return (
    <div className="space-y-3">
      {completedTodos.map((todo) => (
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
