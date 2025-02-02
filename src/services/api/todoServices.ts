import { API_ENDPOINTS } from "@/constants/api";
import axios from "axios";

export async function revalidateTodos(endpoints: string[]) {
  try {
    await Promise.all(endpoints.map((endpoint) => axios.post(endpoint)));
  } catch (error) {
    console.error("Error revalidating todo:", error);
  }
}

export async function createTodo(values: { title: string }) {
  try {
    const response = await axios.post(API_ENDPOINTS.TODO.CREATE_TODO, {
      title: values.title,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function editTodo(values: { id: string; title: string }) {
  const { id, title } = values;
  try {
    const response = await axios.patch(API_ENDPOINTS.TODO.EDIT_TODO(id), {
      title: title,
    });
    return response;
  } catch (error) {
    console.error(error);
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
