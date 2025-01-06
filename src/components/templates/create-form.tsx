"use client";
import { createTodo } from "@/actions/actions";
import React from "react";

export default function CreateForm() {
  return (
    <form action={createTodo} className="py-5">
      <input name="title" type="text" className="text-black"/>
      <button type="submit" className="block bg-green-600 ">buat todo</button>
    </form>
  );
}
