import { Prisma } from "@prisma/client";

export type TypeTodo = Prisma.TodoGetPayload<Prisma.TodoFindManyArgs>;
