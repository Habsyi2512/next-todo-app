import { API_ENDPOINTS } from "@/constants/api";
import { restoreTodoById, revalidateTodos } from "@/services/api/todoServices";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useHandleRestoreTodo() {
  const router = useRouter();
  async function handleRestoreTodo(id: number) {
    try {
      const result = await restoreTodoById(id.toString());
      if (result?.status === 200) {
        toast.success("Todo has been successfully restored", {
          style: {
            backgroundColor: "#404040",
            color: "#d4d4d4",
          },
        });
        await revalidateTodos([
          API_ENDPOINTS.REVALIDATE.TODO.REMOVED_TODOS,
          API_ENDPOINTS.REVALIDATE.TODO.INCOMPLETE_TODOS,
          API_ENDPOINTS.REVALIDATE.TODO.COMPLETED_TODOS,
        ]);
      }
      router.refresh();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  return { handleRestoreTodo };
}
