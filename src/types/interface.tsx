import { Prisma } from "@prisma/client";

export type TypeTodo = Prisma.TodoGetPayload<Prisma.TodoFindManyArgs>;
export type ResponseWrapper<T> = {
  message: string;
  data: T;
};
