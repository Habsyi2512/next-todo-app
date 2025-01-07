import useReload from "./useReload";
import { removeTodoById } from "@/actions/actions";
import toast from "react-hot-toast";

export default function useHandleRemoveTodo() {
  const { reloadIncompleteTodos, reloadCompletedTodos } = useReload();

  const handleRemoveButton = async (id: number) => {
    try {
      await removeTodoById(id); // Fungsi untuk menyelesaikan todo
      toast.success("Todo has been successfully Removed", {
        style: {
          backgroundColor: "#404040",
          color: "#d4d4d4",
        },
      });
      await reloadIncompleteTodos();
      await reloadCompletedTodos();
    } catch (err) {
      console.error("Error marking todo as completed:", err);
    }
  };

  return { handleRemoveButton };
}
