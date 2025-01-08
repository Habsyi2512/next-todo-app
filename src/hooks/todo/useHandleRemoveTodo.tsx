import axios from "axios";
import toast from "react-hot-toast";
import useReload from "./useReload";

export default function useHandleRemoveTodo() {
  const { reloadIncompleteTodos, reloadCompletedTodos } = useReload();

  const handleRemoveButton = async (id: number) => {
    try {
      const result = await axios.put(`/api/todo/${id}/remove`);
      if (result.status === 200) {
        toast.success("Todo has been successfully Removed", {
          style: {
            backgroundColor: "#404040",
            color: "#d4d4d4",
          },
        });
        await reloadIncompleteTodos();
        await reloadCompletedTodos();
      }
      return true;
    } catch (err) {
      console.error("Error marking todo as completed:", err);
      return false;
    }
  };

  return { handleRemoveButton };
}
