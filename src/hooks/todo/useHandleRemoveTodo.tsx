import { API_ENDPOINTS } from "@/constants/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Toast styling function for reuse
const toastStyles = {
  backgroundColor: "#404040",
  color: "#d4d4d4",
};

async function removeTodoById(id: string) {
  try {
    const response = await axios.put(API_ENDPOINTS.TODO.REMOVE_BY_ID(id));
    return response;
  } catch (error) {
    console.error("Error removing todo:", error);
  }
}

async function revalidateTodos() {
  try {
    await axios.post(API_ENDPOINTS.REVALIDATE.TODO.INCOMPLETE_TODOS);
    await axios.post(API_ENDPOINTS.REVALIDATE.TODO.REMOVED_TODOS);
  } catch (error) {
    console.error("Error revalidating todo:", error);
  }
}

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
        await revalidateTodos();

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
