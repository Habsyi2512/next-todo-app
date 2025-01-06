"use client";

import { getAllTodoList } from "@/actions/fetch";
import { TypeTodo } from "@/types/interface";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { LoadingContext } from "./LoadingContext";

export type TypeTodoContext = {
  todos: TypeTodo[];
  setTodos: Dispatch<SetStateAction<TypeTodo[]>>;
};

export const TodoContext = createContext<TypeTodoContext>({
  todos: [],
  setTodos: () => {},
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TypeTodo[]>([]);
  const { setLoading } = useContext(LoadingContext);

  async function fetchTodo() {
      setLoading(true); // Set loading ke true sebelum fetch
      try {
        const todos = await getAllTodoList();
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false); // Set loading ke false setelah selesai
      }
    }
    useEffect(() => {
      fetchTodo();
    }, []);
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
