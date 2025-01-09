"use client";
import React, { useState, useRef, useCallback, useEffect, JSX } from "react";
import ContentDiv from "../ContentDiv";
import { CheckCircleIcon } from "../icons/CheckCircleIcon";
import { RemoveIcon } from "../icons/RemoveIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { TrashIcon } from "../icons/TrashIcon";
import useHandleCompleteTodo from "@/hooks/todo/useHandleCompleteTodo";
import useHandleRemoveTodo from "@/hooks/todo/useHandleRemoveTodo";
import useHandleRestoreTodo from "@/hooks/todo/useHandleRestoreTodo";
import { RecoverIcon } from "../icons/RecoverIcon";
import { EllipsisVerticalIcon } from "../icons/EllipsisVerticalIcon";
import { TypeTodo } from "@/types/interface";
import GlobalLoading from "../GlobalLoading";
import axios from "axios";

interface TodoActionProps {
  todo: TypeTodo;
}

interface ActionItem {
  id: string;
  icon: JSX.Element;
  text: string;
  onClick: () => void;
  disabled?: boolean;
  visible?: boolean;
}

const TodoAction: React.FC<TodoActionProps> = ({ todo }) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { handleCompleteButton } = useHandleCompleteTodo();
  const { handleRemoveButton } = useHandleRemoveTodo();
  const { handleRestoreButton } = useHandleRestoreTodo();

  const handleDropdownToggle = useCallback(() => {
    setDropdown((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const actionItems: ActionItem[] = [
    {
      id: "complete",
      icon: <CheckCircleIcon className="size-4" />,
      text: todo.completed ? "Mark as incompleted" : "Mark as completed",
      onClick: () => handleCompleteButton(todo.id, !todo.completed),
      visible: todo.deleted_at !== null,
    },
    {
      id: "remove",
      icon: <RemoveIcon className="size-4" />,
      text: "Remove",
      onClick: async () => {
        setLoading(true);
        const result = await handleRemoveButton(todo.id);
        if (result) {
          await axios.post("/api/revalidate?tag=incomplete-todos");
          setLoading(false);
          setDropdown(false);
        }
      },
      disabled: todo.deleted_at !== null,
    },
    {
      id: "edit",
      icon: <PencilIcon className="size-4" />,
      text: "Edit",
      onClick: () => {}, // Action for Edit can be added here
      visible: todo.deleted_at !== null,
    },
    {
      id: "restore",
      icon: <RecoverIcon className="size-4" />,
      text: "Restore",
      onClick: async () => {
        setLoading(true);
        const result = await handleRestoreButton(todo.id);
        if (result) {
          setLoading(false);
          setDropdown(false);
        }
      },
      visible: todo.deleted_at === null,
    },
    {
      id: "delete",
      icon: <TrashIcon className="size-4" />,
      text: "Delete Permanently",
      onClick: () => {},
      visible: todo.deleted_at === null,
    },
  ];

  return (
    <ContentDiv className="flex space-x-2 items-center">
      {loading && <GlobalLoading />}
      {/* <div onClick={getTimeInIndonesiaTimezone}>klik</div> */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleDropdownToggle}
          className="hover:bg-neutral-600 active:bg-neutral-700 rounded-lg p-2"
          aria-expanded={dropdown ? "true" : "false"}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <EllipsisVerticalIcon className="size-5" />
        </button>
        {dropdown && (
          <ul
            id="dropdown-menu"
            className="bg-neutral-700 border border-neutral-600 space-y-1 top-11 z-20 text-xs rounded-lg p-1 absolute"
          >
            {actionItems.map(({ id, icon, text, visible, onClick, disabled }) =>
              !visible ? (
                <li
                  key={id}
                  className={`hover:bg-neutral-600 rounded-md ${
                    disabled && "hover:bg-transparent"
                  }`}
                >
                  <button
                    onClick={onClick}
                    disabled={disabled}
                    className={`flex items-center p-2 space-x-2 w-full rounded-md ${
                      disabled ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    {icon}
                    <p className="truncate">{text}</p>
                  </button>
                </li>
              ) : null
            )}
          </ul>
        )}
      </div>
    </ContentDiv>
  );
};

export default TodoAction;
