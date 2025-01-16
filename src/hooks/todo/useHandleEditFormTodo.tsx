import { API_ENDPOINTS } from "@/constants/api";
import { editTodo, revalidateTodos } from "@/services/api/todoServices";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useHandleEditFormTodo() {
  const router = useRouter();
  async function handleEditTodo(values: { id: string; title: string }) {
    const { id, title } = values;
    try {
      const updateTodo = await editTodo({ id, title });
      if (updateTodo?.status == 200) {
        await revalidateTodos([API_ENDPOINTS.REVALIDATE.TODO.INCOMPLETE_TODOS]);
        toast.success("Todo has been Edited Successfully", {
          style: {
            backgroundColor: "#404040",
            color: "#d4d4d4",
          },
        });
      }
      router.refresh();
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }
  return { handleEditTodo };
}
