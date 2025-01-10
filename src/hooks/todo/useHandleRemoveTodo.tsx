import { API_ENDPOINTS } from "@/constants/api";
import { removeTodoById, revalidateTodos } from "@/services/api/todoServices";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Toast styling function for reuse
const toastStyles = {
  backgroundColor: "#404040",
  color: "#d4d4d4",
};

export default function useHandleRemoveTodo() {
  const router = useRouter();

  const handleRemoveTodo = async (id: number) => {
    try {
      const result = await removeTodoById(id.toString());

      if (result?.status === 200) {
        toast.success("Todo has been successfully removed", {
          style: toastStyles,
        });

        // Revalidate the todos
        await revalidateTodos([
          API_ENDPOINTS.REVALIDATE.TODO.INCOMPLETE_TODOS,
          API_ENDPOINTS.REVALIDATE.TODO.COMPLETED_TODOS,
          API_ENDPOINTS.REVALIDATE.TODO.REMOVED_TODOS,
        ]);

        // Refresh the page
        router.refresh();
      }

      return true;
    } catch (error) {
      console.error("Error removing todo:", error);
      toast.error("Something went wrong while removing the todo.", {
        style: toastStyles,
      });
      return false;
    }
  };

  return { handleRemoveTodo };
}
