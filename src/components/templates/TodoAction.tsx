import React from "react";
import ContentDiv from "../ContentDiv";
import { CheckCircleIcon } from "../icons/CheckCircleIcon";
import { RemoveIcon } from "../icons/RemoveIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { handleCompletedTodo } from "@/actions/actions";
import toast from "react-hot-toast";
import { TypeTodo } from "@/types/interface";
import useReload from "@/hooks/useReload";

interface ComponentProps {
  todo: TypeTodo;
}

export default function TodoAction({ todo }: ComponentProps) {
  const { reloadIncompleteTodos, reloadCompletedTodos } = useReload();
  async function handleCompleteButton(id: number, setCompleted: boolean) {
    try {
      const oke = await handleCompletedTodo(id, setCompleted);
      toast.success("Task Completed", {
        style: {
          backgroundColor: "#404040",
          color: "#d4d4d4",
        },
      });
      if (oke && !setCompleted) {
        console.log("oke woi");
        await reloadCompletedTodos();
      } else {
        await reloadIncompleteTodos();
      }
    } catch (err) {
      console.error("Error marking todo as completed:", err);
      return; // Error handling
    }
  }

  return (
    <ContentDiv className="flex space-x-2 items-center">
      <button
        onClick={() => {
          handleCompleteButton(todo.id, !todo.completed);
        }}
        className={`p-2 ${
          todo.completed
            ? "bg-green-600 hover:bg-green-700 active:bg-green-600"
            : "bg-neutral-600 hover:bg-neutral-700 active:bg-neutral-600"
        }  rounded-lg`}
      >
        <CheckCircleIcon className="size-6" />
      </button>
      <button className=" p-2 bg-red-600 hover:bg-red-700 active:bg-red-600 rounded-lg">
        <RemoveIcon className="size-6" />
      </button>
      {!todo.completed && (
        <button className="p-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-600 rounded-lg">
          <PencilIcon className="size-6" />
        </button>
      )}
    </ContentDiv>
  );
}
