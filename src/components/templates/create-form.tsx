"use client";
import { ModalContext } from "@/context/ModalContext";
import React, { useContext, useState } from "react";
import { TodoValidation } from "@/lib/validationSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateForm() {
  const router = useRouter();
  const { setIsOpenCreateForm } = useContext(ModalContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleSubmit(values: { title: string }) {
    setIsSubmitting(true);
    try {
      const data = await axios.post("/api/todo/create-todo", {
        title: values.title,
      });
      if (data.status === 201) {
        setIsOpenCreateForm(false);
        setIsSubmitting(false);
        const revalidate = await axios.post(
          "/api/revalidate?tag=incomplete-todos&secret=12345"
        );
        if (revalidate.status === 200) {
          router.refresh();
        }
        toast.success("Success! Todo Created", {
          style: {
            backgroundColor: "#404040",
            color: "#d4d4d4",
          },
        });
      }
    } catch (err) {
      console.error(err);
      alert("Error creating todo.");
    }
  }

  return (
    <Formik
      initialValues={{ title: "" }}
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
            className="bg-neutral-700 focus:outline-none focus:border focus:border-neutral-500 rounded-md p-2 w-full"
          />
          <ErrorMessage name="title" component={"p"} className="text-red-500" />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="block px-4 py-2 rounded-lg hover:bg-green-700 active:bg-green-600 bg-green-600 "
        >
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </Form>
    </Formik>
  );
}
