"use client";

import React from "react";
import { useModalContext } from "@/context/ModalContext";
import ButtonIcon from "../ButtonIcon";

export default function HeaderTodoSection() {
  const { setIsOpenCreateForm } = useModalContext();
  return (
    <>
      <div className="space-x-3">
        <ButtonIcon
          onClick={() => setIsOpenCreateForm(true)}
          className="mb-5 bg-green-600 text-neutral-300 hover:bg-green-700 active:bg-green-600"
        >
          Add Task
        </ButtonIcon>
      </div>
    </>
  );
}
