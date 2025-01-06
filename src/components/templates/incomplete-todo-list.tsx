"use client";
import React, { useContext, useEffect } from "react";
import Card from "@/components/Card";
import ContentDiv from "@/components/ContentDiv";
import { TodoContext } from "@/context/TodoContext";
import TodoAction from "./TodoAction";
import { LoadingContext } from "@/context/LoadingContext";
import { getAllIncompleteList } from "@/actions/fetch";

export default function IncompleteTodoList() {
  const { incompleteTodos, setIncompleteTodos } = useContext(TodoContext);
  const { loading, setLoading } = useContext(LoadingContext);

  async function fetchIncompleteTodo() {
    setLoading(true); // Set loading ke true sebelum fetch
    try {
      const todos = await getAllIncompleteList();
      setIncompleteTodos(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false); // Set loading ke false setelah selesai
    }
  }
  useEffect(() => {
    fetchIncompleteTodo();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : incompleteTodos.length > 0 ? (
    <div className="space-y-3">
      {incompleteTodos.map((todo) => {
        return (
          <Card key={todo.id} className="flex pl-2 items-center">
            <ContentDiv className="flex-1 bg-neutral-600 rounded-lg">
              {todo.title}
            </ContentDiv>
            <TodoAction id={todo.id} />
          </Card>
        );
      })}
    </div>
  ) : (
    <div>Add your first todo</div>
  );
}
