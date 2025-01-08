"use client";
import React, { useContext, useEffect } from "react";
import Card from "@/components/Card";
import ContentDiv from "@/components/ContentDiv";
import { TodoContext } from "@/context/TodoContext";
import TodoAction from "./TodoAction";
import { LoadingContext } from "@/context/LoadingContext";
import { getIncompleteTodos } from "@/actions/fetch";
import { getFormattedDate } from "@/utils/dateUtils";

export default function IncompleteTodoList() {
  const { incompleteTodos, setIncompleteTodos } = useContext(TodoContext);
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchIncompleteTodo = async () => {
      setLoading(true);
      try {
        const todos = await getIncompleteTodos();
        setIncompleteTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncompleteTodo();
  }, [setIncompleteTodos, setLoading]); // Menambahkan dependensi yang tepat

  // Render berdasarkan kondisi loading dan data todos
  if (loading) return <div>Loading...</div>;
  if (incompleteTodos.length === 0) return <div>Add your first todo</div>;

  return (
    <div className="space-y-3">
      {incompleteTodos.map((todo) => (
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
