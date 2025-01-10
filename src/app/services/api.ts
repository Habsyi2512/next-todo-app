import { ResponseWrapper, TypeTodo } from "@/types/interface";

export async function getDataTodos<T = ResponseWrapper<TypeTodo[]>>(
  url: string,
  init: RequestInit
) {
  return (await fetch(url, init).then((res) => res.json())) as T;
}
