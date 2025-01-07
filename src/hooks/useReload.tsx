import { getTodos } from "@/actions/fetch";
import { useContext } from "react";
import { TodoContext } from "@/context/TodoContext";

export default function useReload() {
  const { setIncompleteTodos, setCompletedTodos, setRemovedTodos } =
    useContext(TodoContext);
  async function reloadIncompleteTodos() {
    const todos = await getTodos({ completed: false });
    setIncompleteTodos(todos);
  }
  async function reloadCompletedTodos() {
    const todos = await getTodos({ completed: true });
    setCompletedTodos(todos);
  }

  async function reloadRemovedTodos() {
    const todos = await getTodos({ deleted_at: { not: null } });
    setRemovedTodos(todos);
  }
  return { reloadIncompleteTodos, reloadCompletedTodos, reloadRemovedTodos };
}
