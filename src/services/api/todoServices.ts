import { API_ENDPOINTS } from "@/constants/api";
import axios from "axios";

export async function revalidateTodos(endpoints: string[]) {
  try {
    await Promise.all(endpoints.map((endpoint) => axios.post(endpoint)));
  } catch (error) {
    console.error("Error revalidating todo:", error);
  }
}

export async function removeTodoById(id: string) {
  try {
    const response = await axios.put(API_ENDPOINTS.TODO.REMOVE_BY_ID(id));
    return response;
  } catch (error) {
    console.error("Error removing todo:", error);
  }
}

export async function deleteTodoById(id: string) {
  try {
    const response = await axios.delete(API_ENDPOINTS.TODO.DELETE_BY_ID(id));
    return response;
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

export async function restoreTodoById(id: string) {
  try {
    const response = await axios.put(API_ENDPOINTS.TODO.RESTORE_BY_ID(id));
    return response;
  } catch (error) {
    console.error("Error updating todo", error);
  }
}
