import React from "react";
import ContentDiv from "../ContentDiv";
import { CheckCircleIcon } from "../icons/CheckCircleIcon";
import { RemoveIcon } from "../icons/RemoveIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { TypeTodo } from "@/types/interface";
import Tooltip from "../Tooltip";
import { TrashIcon } from "../icons/TrashIcon";
import useHandleCompleteTodo from "@/hooks/useHandleCompleteTodo";
import useHandleRemoveTodo from "@/hooks/useHandleRemoveTodo";
import { RecoverIcon } from "../icons/RecoverIcon";

interface ComponentProps {
  todo: TypeTodo;
}

export default function TodoAction({ todo }: ComponentProps) {
  const { handleCompleteButton } = useHandleCompleteTodo();
  const { handleRemoveButton } = useHandleRemoveTodo();
  console.log("todo =", todo);
  const buttonClasses = (isCompleted: boolean, colorClass: string) =>
    `p-2 h-[60px] flex items-center justify-center aspect-square ${
      isCompleted
        ? colorClass
        : "bg-neutral-600 hover:bg-neutral-700 active:bg-neutral-600"
    } rounded-lg`;

  return (
    <ContentDiv className="flex space-x-2 items-center">
      <>
        <button
          onClick={() => handleCompleteButton(todo.id, !todo.completed)}
          className={buttonClasses(
            todo.completed,
            "bg-green-600 hover:bg-green-700 active:bg-green-600"
          )}
        >
          <CheckCircleIcon className="size-6" />
          <Tooltip
            text={
              todo.completed
                ? "Click to mark as incomplete"
                : "Click to mark as completed"
            }
          />
        </button>
        <button
          onClick={() => {
            handleRemoveButton(todo.id);
          }}
          className="p-2 h-[60px] flex items-center justify-center aspect-square bg-red-600 hover:bg-red-700 active:bg-red-600 rounded-lg"
        >
          <RemoveIcon className="size-6" />
          <Tooltip text="Remove Task" />
        </button>
        <button className="p-2 h-[60px] flex items-center justify-center aspect-square bg-blue-600 hover:bg-blue-700 active:bg-blue-600 rounded-lg">
          <PencilIcon className="size-6" />
          <Tooltip text="Edit Task" />
        </button>
      </>

      {todo.deleted_at === null && (
        <>
          <button className="p-2 bg-blue-600 h-[60px] flex items-center justify-center aspect-square hover:bg-blue-700 active:bg-blue-600 rounded-lg">
            <RecoverIcon className="size-6" />
            <Tooltip text="Delete Task" />
          </button>

          <button className="p-2 h-[60px] flex items-center justify-center aspect-square bg-red-600 hover:bg-red-700 active:bg-red-600 rounded-lg">
            <TrashIcon className="size-6" />
            <Tooltip text="Delete Task" />
          </button>
        </>
      )}
    </ContentDiv>
  );
}
