import React from "react";
import Card from "./Card";
import ContentDiv from "./ContentDiv";

export default function LoadTodo() {
  return (
    <Card className="flex animate-pulse items-center">
      <ContentDiv className="flex-1 rounded-lg">
        <p className="mb-1 p-3 rounded w-full bg-neutral-600"></p>
        <p className="text-xs p-2 w-[188px] bg-neutral-600 rounded"></p>
      </ContentDiv>
    </Card>
  );
}
