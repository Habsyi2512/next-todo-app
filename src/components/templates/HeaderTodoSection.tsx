"use client";

import React, { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import ButtonIcon from "../ButtonIcon";
import Card from "../Card";
import Divider from "../Divider";
import CreateForm from "./create-form";

export default function HeaderTodoSection() {
  const { isOpenCreateForm, setIsOpenCreateForm } = useContext(ModalContext);
  return (
    <>
      {isOpenCreateForm && (
        <div className="fixed top-0 left-0 w-full min-h-screen z-10 flex items-center justify-center bg-neutral-900/10 backdrop-blur-sm">
          <Card className="w-full max-w-3xl ">
            <header className="px-5 pt-5 flex items-center justify-between">
              <h1 className="text-lg font-semibold">Add Todo</h1>
              <button
                onClick={() => setIsOpenCreateForm(false)}
                className="px-4 py-2 hover:bg-neutral-500 transition-colors rounded-lg"
              >
                Close
              </button>
            </header>
            <Divider />
            <div className="px-5 pb-5">
              <CreateForm />
            </div>
          </Card>
        </div>
      )}
      <ButtonIcon
        onClick={() => setIsOpenCreateForm(true)}
        className="mb-5 bg-green-600 text-neutral-300 hover:bg-green-700 active:bg-green-600"
      >
        Add Task
      </ButtonIcon>
    </>
  );
}
