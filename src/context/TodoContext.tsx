"use client";

import { TypeTodo } from "@/types/interface";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export type TypeTodoContext = {
  incompleteTodos: TypeTodo[];
  completedTodos: TypeTodo[];
  removedTodos: TypeTodo[];
  setRemovedTodos: Dispatch<SetStateAction<TypeTodo[]>>;
  setIncompleteTodos: Dispatch<SetStateAction<TypeTodo[]>>;
  setCompletedTodos: Dispatch<SetStateAction<TypeTodo[]>>;
};

export const TodoContext = createContext<TypeTodoContext>({
  incompleteTodos: [],
  completedTodos: [],
  removedTodos: [],
  setRemovedTodos: () => {},
  setCompletedTodos: () => {},
  setIncompleteTodos: () => {},
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [incompleteTodos, setIncompleteTodos] = useState<TypeTodo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TypeTodo[]>([]);
  const [removedTodos, setRemovedTodos] = useState<TypeTodo[]>([]);

  return (
    <TodoContext.Provider
      value={{
        incompleteTodos,
        completedTodos,
        removedTodos,
        setCompletedTodos,
        setIncompleteTodos,
        setRemovedTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
