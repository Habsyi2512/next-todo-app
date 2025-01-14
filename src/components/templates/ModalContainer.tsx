"use client";

import { useModalContext } from "@/context/ModalContext";
import React from "react";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";

export default function ModalContainer() {
  const { isOpenCreateForm, isOpenEditForm } = useModalContext();
  return (
    <>
      {isOpenEditForm && <EditForm />}
      {isOpenCreateForm && <CreateForm />}
    </>
  );
}
