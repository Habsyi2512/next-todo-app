import useReload from "@/hooks/todo/useReload";
import toast from "react-hot-toast";
import axios from "axios";

export default function useHandleCompleteTodo() {
  const { reloadIncompleteTodos, reloadCompletedTodos } = useReload();

  const handleCompleteTodo = async (id: number, setCompleted: boolean) => {
    const message = setCompleted
      ? "Task has been set to Completed."
      : "Task has been set to Incomplete.";

    try {
      const success = await axios.put(`/api/todo/${id}/completed`, {
        completed: setCompleted,
      });
      if (success.status === 200) {
        toast.success(message, {
          style: {
            backgroundColor: "#404040",
            color: "#d4d4d4",
          },
        });
        if (setCompleted) {
          await reloadIncompleteTodos(); // Reload todos yang belum selesai
        } else {
          await reloadCompletedTodos(); // Reload todos yang sudah selesai
        }
      }
    } catch (err) {
      console.error("Error marking todo as completed:", err);
    }
  };

  return { handleCompleteTodo }; // Mengembalikan fungsi yang bisa dipakai di komponen
}
