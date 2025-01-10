import axios from "axios";
import toast from "react-hot-toast";
import useReload from "./useReload";

export default function useHandleRestoreTodo() {
  const { reloadRemovedTodos } = useReload();
  async function handleRestoreTodo(id: number) {
    try {
      const result = await axios.put(`/api/todo/${id}/restore`);
      if (result.status === 200) {
        toast.success("Todo has been successfully restored", {
          style: {
            backgroundColor: "#404040",
            color: "#d4d4d4",
          },
        });
        await reloadRemovedTodos();
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  return { handleRestoreTodo };
}
