import {
  getCompletedTodos,
  getIncompleteTodos,
  getRemovedTodos,
} from "@/actions/fetch";
import { useContext } from "react";
import { TodoContext } from "@/context/TodoContext";

export default function useReload() {
  const { setIncompleteTodos, setCompletedTodos, setRemovedTodos } =
    useContext(TodoContext);
  async function reloadIncompleteTodos() {
    const todos = await getIncompleteTodos();
    setIncompleteTodos(todos);
  }
  async function reloadCompletedTodos() {
    const todos = await getCompletedTodos();
    setCompletedTodos(todos);
  }

  async function reloadRemovedTodos() {
    const todos = await getRemovedTodos();
    setRemovedTodos(todos);
  }
  return { reloadIncompleteTodos, reloadCompletedTodos, reloadRemovedTodos };
}
