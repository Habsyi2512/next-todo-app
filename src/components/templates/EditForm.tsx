"use client";
import { useModalContext } from "@/context/ModalContext";
import React, { useState } from "react";
import { TodoValidation } from "@/lib/validationSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Card from "../Card";
import Divider from "../Divider";
import { useEditFormContext } from "@/context/EditFormContext";
import useHandleEditFormTodo from "@/hooks/todo/useHandleEditFormTodo";

export default function EditForm() {
  const { setIsOpenEditForm } = useModalContext();
  const { dataEditForm, setDataEditForm } = useEditFormContext();
  const { handleEditTodo } = useHandleEditFormTodo();

  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleSubmit(values: { title: string }) {
    setIsSubmitting(true);
    try {
      const response = await handleEditTodo({
        id: `${dataEditForm?.id}`,
        title: values.title,
      });
      if (response) {
        setIsOpenEditForm(false);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error creating todo.");
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full min-h-screen z-10 flex items-center justify-center bg-neutral-900/10 backdrop-blur-sm">
      <Card className="w-full max-w-3xl ">
        <header className="px-5 pt-5 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Edit Todo</h1>
          <button
            onClick={() => {
              setDataEditForm(null);
              setIsOpenEditForm(false);
            }}
            className="px-4 py-2 hover:bg-neutral-500 transition-colors rounded-lg"
          >
            Close
          </button>
        </header>
        <Divider />
        <div className="px-5 pb-5">
          <Formik
            initialValues={{ title: dataEditForm?.title || "" }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validationSchema={TodoValidation}
            className="py-5 space-y-3"
          >
            <Form className="space-y-3">
              <div>
                <Field
                  name="title"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter todo title"
                  className="bg-neutral-700 focus:outline-none focus:border focus:border-neutral-500 rounded-md p-2 w-full"
                />
                <ErrorMessage
                  name="title"
                  component={"p"}
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="block px-4 py-2 rounded-lg hover:bg-green-700 active:bg-green-600 bg-green-600 "
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </Form>
          </Formik>
        </div>
      </Card>
    </div>
  );
}
