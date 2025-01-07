import useReload from "@/hooks/useReload";
import { handleCompletedTodo } from "@/actions/actions";
import toast from "react-hot-toast";

export default function useHandleCompleteTodo() {
  const { reloadIncompleteTodos, reloadCompletedTodos } = useReload();

  const handleCompleteButton = async (id: number, setCompleted: boolean) => {
    const message = setCompleted
      ? "Task has been set to Completed."
      : "Task has been set to Incomplete.";

    try {
      const success = await handleCompletedTodo(id, setCompleted); // Fungsi untuk menyelesaikan todo
      toast.success(message, {
        style: {
          backgroundColor: "#404040",
          color: "#d4d4d4",
        },
      });

      if (success) {
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

  return {handleCompleteButton}; // Mengembalikan fungsi yang bisa dipakai di komponen
}
