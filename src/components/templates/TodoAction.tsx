import React from "react";
import ContentDiv from "../ContentDiv";
import { CheckCircleIcon } from "../icons/CheckCircleIcon";
import { RemoveIcon } from "../icons/RemoveIcon";
import { PencilIcon } from "../icons/PencilIcon";
// import { handleCompletedTodo } from "@/actions/actions";
// import toast from "react-hot-toast";
import { TypeTodo } from "@/types/interface";
// import useReload from "@/hooks/useReload";
import Tooltip from "../Tooltip";
import { useHandleCompleteButton } from "@/hooks/useHandleCompleteButton";

interface ComponentProps {
  todo: TypeTodo;
}

export default function TodoAction({ todo }: ComponentProps) {
  // const { reloadIncompleteTodos, reloadCompletedTodos } = useReload();
  const handleButton = useHandleCompleteButton();

  // const handleCompleteButton = async (id: number, setCompleted: boolean) => {
  //   const message = setCompleted
  //     ? "Task has been set to Completed."
  //     : "Task has been set to Incomplete.";
  //   try {
  //     const success = await handleCompletedTodo(id, setCompleted);
  //     toast.success(message, {
  //       style: {
  //         backgroundColor: "#404040",
  //         color: "#d4d4d4",
  //       },
  //     });
  //     if (success) {
  //       if (setCompleted) {
  //         await reloadIncompleteTodos();
  //       } else {
  //         await reloadCompletedTodos();
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error marking todo as completed:", err);
  //   }
  // };

  const buttonClasses = (isCompleted: boolean, colorClass: string) =>
    `p-2 ${
      isCompleted
        ? colorClass
        : "bg-neutral-600 hover:bg-neutral-700 active:bg-neutral-600"
    } rounded-lg`;

  return (
    <ContentDiv className="flex space-x-2 items-center">
      <button
        onClick={() => handleButton(todo.id, !todo.completed)}
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

      <button className="p-2 bg-red-600 hover:bg-red-700 active:bg-red-600 rounded-lg">
        <RemoveIcon className="size-6" />
        <Tooltip text="Remove Task" />
      </button>

      {!todo.completed && (
        <button className="p-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-600 rounded-lg">
          <PencilIcon className="size-6" />
        </button>
      )}
    </ContentDiv>
  );
}
