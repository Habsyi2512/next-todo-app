"use client";

import React, { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import ButtonIcon from "../ButtonIcon";
import CreateForm from "./create-form";

export default function HeaderTodoSection() {
  const { isOpenCreateForm, setIsOpenCreateForm } = useContext(ModalContext);
  return (
    <>
      {isOpenCreateForm && <CreateForm />}
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
