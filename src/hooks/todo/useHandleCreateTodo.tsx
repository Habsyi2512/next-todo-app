import { API_ENDPOINTS } from "@/constants/api";
import { createTodo, revalidateTodos } from "@/services/api/todoServices";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useHandleCreateTodo() {
  const router = useRouter();
  async function handleCreateTodo(values: { title: string }) {
    try {
      const newTodo = await createTodo({ title: values.title });
      if (newTodo?.status === 201) {
        await revalidateTodos([API_ENDPOINTS.REVALIDATE.TODO.INCOMPLETE_TODOS]);
        toast.success("Todo has been created successfully", {
          style: {
            backgroundColor: "#404040",
            color: "#d4d4d4",
          },
        });
      }
      router.refresh();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  return { handleCreateTodo };
}
