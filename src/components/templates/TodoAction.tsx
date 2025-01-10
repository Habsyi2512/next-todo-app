"use client";
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  JSX,
  useContext,
  type FC,
} from "react";
import ContentDiv from "../ContentDiv";
import { CheckCircleIcon } from "../icons/CheckCircleIcon";
import { RemoveIcon } from "../icons/RemoveIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { TrashIcon } from "../icons/TrashIcon";
import useHandleCompleteTodo from "@/hooks/todo/useHandleCompleteTodo";
import useHandleRemoveTodo from "@/hooks/todo/useHandleRemoveTodo";
import useHandleRestoreTodo from "@/hooks/todo/useHandleRestoreTodo";
import useHandleDeleteTodo from "@/hooks/todo/useHandleDeleteTodo";
import { RecoverIcon } from "../icons/RecoverIcon";
import { EllipsisVerticalIcon } from "../icons/EllipsisVerticalIcon";
import { TypeTodo } from "@/types/interface";
import GlobalLoading from "../GlobalLoading";
import DeleteModal from "@/components/modal/DeleteModal";
import { ModalContext } from "@/context/ModalContext";

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

const TodoAction: FC<TodoActionProps> = ({ todo }) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isOpenDeleteModal, setIsOpenDeleteModal } = useContext(ModalContext);

  const { handleCompleteTodo } = useHandleCompleteTodo();
  const { handleRemoveTodo } = useHandleRemoveTodo();
  const { handleRestoreTodo } = useHandleRestoreTodo();
  const { handleDeleteTodo } = useHandleDeleteTodo();

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
      onClick: async () => {
        setDropdown(false);
        setLoading(true);
        const result = await handleCompleteTodo(todo.id, !todo.completed);
        if (result) {
          setLoading(false);
        }
      },
      visible: todo.deleted_at !== null,
    },
    {
      id: "remove",
      icon: <RemoveIcon className="size-4" />,
      text: "Remove",
      onClick: async () => {
        setLoading(true);
        setDropdown(false);
        const result = await handleRemoveTodo(todo.id);
        if (result) {
          setLoading(false);
        }
      },
      disabled: todo.deleted_at !== null,
    },
    {
      id: "edit",
      icon: <PencilIcon className="size-4" />,
      text: "Edit",
      onClick: () => {
        setDropdown(false);
      },
      visible: todo.deleted_at !== null,
    },
    {
      id: "restore",
      icon: <RecoverIcon className="size-4" />,
      text: "Restore",
      onClick: async () => {
        setLoading(true);
        setDropdown(false);
        const result = await handleRestoreTodo(todo.id);
        if (result) {
          setLoading(false);
        }
      },
      visible: todo.deleted_at === null,
    },
    {
      id: "delete",
      icon: <TrashIcon className="size-4" />,
      text: "Delete Permanently",
      onClick: () => {
        setDropdown(false);
        setIsOpenDeleteModal(true);
      },
      visible: todo.deleted_at === null,
    },
  ];

  return (
    <ContentDiv className="flex space-x-2 items-center">
      {isOpenDeleteModal && (
        <DeleteModal
          onClick={async () => {
            setLoading(true);
            const result = await handleDeleteTodo(todo.id);
            if (result) {
              setIsOpenDeleteModal(false);
              setLoading(false);
            }
          }}
          onClose={setIsOpenDeleteModal}
        />
      )}
      {loading && <GlobalLoading />}
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
