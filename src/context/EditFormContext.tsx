"use client";

import React, { createContext, Dispatch, SetStateAction } from "react";

export type TypeEditFormData = {
  id: number;
  title: string;
};

export type TypeEditFormContext = {
  isOpenEditForm: boolean;
  dataEditForm: TypeEditFormData | null;
  setDataEditForm: Dispatch<SetStateAction<TypeEditFormData | null>>;
  setIsOpenEditForm: Dispatch<SetStateAction<boolean>>;
};

export const EditFormContext = createContext<TypeEditFormContext>({
  isOpenEditForm: false,
  dataEditForm: null,
  setDataEditForm: () => {},
  setIsOpenEditForm: () => {},
});

export default function EditFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenEditForm, setIsOpenEditForm] = React.useState<boolean>(false);
  const [dataEditForm, setDataEditForm] =
    React.useState<TypeEditFormData | null>(null);
  return (
    <EditFormContext
      value={{
        isOpenEditForm,
        dataEditForm,
        setDataEditForm,
        setIsOpenEditForm,
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
