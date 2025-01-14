"use client";

import React, { createContext, Dispatch, SetStateAction } from "react";

export type TypeEditFormData = {
  id: number;
  title: string;
};

export type TypeEditFormContext = {
  dataEditForm: TypeEditFormData | null;
  setDataEditForm: Dispatch<SetStateAction<TypeEditFormData | null>>;
};

export const EditFormContext = createContext<TypeEditFormContext>({
  dataEditForm: null,
  setDataEditForm: () => {},
});

export default function EditFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dataEditForm, setDataEditForm] =
    React.useState<TypeEditFormData | null>(null);
  return (
    <EditFormContext
      value={{
        dataEditForm,
        setDataEditForm,
      }}
    >
      {children}
    </EditFormContext>
  );
}

export const useEditFormContext = () => {
  const context = React.useContext(EditFormContext);
  if (!context) {
    throw new Error(
      "useEditFormContext must be used within an EditFormProvider"
    );
  }
  return context;
};
