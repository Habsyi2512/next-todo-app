export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const createApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const API_ENDPOINTS = {
  TODO: {
    CREATE_TODO: createApiUrl("/api/todo/create-todo"),
    GET_INCLOMPLETE_TODOS: createApiUrl("/api/todo/get-incomplete-todos"),
    GET_COMPLETED_TODOS: createApiUrl("/api/todo/get-completed-todos"),
    GET_REMOVED_TODOS: createApiUrl("/api/todo/get-removed-todos"),
    REMOVE_BY_ID: (id: string): string =>
      createApiUrl(`/api/todo/${id}/remove`),
    COMPLETED_BY_ID: (id: string): string =>
      createApiUrl(`/api/todo/${id}/completed`),
    RESTORE_BY_ID: (id: string): string =>
      createApiUrl(`/api/todo/${id}/restore`),
  },
  REVALIDATE: {
    TODO: {
      INCOMPLETE_TODOS: createApiUrl(
        "/api/revalidate?tag=incomplete-todos&secret=12345"
      ),
      COMPLETED_TODOS: createApiUrl(
        "/api/revalidate?tag=completed-todos&secret=12345"
      ),
      REMOVED_TODOS: createApiUrl(
        "/api/revalidate?tag=removed-todos&secret=12345"
      ),
    },
  },
} as const;
