import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/constants/api";
import { deleteTodoById, revalidateTodos } from "@/services/api/todoServices";

export default function useHandleDeleteTodo() {
  const router = useRouter();

  const handleDeleteTodo = async (id: number) => {
    try {
      const success = await deleteTodoById(id.toString());
      if (success?.status === 200) {
        await revalidateTodos([API_ENDPOINTS.REVALIDATE.TODO.REMOVED_TODOS]);
        toast.success("Todo has been successfully deleted", {
          style: {
            backgroundColor: "#404040",
            color: "#d4d4d4",
          },
        });
        router.refresh();
        return true;
      }
    } catch (err) {
      console.error("Error deleting todo:", err);
      return false;
    }
  };

  return { handleDeleteTodo }; // Mengembalikan fungsi yang bisa dipakai di komponen
}
