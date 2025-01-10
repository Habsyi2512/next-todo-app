import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/constants/api";
import { revalidateTodos } from "@/services/api/todoServices";

export default function useHandleCompleteTodo() {
  const router = useRouter();

  const handleCompleteTodo = async (id: number, setCompleted: boolean) => {
    const message = setCompleted
      ? "Task has been set to Completed."
      : "Task has been set to Incomplete.";
    try {
      const success = await axios.put(
        API_ENDPOINTS.TODO.COMPLETED_BY_ID(id.toString()),
        {
          completed: setCompleted,
        }
      );
      if (success.status === 200) {
        await revalidateTodos([
          API_ENDPOINTS.REVALIDATE.TODO.COMPLETED_TODOS,
          API_ENDPOINTS.REVALIDATE.TODO.INCOMPLETE_TODOS,
        ]);
        toast.success(message, {
          style: {
            backgroundColor: "#404040",
            color: "#d4d4d4",
          },
        });
        router.refresh();
        return true;
      }
    } catch (err) {
      console.error("Error marking todo as completed:", err);
      return false;
    }
  };

  return { handleCompleteTodo }; // Mengembalikan fungsi yang bisa dipakai di komponen
}
