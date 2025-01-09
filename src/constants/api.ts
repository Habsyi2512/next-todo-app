export const createApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const API_ENDPOINTS = {
  TODO: {
    CREATE: createApiUrl("/api/todo/create-todo"),
    REMOVE: "/api/todo/delete-todo",
    GET_ALL: "/api/todo/get-todos",
  },
  REVALIDATE: {
    TODO: "/api/revalidate?tag=incomplete-todos&secret=12345",
  },
} as const;

// Bisa juga menambahkan base URL jika ada
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Helper function untuk membuat full URL
