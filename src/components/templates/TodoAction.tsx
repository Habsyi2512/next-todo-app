import React from "react";
import ContentDiv from "../ContentDiv";
import { CheckCircleIcon } from "../icons/CheckCircleIcon";
import { RemoveIcon } from "../icons/RemoveIcon";
import { PencilIcon } from "../icons/PencilIcon";

interface ComponentProps {
  id: number;
}

export default function TodoAction({ id }: ComponentProps) {
  return (
    <ContentDiv className="flex space-x-2 items-center">
      <button
        onClick={() => {
          console.log("id", id);
        }}
        className="p-2 bg-neutral-600 hover:bg-neutral-700 active:bg-neutral-600 rounded-lg"
      >
        <CheckCircleIcon className="size-6" />
      </button>
      <button className=" p-2 bg-red-600 hover:bg-red-700 active:bg-red-600 rounded-lg">
        <RemoveIcon className="size-6" />
      </button>
      <button className=" p-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-600 rounded-lg">
        <PencilIcon className="size-6" />
      </button>
    </ContentDiv>
  );
}
