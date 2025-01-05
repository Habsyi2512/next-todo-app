import React from "react";
import Card from "@/components/Card";
import ContentDiv from "@/components/ContentDiv";
import { prisma } from "@/lib/prisma";

export default async function TodoList() {
  const todos = await prisma.todi.findMany();
  console.log('data = ', todos)
  return todos.map((todo) => {
    return (
      <Card key={todo.id}>
        <ContentDiv>{todo.title}</ContentDiv>
      </Card>
    );
  });
}
