import { getTodoList } from "@/actions/fetch";
import { useContext } from "react";
import { TodoContext } from "@/context/TodoContext";

export default function useReload() {
  const { setIncompleteTodos, setCompletedTodos, setRemovedTodos } =
    useContext(TodoContext);
  async function reloadIncompleteTodos() {
    const todos = await getTodoList({ completed: false });
    setIncompleteTodos(todos);
  }
  async function reloadCompletedTodos() {
    const todos = await getTodoList({ completed: true });
    setCompletedTodos(todos);
  }

  async function reloadRemovedTodos() {
    const todos = await getTodoList({ removed: true });
    setRemovedTodos(todos);
  }
  return { reloadIncompleteTodos, reloadCompletedTodos, reloadRemovedTodos };
}
